import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { Search, MapPin, Home, Building2, ChevronDown } from "lucide-react";

const stats = [
  { number: "500+", label: "Imóveis" },
  { number: "12+", label: "Anos de Mercado" },
  { number: "98%", label: "Satisfação" },
  { number: "1.2k+", label: "Clientes Felizes" },
];

const HeroSection = () => {
  const [searchType, setSearchType] = useState<"comprar" | "alugar">("comprar");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("tipo", searchType === "comprar" ? "venda" : "aluguel");
    navigate(`/imoveis?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="Imóvel de luxo"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Deep overlay for premium dark feel */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Gold accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #F4B942, #FFD166, #F4B942, transparent)" }}
      />

      {/* Decorative blurred circle */}
      <div
        className="absolute top-1/4 right-10 w-64 h-64 rounded-full pointer-events-none hidden lg:block"
        style={{
          background: "radial-gradient(circle, rgba(20,93,160,0.30) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-8">

        {/* Label pill */}
        <div className="animate-fade-in flex justify-center mb-6">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
            Premium Imóveis • Santo André, SP
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up-d1 font-heading font-bold text-[#F8FAFC] leading-tight mb-6"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)", textShadow: "0 4px 24px rgba(7,26,46,0.5)" }}
        >
          Encontre o Imóvel{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #F4B942, #FFD166)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            dos seus Sonhos
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up-d2 font-body text-[#F8FAFC]/80 mb-10 max-w-xl mx-auto"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", lineHeight: 1.7 }}
        >
          A Solution Imóveis conecta você às melhores oportunidades do mercado com atendimento premium e total transparência.
        </p>

        {/* ── Search Box ── */}
        <div className="animate-fade-in-up-d3 max-w-3xl mx-auto mb-14">
          <div
            className="rounded-2xl p-2 sm:p-3"
            style={{
              background: "rgba(7,26,46,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(244,185,66,0.22)",
              boxShadow: "0 20px 60px rgba(7,26,46,0.4)",
            }}
          >
            {/* Type tabs */}
            <div className="flex gap-2 mb-3 px-1">
              <button
                className={`search-tab${searchType === "comprar" ? " active" : ""}`}
                onClick={() => setSearchType("comprar")}
              >
                <Home size={12} className="inline mr-1" />
                Comprar
              </button>
              <button
                className={`search-tab${searchType === "alugar" ? " active" : ""}`}
                onClick={() => setSearchType("alugar")}
              >
                <Building2 size={12} className="inline mr-1" />
                Alugar
              </button>
            </div>

            {/* Search inputs row */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-2"
            >
              {/* Location input */}
              <div className="relative flex-1">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#F4B942" }}
                />
                <input
                  type="text"
                  placeholder="Cidade, bairro ou código..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm font-medium placeholder-white/40 focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#F8FAFC",
                  }}
                />
              </div>

              {/* Property type select */}
              <div className="relative sm:w-44">
                <select
                  className="w-full appearance-none pl-4 pr-8 py-3.5 rounded-xl text-sm font-medium focus:outline-none cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#F8FAFC",
                  }}
                >
                  <option value="" style={{ background: "#071A2E" }}>Tipo de imóvel</option>
                  <option value="casa" style={{ background: "#071A2E" }}>Casa</option>
                  <option value="apartamento" style={{ background: "#071A2E" }}>Apartamento</option>
                  <option value="comercial" style={{ background: "#071A2E" }}>Comercial</option>
                  <option value="terreno" style={{ background: "#071A2E" }}>Terreno</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "rgba(248,250,252,0.5)" }}
                />
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="btn-premium flex items-center justify-center gap-2 sm:px-6 py-3.5 rounded-xl"
                style={{ borderRadius: "0.75rem" }}
              >
                <Search size={16} />
                <span>Buscar</span>
              </button>
            </form>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
            {["Apartamentos", "Casas", "Comercial", "Lançamentos"].map((tag) => (
              <Link
                key={tag}
                to="/imoveis"
                className="text-xs font-semibold uppercase tracking-wider transition-colors"
                style={{ color: "rgba(248,250,252,0.55)", letterSpacing: "0.1em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F4B942")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,250,252,0.55)")}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="animate-fade-in-up-d4 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden max-w-2xl mx-auto"
          style={{
            background: "rgba(244,185,66,0.15)",
            border: "1px solid rgba(244,185,66,0.18)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="py-5 px-4 text-center"
              style={{
                background: i % 2 === 0
                  ? "rgba(7,26,46,0.70)"
                  : "rgba(11,63,115,0.45)",
              }}
            >
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WhatsApp floating CTA ── */}
      <a
        href="https://wa.me/5511999999999?text=Olá! Tenho interesse em um imóvel."
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-gold fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-gold"
        style={{ background: "#25D366" }}
        aria-label="Fale conosco no WhatsApp"
      >
        {/* WhatsApp SVG */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
          style={{ borderColor: "rgba(244,185,66,0.45)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: "#F4B942", animation: "fade-in-up 1.5s ease infinite" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
