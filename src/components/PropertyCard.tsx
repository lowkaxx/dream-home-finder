import { Link } from "react-router-dom";
import { Bed, Bath, Car, Maximize, MessageCircle, ArrowRight } from "lucide-react";
import type { DbProperty } from "@/hooks/useProperties";
import FavoriteButton from "@/components/FavoriteButton";

const formatPrice = (price: number, type: string) => {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
};

const PropertyCard = ({ property, index = 0 }: { property: DbProperty; index?: number }) => {
  const image = property.images?.[0];

  return (
    <Link
      to={`/imovel/${property.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-card card-lift border border-border/50"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            width={640}
            height={512}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem foto</div>
        )}

        {/* Dark gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="absolute top-3 left-3 badge-venda text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {property.type}
        </span>
        <FavoriteButton propertyId={property.id} className="absolute top-3 right-3" />

        {/* WhatsApp button revealed on hover */}
        <a
          href={`https://wa.me/5511978580174?text=Olá! Tenho interesse no imóvel: ${property.title}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(142,70%,40%)] text-primary-foreground text-xs font-semibold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-lg hover:scale-105"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>

        {/* View details arrow */}
        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-accent/90 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
          <ArrowRight size={16} className="text-accent-foreground" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-accent transition-colors duration-300">{property.title}</h3>
        {/* Location slides up on hover */}
        <p className="text-sm text-muted-foreground mb-4 transition-transform duration-300 group-hover:-translate-y-0.5">{property.address}, {property.city}</p>
        <p className="font-heading text-2xl font-bold text-accent mb-5 transition-transform duration-300 group-hover:-translate-y-0.5">{formatPrice(property.price, property.type)}</p>

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
