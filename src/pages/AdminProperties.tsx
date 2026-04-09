import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { useProperties, useDeleteProperty } from "@/hooks/useProperties";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
};

const PropertiesSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

const AdminProperties = () => {
  const { data: properties, isLoading } = useProperties();
  const deleteProperty = useDeleteProperty();
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
    <AdminLayout currentPage="properties">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Imóveis</h1>
            <p className="text-muted-foreground">Gerencie todos os imóveis cadastrados</p>
          </div>
          <Link to="/admin/imovel/novo">
            <Button className="gold-gradient">
              <Plus size={18} className="mr-2" />
              Novo Imóvel
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <PropertiesSkeleton />
        ) : !properties?.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-muted-foreground mb-4">
              <p className="text-lg font-medium mb-2">Nenhum imóvel cadastrado</p>
              <p className="text-sm">Comece adicionando seu primeiro imóvel</p>
            </div>
            <Link to="/admin/imovel/novo">
              <Button className="gold-gradient">
                <Plus size={18} className="mr-2" />
                Adicionar Primeiro Imóvel
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-foreground mb-1">
                          {property.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {property.city} • {property.area}m² • {property.bedrooms} quartos
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="badge-venda text-xs px-2 py-0.5 rounded-full uppercase">
                            {property.type}
                          </span>
                          <span className="font-heading font-bold text-primary text-lg">
                            {formatPrice(property.price, property.type)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/imovel/${property.id}`}>
                          <Button variant="outline" size="sm">
                            <Pencil size={14} className="mr-1" />
                            Editar
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(property.id, property.title)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;