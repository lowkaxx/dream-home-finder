import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const { data: properties = [] } = useProperties();
  const featured = properties.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-card").forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("in-view");
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [featured.length]);

  return (
    <section
      id="imoveis-destaque"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef3fb 100%)" }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #145DA0 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F4B942 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 reveal-card" style={{ opacity: 0, transform: "translateY(28px)", transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(11,63,115,0.08)", border: "1px solid rgba(11,63,115,0.12)" }}>
            <Sparkles size={14} style={{ color: "#F4B942" }} />
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-primary">
              Seleção Especial
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary mb-4">
            Imóveis em Destaque
          </h2>

          <div className="section-divider mx-auto mb-5" />

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Selecionamos as melhores oportunidades do mercado para você e sua família
          </p>
        </div>

        {/* ── Property Grid ── */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className="reveal-card"
                style={{
                  opacity: 0,
                  transform: "translateY(32px)",
                  transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${(i + 1) * 0.12}s`,
                }}
              >
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(11,63,115,0.08)" }}
            >
              <Sparkles size={32} style={{ color: "#145DA0" }} />
            </div>
            <p className="text-muted-foreground text-lg font-medium">
              Nenhum imóvel cadastrado ainda.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Em breve novos imóveis estarão disponíveis.
            </p>
          </div>
        )}

        {/* ── CTA ── */}
        <div
          className="text-center mt-14 reveal-card"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s",
          }}
        >
          <Link
            to="/imoveis"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 group"
            style={{
              background: "linear-gradient(135deg, #0B3F73, #145DA0)",
              color: "#F8FAFC",
              boxShadow: "0 8px 32px rgba(11,63,115,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(11,63,115,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(11,63,115,0.3)";
            }}
          >
            Ver Todos os Imóveis
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      <style>{`
        .reveal-card.in-view {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProperties;
