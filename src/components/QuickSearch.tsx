import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Building2 } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface SearchOption {
  id: string;
  icon: typeof Home;
  label: string;
  cta: string;
  search: string;
}

const options: SearchOption[] = [
  { id: "casa", icon: Home, label: "Buscar Casas", cta: "Ver opções", search: "casa" },
  { id: "apartamento", icon: Building2, label: "Buscar Apartamentos", cta: "Ver opções", search: "apartamento" },
];

const QuickSearch = () => {
  const navigate = useNavigate();
  const revealRef = useReveal();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleNavigate = (search: string) => {
    navigate(`/imoveis?tipo=${search}`);
  };

  return (
    <section ref={ref} className={`reveal-section ${revealed ? "revealed" : ""} py-20 md:py-28`}>
      <div className="container">
        <p className="text-center text-accent font-heading text-sm tracking-[0.25em] uppercase mb-3">
          Encontre rapidamente
        </p>
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-foreground mb-14">
          O que você procura?
        </h2>

        <div className="flex items-center justify-center gap-8 md:gap-14">
          {options.map((opt) => {
            const isExpanded = expandedId === opt.id;
            const Icon = opt.icon;

            return (
              <div
                key={opt.id}
                className="relative"
                onMouseEnter={() => setExpandedId(opt.id)}
                onMouseLeave={() => setExpandedId(null)}
                onClick={() => {
                  if (!isExpanded) {
                    setExpandedId(opt.id);
                  } else {
                    handleNavigate(opt.search);
                  }
                }}
              >
                <div
                  className={`
                    relative flex items-center justify-center cursor-pointer
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    glass rounded-full border border-border/50
                    ${isExpanded
                      ? "w-[260px] md:w-[300px] h-[100px] md:h-[110px] rounded-[55px] shadow-card-hover scale-[1.02]"
                      : "w-[100px] md:w-[120px] h-[100px] md:h-[120px] shadow-card hover:shadow-card-hover"
                    }
                  `}
                  style={{
                    boxShadow: isExpanded
                      ? "0 0 40px -10px hsla(40, 90%, 61%, 0.2), var(--shadow-card-hover)"
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
                        transition-all duration-500 text-accent
                        ${isExpanded ? "w-8 h-8 md:w-9 md:h-9" : "w-10 h-10 md:w-12 md:h-12"}
                      `}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Expanded content */}
                  <div
                    className={`
                      flex flex-col items-start gap-1.5 transition-all duration-500
                      ${isExpanded
                        ? "opacity-100 translate-x-0 ml-[60px] md:ml-[68px]"
                        : "opacity-0 translate-x-[-10px] absolute pointer-events-none"
                      }
                    `}
                  >
                    <span className="font-heading font-semibold text-sm md:text-base text-foreground whitespace-nowrap">
                      {opt.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(opt.search);
                      }}
                      className="text-xs font-heading font-semibold tracking-wider uppercase text-accent hover:text-accent/80 transition-colors"
                    >
                      {opt.cta} →
                    </button>
                  </div>
                </div>

                {/* Label below circle when collapsed */}
                <p
                  className={`
                    text-center font-heading text-xs md:text-sm text-muted-foreground mt-3 transition-all duration-300
                    ${isExpanded ? "opacity-0" : "opacity-100"}
                  `}
                >
                  {opt.id === "casa" ? "Casas" : "Apartamentos"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
