import { useReveal } from "@/hooks/useReveal";

const FinalCTA = () => {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden reveal-section">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary animate-[gradient-shift_8s_ease_infinite] bg-[length:200%_200%]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(40,90%,61%,0.12),transparent_70%)]" />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-accent font-heading text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Pronto para encontrar seu lar?
        </p>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
          Realize o sonho do{" "}
          <span className="text-gold">imóvel perfeito</span>
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
          Nossa equipe está pronta para ajudá-lo a encontrar o imóvel ideal. Entre em contato agora.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511978580174?text=Olá! Gostaria de mais informações sobre imóveis."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium group"
          >
            <span className="relative z-10">Falar com Consultor</span>
          </a>
          <a href="/imoveis" className="btn-outline-premium">
            Explorar Imóveis
          </a>
        </div>
      </div>

      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
};

export default FinalCTA;
