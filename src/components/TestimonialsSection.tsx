import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Compradora",
    text: "Encontrei o apartamento dos meus sonhos com a Solution Imóveis! Atendimento incrível, transparente e muito profissional. Recomendo de olhos fechados!",
    rating: 5,
    initials: "MS",
  },
  {
    name: "João Santos",
    role: "Investidor",
    text: "Equipe super atenciosa e preparada. Me ajudaram em todo o processo de compra, desde a negociação até a escritura. Serviço impecável!",
    rating: 5,
    initials: "JS",
  },
  {
    name: "Ana Oliveira",
    role: "Locatária",
    text: "Aluguei meu primeiro imóvel com a Solution Imóveis. Processo rápido, sem burocracia e com suporte em todas as etapas. Melhor experiência!",
    rating: 5,
    initials: "AO",
  },
  {
    name: "Carlos Mendes",
    role: "Vendedor",
    text: "Vendi meu imóvel em tempo recorde graças à Solution Imóveis. Eles conhecem o mercado e sabem como valorizar o seu patrimônio.",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Fernanda Costa",
    role: "Compradora",
    text: "Profissionalismo, ética e compromisso. A Solution Imóveis superou todas as minhas expectativas. Já indiquei para toda a família!",
    rating: 5,
    initials: "FC",
  },
  {
    name: "Roberto Lima",
    role: "Investidor",
    text: "Ótima assessoria na compra do meu segundo imóvel. A equipe conhece muito bem o mercado e apresentou as melhores opções para o meu perfil.",
    rating: 5,
    initials: "RL",
  },
];

const AVATAR_COLORS = [
  { bg: "#0B3F73", text: "#F4B942" },
  { bg: "#145DA0", text: "#FFD166" },
  { bg: "#F4B942", text: "#071A2E" },
  { bg: "#071A2E", text: "#F4B942" },
  { bg: "#0B3F73", text: "#FFD166" },
  { bg: "#145DA0", text: "#F8FAFC" },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".testi-reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 90);
            });
          }
        });
      },
      { threshold: 0.07 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #eef3fb 0%, #f8fafc 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F4B942 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #145DA0 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <div
          className="text-center mb-16 testi-reveal"
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(11,63,115,0.08)",
              border: "1px solid rgba(11,63,115,0.12)",
            }}
          >
            <Star size={14} fill="#F4B942" style={{ color: "#F4B942" }} />
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-primary">
              Depoimentos
            </span>
          </div>

          <h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-brand-primary"
          >
            O que dizem nossos{" "}
            <span className="gradient-text-gold">clientes</span>
          </h2>

          <div className="section-divider mx-auto mb-5" />

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A satisfação dos nossos clientes é a nossa maior conquista. Veja o que eles dizem.
          </p>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} fill="#F4B942" style={{ color: "#F4B942" }} />
            ))}
            <span className="ml-2 font-bold text-lg text-brand-primary">5.0</span>
            <span className="text-muted-foreground text-sm">/ 5.0 — 200+ avaliações</span>
          </div>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonials.map((t, i) => {
            const avatarStyle = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <div
                key={t.name}
                className="testi-reveal testimonial-card rounded-2xl p-7 flex flex-col"
                style={{
                  opacity: 0,
                  transform: "translateY(32px)",
                  transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${(i % 3) * 0.1}s`,
                  background: "#ffffff",
                  boxShadow: "0 4px 24px -4px rgba(11,63,115,0.1)",
                  border: "1px solid rgba(11,63,115,0.07)",
                }}
              >
                {/* Quote icon */}
                <div className="mb-5">
                  <Quote size={32} style={{ color: "#F4B942", opacity: 0.7 }} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} fill="#F4B942" style={{ color: "#F4B942" }} />
                  ))}
                </div>

                {/* Text */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-6 italic"
                  style={{ color: "#4a5568" }}
                >
                  "{t.text}"
                </p>

                {/* Gold divider */}
                <div
                  className="mb-5"
                  style={{
                    height: "1px",
                    background: "linear-gradient(90deg, #F4B942, transparent)",
                  }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: avatarStyle.bg,
                      color: avatarStyle.text,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm" style={{ color: "#0B3F73" }}>
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div
                    className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(11,63,115,0.08)", color: "#145DA0" }}
                  >
                    Verificado
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
