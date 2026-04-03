import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Globe, Home } from "lucide-react";

const languages = [
  { code: "pt", label: "Português (BR)" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const propertyTypes = [
  "Apartamento", "Casa", "Cobertura", "Terreno", "Comercial", "Chácara", "Studio",
];

const Preferences = () => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState(() => localStorage.getItem("app_language") || "pt");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const stored = localStorage.getItem("user_pref_types");
    return stored ? JSON.parse(stored) : [];
  });
  const [minBedrooms, setMinBedrooms] = useState(() => localStorage.getItem("user_pref_bedrooms") || "");
  const [preferredCity, setPreferredCity] = useState(() => localStorage.getItem("user_pref_city") || "");

  const toggleType = (t: string) => {
    setSelectedTypes((prev) => {
      const next = prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t];
      localStorage.setItem("user_pref_types", JSON.stringify(next));
      return next;
    });
  };

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    localStorage.setItem("app_language", code);
  };

  const handleBedroomsChange = (val: string) => {
    setMinBedrooms(val);
    localStorage.setItem("user_pref_bedrooms", val);
  };

  const handleCityChange = (val: string) => {
    setPreferredCity(val);
    localStorage.setItem("user_pref_city", val);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container max-w-lg">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Preferências</h1>

          <div className="space-y-6">
            {/* Theme */}
            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                {theme === "light" ? <Sun size={18} /> : <Moon size={18} />} Aparência
              </h2>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="text-sm text-foreground">
                  {theme === "light" ? "Tema Claro" : "Tema Escuro"}
                </span>
                <span className="text-xs text-muted-foreground">Clique para alternar</span>
              </button>
            </div>

            {/* Language */}
            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe size={18} /> Idioma
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                      language === lang.code
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Preferences */}
            <div className="bg-card rounded-lg shadow-card border border-border p-6">
              <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Home size={18} /> Gostos de Imóvel
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Configure suas preferências para recomendações personalizadas.
              </p>

              <label className="text-sm font-medium text-foreground mb-2 block">Tipos de imóvel preferidos</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {propertyTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedTypes.includes(t)
                        ? "gold-gradient text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="text-sm font-medium text-foreground mb-1 block">Quartos mínimos</label>
              <select value={minBedrooms} onChange={(e) => handleBedroomsChange(e.target.value)} className={inputClass + " mb-4"}>
                <option value="">Sem preferência</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>

              <label className="text-sm font-medium text-foreground mb-1 block">Cidade preferida</label>
              <input
                value={preferredCity}
                onChange={(e) => handleCityChange(e.target.value)}
                placeholder="Ex: São Paulo"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Preferences;
