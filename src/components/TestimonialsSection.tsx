import { Star } from "lucide-react";

const testimonials = [
  { name: "Maria Silva", text: "Encontrei meu apartamento dos sonhos! Atendimento incrível e muito profissional.", rating: 5 },
  { name: "João Santos", text: "Equipe super atenciosa, me ajudaram em todo o processo de compra. Recomendo!", rating: 5 },
  { name: "Ana Oliveira", text: "Aluguei meu primeiro imóvel com a Soluction. Processo rápido e sem dor de cabeça.", rating: 5 },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Depoimentos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-lg p-8 shadow-card">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-6 italic">"{t.text}"</p>
              <p className="font-heading font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
