import { Star, Quote } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  { name: "Maria Silva", text: "Encontrei meu apartamento dos sonhos! Atendimento incrível e muito profissional.", rating: 5 },
  { name: "João Santos", text: "Equipe super atenciosa, me ajudaram em todo o processo de compra. Recomendo!", rating: 5 },
  { name: "Ana Oliveira", text: "Aluguei meu primeiro imóvel com a Soluction. Processo rápido e sem dor de cabeça.", rating: 5 },
];

const TestimonialsSection = () => {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} id="depoimentos" className="py-24 bg-background reveal-section">
      <div className="container">
        <p className="text-accent font-heading text-sm tracking-[0.25em] uppercase text-center mb-3">
          O que dizem nossos clientes
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          Depoimentos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-xl p-8 shadow-card card-lift border border-border/50 relative">
              <Quote size={32} className="text-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-6 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-accent-foreground font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
