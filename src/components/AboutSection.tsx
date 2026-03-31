import { Shield, Users, Award } from "lucide-react";

const features = [
  { icon: Shield, title: "Segurança", desc: "Transações seguras e transparentes do início ao fim." },
  { icon: Users, title: "Atendimento", desc: "Equipe especializada pronta para te ajudar." },
  { icon: Award, title: "Experiência", desc: "Anos de mercado com centenas de negócios realizados." },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Sobre a Soluction
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
          Somos uma imobiliária dedicada a encontrar o imóvel ideal para você. Com atendimento personalizado e anos de experiência no mercado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-lg p-8 text-center shadow-card">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full gold-gradient flex items-center justify-center">
                <f.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
