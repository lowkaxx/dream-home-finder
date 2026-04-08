import { useEffect, useRef } from "react";
import { Shield, Users, Award, TrendingUp, CheckCircle2, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de conhecer mais sobre a Solution Imóveis.");

const features = [
  {
    icon: Shield,
    title: "Segurança Total",
    desc: "Transações seguras, transparentes e juridicamente respaldadas do início ao fim do processo.",
    color: "#0B3F73",
  },
  {
    icon: Users,
    title: "Atendimento Premium",
    desc: "Equipe especializada com atendimento personalizado para cada cliente e necessidade.",
    color: "#145DA0",
  },
  {
    icon: Award,
    title: "Experiência Comprovada",
    desc: "Mais de 12 anos no mercado com centenas de negócios realizados com excelência.",
    color: "#F4B942",
  },
  {
    icon: TrendingUp,
    title: "Melhores Negócios",
    desc: "Encontramos as oportunidades certas para maximizar o seu investimento imobiliário.",
    color: "#0B3F73",
  },
];

const differentials = [
  "Avaliação gratuita do imóvel",
  "Suporte jurídico especializado",
  "Financiamento facilitado",
  "Atendimento 7 dias por semana",
  "Documentação completa incluída",
  "Pós-venda garantido",
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".about-reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071A2E 0%, #0B3F73 50%, #071A2E 100%)" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #F4B942, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #F4B942, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #145DA0 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <div
          className="text-center mb-16 about-reveal"
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(244,185,66,0.15)",
              border: "1px solid rgba(244,185,66,0.3)",
            }}
          >
            <Award size={14} style={{ color: "#F4B942" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#FFD166" }}>
              Nossa História
            </span>
          </div>

          <h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: "#F8FAFC" }}
          >
            Por que escolher a{" "}
            <span className="gradient-text-gold">Solution Imóveis?</span>
          </h2>

          <div className="section-divider mx-auto mb-5" />

          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(248,250,252,0.75)" }}
          >
            Somos mais que uma imobiliária — somos parceiros na realização do seu sonho.
            Com dedicação, ética e expertise de mercado para encontrar o imóvel ideal.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="about-reveal rounded-2xl p-6 group cursor-default"
                style={{
                  opacity: 0,
                  transform: "translateY(32px)",
                  transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${(i + 1) * 0.1}s`,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.borderColor = "rgba(244,185,66,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: f.color === "#F4B942"
                      ? "rgba(244,185,66,0.2)"
                      : "rgba(20,93,160,0.3)",
                    border: `1px solid ${f.color === "#F4B942" ? "rgba(244,185,66,0.4)" : "rgba(20,93,160,0.5)"}`,
                  }}
                >
                  <f.icon size={20} style={{ color: f.color === "#F4B942" ? "#F4B942" : "#8AB8E8" }} />
                </div>
                <h3
                  className="font-heading text-lg font-bold mb-2"
                  style={{ color: "#F8FAFC" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,250,252,0.65)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Differentials + CTA */}
          <div
            className="about-reveal"
            style={{
              opacity: 0,
              transform: "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s",
            }}
          >
            <div
              className="rounded-3xl p-8 sm:p-10"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
              }}
            >
              <h3
                className="font-heading text-2xl md:text-3xl font-bold mb-2"
                style={{ color: "#F8FAFC" }}
              >
                Nossos Diferenciais
              </h3>
              <div className="section-divider mb-6" />

              <ul className="space-y-3 mb-8">
                {differentials.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} style={{ color: "#F4B942", flexShrink: 0 }} />
                    <span className="text-sm font-medium" style={{ color: "rgba(248,250,252,0.85)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 gap-4 mb-8 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                {[
                  { n: "500+", label: "Imóveis" },
                  { n: "12+", label: "Anos" },
                  { n: "98%", label: "Satisfação" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div
                      className="font-heading text-3xl font-bold mb-0.5"
                      style={{ color: "#F4B942" }}
                    >
                      {s.n}
                    </div>
                    <div className="text-xs font-medium" style={{ color: "rgba(248,250,252,0.6)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl text-sm font-bold tracking-wide"
              >
                <MessageCircle size={18} />
                Fale Conosco no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
