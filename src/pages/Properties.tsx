import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useProperties, type DbProperty } from "@/hooks/useProperties";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "venda" | "aluguel">("todos");
  const [category, setCategory] = useState<"house" | "apartment" | "commercial" | "">("");
  const [showFilters, setShowFilters] = useState(false);
  const [bedrooms, setBedrooms] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam === "house" || categoryParam === "apartment" || categoryParam === "commercial") {
      setCategory(categoryParam);
    }
  }, [searchParams]);
  const [bathrooms, setBathrooms] = useState("");
  const [parking, setParking] = useState("");
  const [city, setCity] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { data: properties = [], isLoading, isError } = useProperties();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 container text-center">
          <p className="text-muted-foreground">Carregando imóveis...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 container text-center">
          <p className="text-destructive">Erro ao carregar imóveis. Tente recarregar a página.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const cities = [...new Set(properties.map((p) => p.city))].sort();

  const getPropertyCategory = (property: DbProperty) => {
    const title = property.title.toLowerCase();
    if (/\b(casa|sobrado|chácara|residencial)\b/.test(title)) return "house";
    if (/\b(apartamento|studio|cobertura|loft|flat)\b/.test(title)) return "apartment";
    return "commercial";
  };

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todos" || p.type === filter;
    const matchCategory = !category || getPropertyCategory(p) === category;
    const matchBedrooms = !bedrooms || p.bedrooms >= Number(bedrooms);
    const matchBathrooms = !bathrooms || p.bathrooms >= Number(bathrooms);
    const matchParking = !parking || p.parking >= Number(parking);
    const matchCity = !city || p.city === city;
    const matchMinArea = !minArea || p.area >= Number(minArea);
    const matchMaxArea = !maxArea || p.area <= Number(maxArea);
    const matchMinPrice = !minPrice || p.price >= Number(minPrice);
    const matchMaxPrice = !maxPrice || p.price <= Number(maxPrice);
    return (
      matchSearch &&
      matchFilter &&
      matchCategory &&
      matchBedrooms &&
      matchBathrooms &&
      matchParking &&
      matchCity &&
      matchMinArea &&
      matchMaxArea &&
      matchMinPrice &&
      matchMaxPrice
    );
  });

  const clearFilters = () => {
    setBedrooms("");
    setBathrooms("");
    setParking("");
    setCity("");
    setMinArea("");
    setMaxArea("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasActiveFilters = bedrooms || bathrooms || parking || city || minArea || maxArea || minPrice || maxPrice;

  const selectClass = "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const inputClass = selectClass;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Encontre aqui</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  showFilters || hasActiveFilters
                    ? "gold-gradient text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filtros
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground">Filtros Avançados</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <X size={14} /> Limpar filtros
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Quartos (mín.)</label>
                  <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectClass}>
                    <option value="">Todos</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}+</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Banheiros (mín.)</label>
                  <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className={selectClass}>
                    <option value="">Todos</option>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}+</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Vagas (mín.)</label>
                  <select value={parking} onChange={(e) => setParking(e.target.value)} className={selectClass}>
                    <option value="">Todas</option>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}+</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Cidade</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                    <option value="">Todas</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Área mín. (m²)</label>
                  <input type="number" placeholder="0" value={minArea} onChange={(e) => setMinArea(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Área máx. (m²)</label>
                  <input type="number" placeholder="∞" value={maxArea} onChange={(e) => setMaxArea(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Preço mín. (R$)</label>
                  <input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Preço máx. (R$)</label>
                  <input type="number" placeholder="∞" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          )}

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
