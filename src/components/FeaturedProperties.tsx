import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data: properties = [] } = useProperties();
  const featured = properties.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
          Imóveis em Destaque
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Confira nossas melhores oportunidades selecionadas para você
        </p>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Nenhum imóvel cadastrado ainda.</p>
        )}

        <div className="text-center mt-12">
          <Link
            to="/imoveis"
            className="inline-block px-8 py-3 gold-gradient text-primary-foreground font-heading font-semibold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
          >
            Ver Todos os Imóveis
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
