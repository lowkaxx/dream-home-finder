import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Share2, Bed, Bath, Car, Maximize } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { properties, formatPrice } from "@/data/properties";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [currentImg, setCurrentImg] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-28 pb-20 container text-center">
          <p className="text-muted-foreground">Imóvel não encontrado.</p>
          <Link to="/imoveis" className="text-primary underline mt-4 inline-block">Voltar</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImg = () => setCurrentImg((c) => (c + 1) % property.images.length);
  const prevImg = () => setCurrentImg((c) => (c - 1 + property.images.length) % property.images.length);

  const details = [
    { label: "Metragem imóvel", value: `${property.area} metros` },
    { label: "Endereço", value: `${property.address} - ${property.city}` },
    ...(property.iptu ? [{ label: "Valor de IPTU", value: property.iptu }] : []),
    ...(property.condominio ? [{ label: "Valor do condomínio", value: property.condominio }] : []),
    { label: "Dormitórios", value: String(property.bedrooms) },
    { label: "Banheiros", value: String(property.bathrooms) },
    { label: "Vagas garagem", value: String(property.parking) },
    ...(property.andar ? [{ label: "Andar", value: property.andar }] : []),
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container">
          <Link to="/imoveis" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ChevronLeft size={16} /> Voltar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img
                  src={property.images[currentImg]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 badge-venda text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider rotate-[-15deg]">
                  {property.type}
                </span>
                <span className="absolute bottom-4 right-4 bg-secondary/80 text-secondary-foreground text-xs px-3 py-1 rounded">
                  {currentImg + 1} / {property.images.length}
                </span>
                <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/70 text-secondary-foreground flex items-center justify-center hover:bg-secondary transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/70 text-secondary-foreground flex items-center justify-center hover:bg-secondary transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex gap-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImg ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                {property.title} {property.area}m²
              </h1>
              <p className="font-heading text-2xl font-bold text-primary mb-6">
                {formatPrice(property.price, property.type)}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Share2 size={18} />
                </button>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.685-1.228A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.344 0-4.507-.807-6.222-2.156l-.253-.197-3.194.837.852-3.107-.218-.347A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </a>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <ul className="space-y-3">
                  {details.map((d) => (
                    <li key={d.label} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">{d.label}:</span> {d.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {property.description && (
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{property.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
