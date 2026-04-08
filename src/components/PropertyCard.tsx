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
      className="group block rounded-2xl overflow-hidden property-card-premium"
      style={{
        background: "#fff",
        boxShadow: "0 4px 24px -4px rgba(11,63,115,0.12)",
        border: "1px solid rgba(11,63,115,0.07)",
      }}
    >
      {/* ── Image container ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-700 ease-out"
            style={{ transformOrigin: "center center" }}
            loading="lazy"
            width={640}
            height={480}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm font-medium"
            style={{ background: "linear-gradient(135deg, #eef3fb, #dde8f5)", color: "#145DA0" }}
          >
            Sem foto disponível
          </div>
        )}

        {/* Gradient overlay on image */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(7,26,46,0.5) 0%, transparent 50%)" }}
        />

        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm"
          style={
            isAluguel
              ? { background: "#F4B942", color: "#071A2E" }
              : { background: "#145DA0", color: "#F8FAFC" }
          }
        >
          {isAluguel ? "Aluguel" : "Venda"}
        </span>

        {/* Favorite button */}
        <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" />
      </div>

      {/* ── Card body ── */}
      <div className="p-5 sm:p-6">
        {/* Title */}
        <h3
          className="font-heading text-xl font-bold mb-1.5 leading-tight group-hover:text-[#145DA0] transition-colors duration-300"
          style={{ color: "#0B3F73" }}
        >
          {property.title}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-1.5 mb-4">
          <MapPin size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#F4B942" }} />
          <p className="text-sm text-muted-foreground leading-snug">
            {property.address}, {property.city}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p
            className="font-heading text-2xl font-bold"
            style={{ color: "#0B3F73" }}
          >
            {formatPrice(property.price, property.type)}
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-4"
          style={{ height: "1px", background: "rgba(11,63,115,0.08)" }}
        />

        {/* Features */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Maximize size={13} style={{ color: "#145DA0" }} />
            {property.area}m²
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Bed size={13} style={{ color: "#145DA0" }} />
            {property.bedrooms} {property.bedrooms === 1 ? "Quarto" : "Quartos"}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Bath size={13} style={{ color: "#145DA0" }} />
            {property.bathrooms} {property.bathrooms === 1 ? "Banho" : "Banhos"}
          </span>
          {property.parking > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Car size={13} style={{ color: "#145DA0" }} />
              {property.parking} {property.parking === 1 ? "Vaga" : "Vagas"}
            </span>
          )}
        </div>
      </div>

      {/* ── Gold bottom accent ── */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: "linear-gradient(90deg, #F4B942, #FFD166)" }}
      />
    </Link>
  );
};

export default PropertyCard;
