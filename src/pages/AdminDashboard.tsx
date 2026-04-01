import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProperties, useDeleteProperty } from "@/hooks/useProperties";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
};

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const { data: properties, isLoading } = useProperties();
  const deleteProperty = useDeleteProperty();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Deseja realmente excluir "${title}"?`)) return;
    try {
      await deleteProperty.mutateAsync(id);
      toast({ title: "Imóvel excluído com sucesso" });
    } catch {
      toast({ title: "Erro ao excluir", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card shadow-card">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Soluction" className="h-10 w-auto" />
            <span className="font-heading font-bold text-foreground text-lg">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <button
              onClick={async () => { await signOut(); navigate("/admin/login"); }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground">Imóveis</h1>
          <Link
            to="/admin/imovel/novo"
            className="inline-flex items-center gap-2 px-5 py-2.5 gold-gradient text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={18} /> Novo Imóvel
          </Link>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground text-center py-16">Carregando...</p>
        ) : !properties?.length ? (
          <p className="text-muted-foreground text-center py-16">Nenhum imóvel cadastrado.</p>
        ) : (
          <div className="bg-card rounded-lg shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Imóvel</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Cidade</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Preço</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{p.title}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.city}</td>
                      <td className="px-4 py-3">
                        <span className="badge-venda text-xs px-2 py-0.5 rounded-full uppercase">{p.type}</span>
                      </td>
                      <td className="px-4 py-3 font-heading font-bold text-primary">{formatPrice(p.price, p.type)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/imovel/${p.id}`}
                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
