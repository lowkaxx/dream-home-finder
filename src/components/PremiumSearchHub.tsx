import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Home, Building2, Shop } from "lucide-react";

const options: Array<{
  id: "house" | "apartment" | "commercial";
  label: string;
  cta: string;
  icon: LucideIcon;
  description: string;
}> = [
  {
    id: "house",
    label: "Buscar Casas",
    cta: "Ver opções",
    icon: Home,
    description: "Imóveis residenciais com estilo, conforto e jardins exclusivos.",
  },
  {
    id: "apartment",
    label: "Buscar Apartamentos",
    cta: "Ver opções",
    icon: Building2,
    description: "Apartamentos sofisticados em endereços nobres e design premium.",
  },
  {
    id: "commercial",
    label: "Buscar Comerciais",
    cta: "Ver opções",
    icon: Shop,
    description: "Espaços comerciais refinados para seu negócio prosperar.",
  },
];

const PremiumSearchHub = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);

  const handleCardTap = (id: string) => {
    if (active === id) {
      return;
    }
    setActive(id);
  };

  return (
    <section className="container py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center mb-12 px-4 sm:px-0">
        <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70 mb-4">Busca premium</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Selecione seu espaço ideal com um toque cinematográfico
        </h2>
        <p className="text-sm md:text-base text-primary-foreground/75 max-w-2xl mx-auto">
          Três caminhos elegantes para encontrar casas, apartamentos ou imóveis comerciais com total exclusividade.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = active === option.id;

          return (
            <div
              key={option.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCardTap(option.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCardTap(option.id);
                }
              }}
              onMouseEnter={() => setActive(option.id)}
              onMouseLeave={() => setActive(null)}
              className={`group relative isolate overflow-hidden rounded-full border border-white/15 bg-white/10 p-8 text-left shadow-card transition-all duration-500 ease-out hover:shadow-card-hover hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
                isActive ? "md:rounded-[2.5rem] scale-[1.01] shadow-card-hover ring-1 ring-primary/20" : ""
              } min-h-[24rem]`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-foreground/10 via-transparent to-transparent opacity-70 transition-opacity duration-500" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_60%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-500 group-hover:scale-110">
                    <Icon className="h-10 w-10" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70 mb-2">
                      {option.id === "commercial" ? "Espaço corporativo" : "Moradia"}
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-primary-foreground">
                      {option.label}
                    </h3>
                  </div>

                  <p className="text-sm text-primary-foreground/70 max-w-sm">{option.description}</p>
                </div>

                <div
                  className={`mt-8 flex justify-center transition-all duration-500 ${
                    isActive ? "opacity-100 max-h-24" : "opacity-0 max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-24"
                  } overflow-hidden`}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/imoveis?category=${option.id}`);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                  >
                    {option.cta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PremiumSearchHub;
