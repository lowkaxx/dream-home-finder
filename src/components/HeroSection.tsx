import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY * 0.35);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax background image */}
      <img
        src={heroBg}
        alt="Casa de luxo"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] ease-out will-change-transform ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
        style={{ transform: `translateY(${scrollY}px) scale(${loaded ? 1 : 1.1})` }}
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="animate-fade-in text-accent font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-6 opacity-0" style={{ animationDelay: '0.2s' }}>
          Soluction Imóveis
        </p>
        <h1 className="animate-fade-in-up font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight opacity-0" style={{ animationDelay: '0.4s' }}>
          Seu lar,{" "}
          <span className="text-gold">nossa missão!</span>
        </h1>
        <p className="animate-fade-in-up font-body text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto opacity-0" style={{ animationDelay: '0.6s' }}>
          Encontre hoje seu novo lar na Soluction!
        </p>

        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0" style={{ animationDelay: '0.8s' }}>
          <Link to="/#contato" className="btn-outline-premium">
            Anunciar
          </Link>
          <Link to="/imoveis" className="btn-premium btn-glow">
            Buscar Imóveis
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-primary-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
