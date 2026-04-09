import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

const FeaturedProperties = () => {
  const { data: properties = [], isLoading, isError } = useProperties();

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container text-center">
          <p className="text-muted-foreground">Carregando imóveis em destaque...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 bg-background">
        <div className="container text-center">
          <p className="text-destructive">Erro ao carregar imóveis em destaque.</p>
        </div>
      </section>
    );
  }

  const featured = properties.slice(0, 3);
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="py-24 bg-background reveal-section">
      <div className="container">
        <p className="text-accent font-heading text-sm tracking-[0.25em] uppercase text-center mb-3">
          Selecionados para você
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">
          Imóveis em Destaque
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
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

        <div className="text-center mt-16">
          <Link to="/imoveis" className="btn-premium">
            Ver Todos os Imóveis
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
