import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, ChevronDown, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de saber mais sobre os imóveis disponíveis na Solution Imóveis.");

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("todos");
  const [dealType, setDealType] = useState("todos");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (propertyType !== "todos") params.set("category", propertyType);
    if (dealType !== "todos") params.set("type", dealType);
    navigate(`/imoveis${params.toString() ? `?${params}` : ""}`);
  };

  const scrollToProperties = () => {
    document.getElementById("imoveis-destaque")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background Image with Ken Burns ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Imóvel de luxo Solution Imóveis"
          className="w-full h-full object-cover animate-hero-bg"
          style={{ transformOrigin: "center center" }}
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* ── Rich overlay ── */}
      <div className="absolute inset-0 hero-overlay" />

      {/* ── Decorative dot pattern ── */}
      <div className="absolute inset-0 hero-dots opacity-40 pointer-events-none" />

      {/* ── Decorative gold line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #F4B942, #FFD166, #F4B942, transparent)" }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-28 pb-16 flex flex-col items-center text-center">

        {/* Tag line */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 opacity-0"
          style={{
            background: "rgba(244,185,66,0.15)",
            border: "1px solid rgba(244,185,66,0.5)",
            animation: visible ? "fade-in-down 0.7s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#F4B942] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#FFD166]">
            Imóveis Premium em Santo André – SP
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F8FAFC] leading-[1.05] mb-6 opacity-0"
          style={{
            animation: visible ? "fade-in-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s forwards" : "none",
            textShadow: "0 4px 32px rgba(7,26,46,0.5)",
          }}
        >
          Seu novo lar<br />
          <span className="gradient-text-gold italic">começa aqui</span>
        </h1>

        {/* Sub-heading */}
        <p
          className="font-body text-base sm:text-lg md:text-xl text-[#F8FAFC]/85 mb-10 max-w-2xl leading-relaxed opacity-0"
          style={{
            animation: visible ? "fade-in-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards" : "none",
          }}
        >
          Há mais de uma década conectando famílias aos seus imóveis dos sonhos com
          segurança, transparência e atendimento personalizado.
        </p>

        {/* ── Search Box ── */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl opacity-0"
          style={{
            animation: visible ? "fade-in-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s forwards" : "none",
          }}
        >
          <div className="search-box p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Deal type */}
              <div className="relative flex-shrink-0">
                <Home
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B3F73] pointer-events-none"
                />
                <select
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                  className="appearance-none w-full sm:w-36 pl-9 pr-8 py-3.5 rounded-xl bg-[#f0f5fc] text-[#0B3F73] text-sm font-semibold border border-[#145DA0]/15 focus:outline-none focus:ring-2 focus:ring-[#F4B942]/60 cursor-pointer"
                >
                  <option value="todos">Comprar ou Alugar</option>
                  <option value="venda">Comprar</option>
                  <option value="aluguel">Alugar</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#145DA0] pointer-events-none"
                />
              </div>

              {/* Location / keyword search */}
              <div className="relative flex-1">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#145DA0] pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Bairro, cidade ou tipo de imóvel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-[#f0f5fc] text-[#071A2E] text-sm placeholder-[#145DA0]/60 border border-[#145DA0]/15 focus:outline-none focus:ring-2 focus:ring-[#F4B942]/60"
                />
              </div>

              {/* Property type */}
              <div className="relative flex-shrink-0">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="appearance-none w-full sm:w-36 pl-4 pr-8 py-3.5 rounded-xl bg-[#f0f5fc] text-[#0B3F73] text-sm font-semibold border border-[#145DA0]/15 focus:outline-none focus:ring-2 focus:ring-[#F4B942]/60 cursor-pointer"
                >
                  <option value="todos">Tipo de Imóvel</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                  <option value="comercial">Comercial</option>
                  <option value="terreno">Terreno</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#145DA0] pointer-events-none"
                />
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl btn-gold-shimmer text-sm tracking-wider font-bold flex-shrink-0 whitespace-nowrap"
              >
                <Search size={16} />
                Buscar
              </button>
            </div>
          </div>
        </form>

        {/* ── CTA Buttons ── */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 opacity-0"
          style={{
            animation: visible ? "fade-in-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s forwards" : "none",
          }}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide"
          >
            <MessageCircle size={18} />
            Falar com Corretor
          </a>

          <button
            onClick={() => navigate("/imoveis")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-[#F8FAFC] transition-all duration-300"
            style={{
              border: "2px solid rgba(248,250,252,0.4)",
              background: "rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              e.currentTarget.style.borderColor = "rgba(248,250,252,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(248,250,252,0.4)";
            }}
          >
            Ver Todos os Imóveis
          </button>
        </div>

        {/* ── Stats bar ── */}
        <div
          className="mt-14 grid grid-cols-3 gap-6 sm:gap-12 opacity-0"
          style={{
            animation: visible ? "fade-in-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s forwards" : "none",
          }}
        >
          {[
            { value: "500+", label: "Imóveis Vendidos" },
            { value: "12+", label: "Anos de Experiência" },
            { value: "98%", label: "Clientes Satisfeitos" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-heading text-3xl sm:text-4xl font-bold mb-1"
                style={{ color: "#F4B942", textShadow: "0 2px 16px rgba(244,185,66,0.4)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#F8FAFC]/70 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollToProperties}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F8FAFC]/60 hover:text-[#F4B942] transition-colors duration-300 group"
        aria-label="Ver imóveis em destaque"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <div
          className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-1.5 group-hover:border-[#F4B942] transition-colors"
        >
          <div
            className="w-1 h-2 rounded-full bg-current animate-float"
            style={{ animationDuration: "1.5s" }}
          />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
