import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();
  const { data: properties = [] } = useProperties();
  const { data: favIds = [] } = useFavorites();

  const favProperties = properties.filter((p) => favIds.includes(p.id));

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Heart className="text-primary" size={28} /> Meus Favoritos
          </h1>

          {!user ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Faça login para ver seus favoritos.</p>
              <Link to="/admin/login" className="text-primary hover:underline font-medium">Entrar</Link>
            </div>
          ) : favProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Você ainda não favoritou nenhum imóvel.</p>
              <Link to="/imoveis" className="text-primary hover:underline font-medium">Explorar imóveis</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
