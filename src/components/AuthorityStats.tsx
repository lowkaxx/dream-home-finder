import { useCountUp } from "@/hooks/useCountUp";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: 500, suffix: "+", label: "Imóveis Vendidos" },
  { value: 98, suffix: "%", label: "Clientes Satisfeitos" },
  { value: 15, suffix: "+", label: "Anos de Experiência" },
  { value: 120, suffix: "M+", label: "Em Valor Negociado" },
];

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value, 2200);

  return (
    <div className="text-center">
      <p ref={ref as React.RefObject<HTMLParagraphElement>} className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
        {count}{suffix}
      </p>
      <p className="text-sm text-primary-foreground/70 uppercase tracking-widest font-medium">{label}</p>
    </div>
  );
};

const AuthorityStats = () => {
  const sectionRef = useReveal();

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-secondary reveal-section relative overflow-hidden"
    >
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(40,90%,61%,0.08),transparent_60%)]" />
      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorityStats;
