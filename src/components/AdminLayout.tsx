import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building,
  Calendar,
  Heart,
  Home,
  LogOut,
  Plus,
  Settings,
  Users,
  Calculator
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface AdminLayoutProps {
  children: ReactNode;
  currentPage?: string;
}

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin", id: "dashboard" },
  { icon: Building, label: "Imóveis", href: "/admin/properties", id: "properties" },
  { icon: Plus, label: "Novo Imóvel", href: "/admin/imovel/novo", id: "new-property" },
  { icon: Users, label: "Leads", href: "/admin/leads", id: "leads" },
  { icon: Calendar, label: "Agendamentos", href: "/admin/appointments", id: "appointments" },
  { icon: Heart, label: "Favoritos", href: "/admin/favorites", id: "favorites" },
  { icon: Calculator, label: "Simulações", href: "/admin/simulations", id: "simulations" },
  { icon: Settings, label: "Configurações", href: "/admin/settings", id: "settings" },
];

const AdminLayout = ({ children, currentPage = "dashboard" }: AdminLayoutProps) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/admin/login");
      toast({ title: "Logout realizado com sucesso" });
    } catch {
      toast({ title: "Erro ao fazer logout", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border shadow-lg"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <img src={logo} alt="Soluction" className="h-8 w-auto" />
            <span className="font-heading font-bold text-foreground text-lg">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === item.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="pl-64">
        {/* Topbar */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">
                {sidebarItems.find(item => item.id === currentPage)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Add any topbar actions here */}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;