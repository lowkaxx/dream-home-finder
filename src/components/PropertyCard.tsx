import { Link } from "react-router-dom";
import { Bed, Bath, Car, Maximize, MapPin } from "lucide-react";
import type { DbProperty } from "@/hooks/useProperties";
import FavoriteButton from "@/components/FavoriteButton";

const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
};

const PropertyCard = ({ property }: { property: DbProperty }) => {
  const image = property.images?.[0];
  const isAluguel = property.type === "aluguel";

  return (
    <Link
      to={`/imovel/${property.id}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "#fff",
        boxShadow: "0 4px 24px -4px rgba(11,63,115,0.10)",
        border: "1px solid rgba(11,63,115,0.07)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 20px 60px -12px rgba(11,63,115,0.24)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 4px 24px -4px rgba(11,63,115,0.10)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#EEF2F7" }}>
        {image ? (
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={640}
            height={512}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ color: "#8DA5C0" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs font-medium">Sem foto</span>
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(7,26,46,0.5) 0%, transparent 60%)" }}
        />

        {/* Type badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${
            isAluguel ? "badge-aluguel" : "badge-venda"
          }`}
          style={{ letterSpacing: "0.10em", fontSize: "0.65rem" }}
        >
          {isAluguel ? "Aluguel" : "Venda"}
        </span>

        <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" />
      </div>

      {/* Content area */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={12} style={{ color: "#F4B942", flexShrink: 0 }} />
          <span className="text-xs font-medium truncate" style={{ color: "#7A95B0" }}>
            {property.address}, {property.city}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-heading font-semibold mb-3 leading-snug group-hover:text-[#145DA0] transition-colors duration-200"
          style={{ color: "#0B3F73", fontSize: "1.1rem" }}
        >
          {property.title}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <p
            className="font-heading font-bold"
            style={{
              fontSize: "1.35rem",
              background: "linear-gradient(135deg, #0B3F73, #145DA0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {formatPrice(property.price, property.type)}
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-4"
          style={{ height: "1px", background: "rgba(11,63,115,0.08)" }}
        />

        {/* Specs */}
        <div className="flex items-center gap-4 flex-wrap">
          {[
            { Icon: Maximize, value: `${property.area}m²`, label: "Área" },
            { Icon: Bed, value: property.bedrooms, label: "Quartos" },
            { Icon: Bath, value: property.bathrooms, label: "Banheiros" },
            { Icon: Car, value: property.parking, label: "Vagas" },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={13} style={{ color: "#F4B942" }} />
              <span className="text-xs font-semibold" style={{ color: "#4A6080" }} title={label}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold accent bar */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: "linear-gradient(90deg, #F4B942, #FFD166)" }}
      />
    </Link>
  );
};

export default PropertyCard;
