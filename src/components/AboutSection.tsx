import { Shield, Users, Award } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const features = [
  { icon: Shield, title: "Segurança", desc: "Transações seguras e transparentes do início ao fim." },
  { icon: Users, title: "Atendimento", desc: "Equipe especializada pronta para te ajudar." },
  { icon: Award, title: "Experiência", desc: "Anos de mercado com centenas de negócios realizados." },
];

const AboutSection = () => {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} id="sobre" className="py-24 bg-muted reveal-section">
      <div className="container">
        <p className="text-accent font-heading text-sm tracking-[0.25em] uppercase text-center mb-3">
          Quem somos
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          Sobre a Soluction
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Somos uma imobiliária dedicada a encontrar o imóvel ideal para você. Com atendimento personalizado e anos de experiência no mercado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-xl p-8 text-center shadow-card card-lift border border-border/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center shadow-lg">
                <f.icon size={28} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
