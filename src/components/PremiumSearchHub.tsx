import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Home, Building2, Store } from "lucide-react";

const options: Array<{
  id: "house" | "apartment" | "commercial";
  label: string;
  cta: string;
  icon: LucideIcon;
}> = [
  {
    id: "house",
    label: "Buscar Casas",
    cta: "Ver opções",
    icon: Home,
  },
  {
    id: "apartment",
    label: "Buscar Apartamentos",
    cta: "Ver opções",
    icon: Building2,
  },
  {
    id: "commercial",
    label: "Buscar Comerciais",
    cta: "Ver opções",
    icon: Store,
  },
];

const PremiumSearchHub = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleInteraction = (id: string) => {
    if (expandedId === id) {
      // Second tap/click navigates
      navigate(`/imoveis?category=${id}`);
    } else {
      // First tap/click expands
      setExpandedId(id);
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/imoveis?category=${id}`);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-12 px-4 sm:px-0">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70 mb-4">Busca premium</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Selecione seu espaço ideal
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/75 max-w-2xl mx-auto">
            Três caminhos elegantes para encontrar seu imóvel perfeito.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-8">
          {options.map((option) => {
            const isExpanded = expandedId === option.id;
            const Icon = option.icon;

            return (
              <div
                key={option.id}
                className="relative"
                onMouseEnter={() => setExpandedId(option.id)}
                onMouseLeave={() => setExpandedId(null)}
                onClick={() => handleInteraction(option.id)}
              >
                <div
                  className={`
                    relative flex items-center justify-center cursor-pointer
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    glass rounded-full border border-white/20 bg-white/5
                    ${isExpanded
                      ? "w-[280px] md:w-[320px] h-[110px] md:h-[120px] rounded-[60px] shadow-card-hover scale-[1.02]"
                      : "w-[115px] md:w-[138px] h-[115px] md:h-[138px] shadow-card hover:shadow-card-hover"
                    }
                  `}
                  style={{
                    boxShadow: isExpanded
                      ? "0 0 40px -10px hsla(40, 90%, 61%, 0.15), var(--shadow-card-hover)"
                      : undefined,
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`
                      flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isExpanded ? "absolute left-5 md:left-6" : ""}
                    `}
                  >
                    <Icon
                      className={`
                        transition-all duration-500 text-primary-foreground
                        ${isExpanded ? "w-9 h-9 md:w-10 md:h-10" : "w-12 h-12 md:w-14 md:h-14"}
                      `}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Expanded content */}
                  <div
                    className={`
                      flex flex-col items-start gap-2 transition-all duration-500
                      ${isExpanded
                        ? "opacity-100 translate-x-0 ml-[64px] md:ml-[72px]"
                        : "opacity-0 translate-x-[-10px] absolute pointer-events-none"
                      }
                    `}
                  >
                    <span className="font-heading font-semibold text-sm md:text-base text-primary-foreground whitespace-nowrap">
                      {option.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(option.id);
                      }}
                      className="text-xs font-heading font-semibold tracking-wider uppercase text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {option.cta} →
                    </button>
                  </div>
                </div>

                {/* Label below circle when collapsed */}
                <p
                  className={`
                    text-center font-heading text-xs md:text-sm text-primary-foreground/60 mt-4 transition-all duration-300
                    ${isExpanded ? "opacity-0" : "opacity-100"}
                  `}
                >
                  {option.id === "house" ? "Casas" : option.id === "apartment" ? "Apartamentos" : "Comerciais"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PremiumSearchHub;
