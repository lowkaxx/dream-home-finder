import { Link } from "react-router-dom";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import type { DbProperty } from "@/hooks/useProperties";

const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
};

const PropertyCard = ({ property }: { property: DbProperty }) => {
  const image = property.images?.[0];

  return (
    <Link
      to={`/imovel/${property.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={640}
            height={512}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem foto</div>
        )}
        <span className="absolute top-3 right-3 badge-venda text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {property.type}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{property.address}, {property.city}</p>
        <p className="font-heading text-xl font-bold text-primary mb-4">{formatPrice(property.price, property.type)}</p>

        <div className="flex items-center gap-4 text-muted-foreground text-xs">
          <span className="flex items-center gap-1"><Maximize size={14} /> {property.area}m²</span>
          <span className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</span>
          <span className="flex items-center gap-1"><Car size={14} /> {property.parking}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
