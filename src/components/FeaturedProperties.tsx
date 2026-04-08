import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const FeaturedProperties = () => {
  const { data: properties = [] } = useProperties();
  const featured = properties.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Subtle background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: "linear-gradient(90deg, transparent, rgba(11,63,115,0.15), transparent)" }}
      />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(11,63,115,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,185,66,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label-blue">
              <Sparkles size={10} />
              Curadoria Especial
            </span>
          </div>
          <h2
            className="font-heading font-bold gold-underline inline-block mb-8"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0B3F73",
              lineHeight: 1.2,
            }}
          >
            Imóveis em Destaque
          </h2>
          <p
            className="font-body max-w-lg mx-auto mt-6"
            style={{ color: "#4A6080", lineHeight: 1.8, fontSize: "0.97rem" }}
          >
            Selecionamos as melhores oportunidades do mercado para você encontrar o imóvel perfeito.
          </p>
        </div>

        {/* Cards grid */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, idx) => (
              <div
                key={p.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.12}s` }}
              >
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-2xl"
            style={{
              background: "rgba(11,63,115,0.04)",
              border: "1px dashed rgba(11,63,115,0.18)",
            }}
          >
            <p className="font-body text-sm" style={{ color: "#4A6080" }}>
              Nenhum imóvel cadastrado ainda. Em breve novidades!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/imoveis" className="btn-blue inline-flex items-center gap-2">
            Ver Todos os Imóveis
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
