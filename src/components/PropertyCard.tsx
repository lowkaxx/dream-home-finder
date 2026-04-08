import { Link } from "react-router-dom";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import type { DbProperty } from "@/hooks/useProperties";
import FavoriteButton from "@/components/FavoriteButton";

const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
};

const PropertyCard = ({ property }: { property: DbProperty }) => {
  const image = property.images?.[0];

  return (
    <Link
      to={`/imovel/${property.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-card card-lift border border-border/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover img-zoom"
            loading="lazy"
            width={640}
            height={512}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem foto</div>
        )}
        <span className="absolute top-3 left-3 badge-venda text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {property.type}
        </span>
        <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" />
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1 line-clamp-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{property.address}, {property.city}</p>
        <p className="font-heading text-2xl font-bold text-accent mb-5">{formatPrice(property.price, property.type)}</p>

        <div className="flex items-center gap-4 text-muted-foreground text-xs pt-4 border-t border-border/50">
          <span className="flex items-center gap-1.5"><Maximize size={14} /> {property.area}m²</span>
          <span className="flex items-center gap-1.5"><Bed size={14} /> {property.bedrooms}</span>
          <span className="flex items-center gap-1.5"><Bath size={14} /> {property.bathrooms}</span>
          <span className="flex items-center gap-1.5"><Car size={14} /> {property.parking}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
