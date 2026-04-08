import { Shield, Users, Award, TrendingUp, Clock, Handshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    number: "01",
    title: "Segurança Total",
    desc: "Transações documentadas, transparentes e seguras do início ao fim. Sua tranquilidade é nossa prioridade.",
  },
  {
    icon: Users,
    number: "02",
    title: "Atendimento Premium",
    desc: "Equipe especializada e dedicada, pronta para personalizar cada detalhe da sua experiência.",
  },
  {
    icon: Award,
    number: "03",
    title: "Expertise de Mercado",
    desc: "Mais de 12 anos no mercado imobiliário com centenas de negócios bem-sucedidos realizados.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Melhores Oportunidades",
    desc: "Acesso exclusivo às propriedades mais valorizadas e com maior potencial de retorno.",
  },
  {
    icon: Clock,
    number: "05",
    title: "Agilidade e Eficiência",
    desc: "Processos otimizados para que você feche o negócio no menor tempo possível.",
  },
  {
    icon: Handshake,
    number: "06",
    title: "Parceria Duradoura",
    desc: "Nosso compromisso vai além da venda. Estamos com você em cada etapa da sua jornada.",
  },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="relative py-24 overflow-hidden" style={{ background: "#071A2E" }}>
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(20,93,160,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(244,185,66,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Gold top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(244,185,66,0.4), transparent)" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
              Por que nos escolher
            </span>
          </div>
          <h2
            className="font-heading font-bold gold-underline inline-block"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#F8FAFC",
              lineHeight: 1.2,
            }}
          >
            A Solution Imóveis
          </h2>
          <p
            className="font-body max-w-xl mx-auto mt-8"
            style={{ color: "rgba(248,250,252,0.65)", lineHeight: 1.8, fontSize: "0.97rem" }}
          >
            Somos uma imobiliária dedicada a oferecer uma experiência premium na compra, venda e locação de imóveis. Atendimento personalizado e total comprometimento com o seu sonho.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-7 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                animationDelay: `${idx * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(20,93,160,0.15)";
                el.style.borderColor = "rgba(244,185,66,0.25)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Subtle number watermark */}
              <span
                className="absolute top-4 right-5 font-heading font-bold select-none pointer-events-none"
                style={{
                  fontSize: "4rem",
                  lineHeight: 1,
                  color: "rgba(244,185,66,0.07)",
                }}
              >
                {f.number}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(244,185,66,0.15), rgba(244,185,66,0.08))",
                  border: "1px solid rgba(244,185,66,0.2)",
                }}
              >
                <f.icon size={22} style={{ color: "#F4B942" }} />
              </div>

              {/* Text */}
              <h3
                className="font-heading font-semibold mb-3"
                style={{ color: "#F8FAFC", fontSize: "1.15rem" }}
              >
                {f.title}
              </h3>
              <p
                className="font-body leading-relaxed"
                style={{ color: "rgba(248,250,252,0.60)", fontSize: "0.88rem" }}
              >
                {f.desc}
              </p>

              {/* Bottom gold line on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(90deg, #F4B942, #FFD166)" }}
              />
            </div>
          ))}
        </div>

        {/* WhatsApp CTA banner */}
        <div
          className="mt-16 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(11,63,115,0.6), rgba(20,93,160,0.4))",
            border: "1px solid rgba(244,185,66,0.20)",
          }}
        >
          <div>
            <h3
              className="font-heading font-bold mb-2"
              style={{ color: "#F8FAFC", fontSize: "1.6rem" }}
            >
              Pronto para encontrar seu imóvel ideal?
            </h3>
            <p className="font-body" style={{ color: "rgba(248,250,252,0.65)", fontSize: "0.9rem" }}>
              Fale com nossos especialistas agora mesmo pelo WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de conhecer os imóveis disponíveis."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
