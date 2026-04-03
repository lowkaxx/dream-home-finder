import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Casa de luxo"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
          Seu lar, nossa missão!
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          Encontre hoje seu novo lar na Soluction!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/#contato"
            className="px-8 py-3 text-sm font-heading font-semibold tracking-widest uppercase text-primary-foreground border-2 border-primary-foreground/60 rounded-full hover:bg-primary-foreground/10 transition-all"
          >
            Anunciar
          </Link>
          <Link
            to="/imoveis"
            className="px-8 py-3 text-sm font-heading font-semibold tracking-widest uppercase text-primary-foreground border-2 border-primary-foreground/60 rounded-full hover:bg-primary-foreground/10 transition-all"
          >
            Buscar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
