import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, PlusCircle, LogIn, UserPlus, Heart, SlidersHorizontal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Sobre", href: "/sobre" },
  { label: "Depoimentos", href: "/depoimentos" },
  { label: "Contato", href: "/contato" },
  { label: "Anuncie", href: "https://wa.me/5511978580174?text=Olá! Gostaria de anunciar meu imóvel.", external: true },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setDropdownOpen(false);
      setOpen(false);
      navigate("/");
    }
  };

  const avatarInitial = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  const allNavItems = isAdmin
    ? [...navItems, { label: "Cadastrar Imóvel", href: "/admin/imovel/novo" }]
    : navItems;

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/sobre";
  const shouldBeTransparent = (isHome || isAbout) && !scrolled;

  const navBg = scrolled
    ? "bg-card/95 backdrop-blur-xl navbar-scrolled"
    : shouldBeTransparent
      ? "bg-transparent"
      : "bg-card/95 backdrop-blur-xl";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Soluction Imóveis" className="h-14 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-8">
            {allNavItems.map((item) =>
              'external' in item && item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-accent ${
                    scrolled || !shouldBeTransparent ? "text-foreground" : "text-primary-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-accent ${
                    location.pathname === item.href
                      ? "text-accent border-b-2 border-accent pb-1"
                      : scrolled || !shouldBeTransparent
                        ? "text-foreground"
                        : "text-primary-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            {loading && <span className="text-xs text-muted-foreground">carregando sessão...</span>}
          </nav>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {user ? avatarInitial : <User size={18} />}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-card rounded-xl shadow-card-hover border border-border py-2 z-50 animate-scale-in">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    <Link to="/favoritos" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Heart size={16} className="text-muted-foreground" /> Favoritos
                    </Link>
                    <Link to="/preferencias" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <SlidersHorizontal size={16} className="text-muted-foreground" /> Preferências
                    </Link>
                    <Link to="/configuracoes" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Settings size={16} className="text-muted-foreground" /> Configurações
                    </Link>

                    {isAdmin && (
                      <Link to="/admin/imovel/novo" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        <PlusCircle size={16} className="text-muted-foreground" /> Cadastrar Imóvel
                      </Link>
                    )}

                    <div className="border-t border-border mt-1 pt-1">
                      <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full text-left">
                        <LogOut size={16} /> Sair
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/admin/login" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <LogIn size={16} className="text-muted-foreground" /> Entrar
                    </Link>
                    <Link to="/cadastro" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <UserPlus size={16} className="text-muted-foreground" /> Cadastrar-se
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button className={`md:hidden transition-colors ${scrolled || !shouldBeTransparent ? "text-foreground" : "text-primary-foreground"}`} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-card border-t border-border px-6 py-4 space-y-3 animate-fade-in">
          {allNavItems.map((item) =>
            'external' in item && item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-foreground hover:text-accent" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="block text-sm font-medium text-foreground hover:text-accent" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            )
          )}
          <div className="border-t border-border pt-3 mt-3 space-y-3">
            {user ? (
              <>
                <Link to="/favoritos" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent">Favoritos</Link>
                <Link to="/preferencias" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent">Preferências</Link>
                <Link to="/configuracoes" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent">Configurações</Link>
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="block text-sm font-medium text-destructive">Sair</button>
              </>
            ) : (
              <>
                <Link to="/admin/login" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent">Entrar</Link>
                <Link to="/cadastro" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-accent">Cadastrar-se</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
