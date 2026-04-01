import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";

const Properties = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "venda" | "aluguel">("todos");
  const { data: properties = [], isLoading } = useProperties();

  const filtered = properties.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" || p.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Encontre aqui</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar imóveis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              {(["todos", "venda", "aluguel"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-3 rounded-lg text-sm font-medium capitalize transition-all ${
                    filter === f
                      ? "gold-gradient text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-16">Carregando imóveis...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">Nenhum imóvel encontrado.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
