import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, PlusCircle, LogIn, UserPlus, Heart, SlidersHorizontal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#contato" },
  { label: "Anuncie", href: "/#contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate("/");
  };

  const avatarInitial = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  const allNavItems = isAdmin
    ? [...navItems, { label: "Cadastrar Imóvel", href: "/admin/imovel/novo" }]
    : navItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-card">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Soluction Imóveis" className="h-14 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-8">
            {allNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  location.pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {user ? avatarInitial : <User size={18} />}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-card-hover border border-border py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/favoritos"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Heart size={16} className="text-muted-foreground" />
                      Favoritos
                    </Link>

                    <Link
                      to="/preferencias"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <SlidersHorizontal size={16} className="text-muted-foreground" />
                      Preferências
                    </Link>

                    <Link
                      to="/configuracoes"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings size={16} className="text-muted-foreground" />
                      Configurações
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin/imovel/novo"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <PlusCircle size={16} className="text-muted-foreground" />
                        Cadastrar Imóvel
                      </Link>
                    )}

                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/admin/login"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <LogIn size={16} className="text-muted-foreground" />
                      Entrar
                    </Link>
                    <Link
                      to="/cadastro"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <UserPlus size={16} className="text-muted-foreground" />
                      Cadastrar-se
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-card border-t border-border px-6 py-4 space-y-3">
          {allNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border pt-3 mt-3 space-y-3">
            {user ? (
              <>
                <Link to="/favoritos" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-primary">
                  Favoritos
                </Link>
                <Link to="/preferencias" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-primary">
                  Preferências
                </Link>
                <Link to="/configuracoes" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-primary">
                  Configurações
                </Link>
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="block text-sm font-medium text-destructive">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/admin/login" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-primary">
                  Entrar
                </Link>
                <Link to="/cadastro" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground hover:text-primary">
                  Cadastrar-se
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
