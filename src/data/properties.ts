import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";
import prop5 from "@/assets/prop-5.jpg";
import prop6 from "@/assets/prop-6.jpg";

export interface Property {
  id: string;
  title: string;
  type: "venda" | "aluguel";
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  address: string;
  city: string;
  description: string;
  images: string[];
  iptu?: string;
  condominio?: string;
  andar?: string;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Apartamento Central",
    type: "venda",
    price: 390000,
    area: 49,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    address: "Rua Bororos - Vila Pires",
    city: "Santo André",
    description: "Apartamento aconchegante com 2 quartos, próximo ao metrô, vista livre. 2º andar com altura de terceiro.",
    images: [prop4, prop6, prop5],
    iptu: "R$ 50,00 a R$ 80,00",
    condominio: "R$ 450,00 a R$ 500,00",
    andar: "2º andar",
  },
  {
    id: "2",
    title: "Casa com Jardim",
    type: "venda",
    price: 720000,
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    address: "Rua das Flores - Centro",
    city: "São Bernardo",
    description: "Casa encantadora com 3 quartos, quintal espaçoso, bairro tranquilo. Ideal para família.",
    images: [prop2, prop4, prop6],
    iptu: "R$ 120,00",
  },
  {
    id: "3",
    title: "Loft Moderno",
    type: "aluguel",
    price: 3500,
    area: 80,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    address: "Av. Paulista - Bela Vista",
    city: "São Paulo",
    description: "Ambiente aberto, perto do centro, ideal para casal. Design contemporâneo com pé-direito duplo.",
    images: [prop3, prop5, prop4],
  },
  {
    id: "4",
    title: "Cobertura Duplex",
    type: "venda",
    price: 1250000,
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    address: "Rua Augusta - Consolação",
    city: "São Paulo",
    description: "Cobertura luxuosa com vista panorâmica da cidade. Acabamento premium e terraço gourmet.",
    images: [prop5, prop3, prop1],
    condominio: "R$ 1.800,00",
  },
  {
    id: "5",
    title: "Studio Compacto",
    type: "aluguel",
    price: 2200,
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    address: "Rua Vergueiro - Liberdade",
    city: "São Paulo",
    description: "Studio moderno e funcional, próximo ao metrô. Perfeito para jovens profissionais.",
    images: [prop6, prop4, prop3],
  },
  {
    id: "6",
    title: "Sobrado Espaçoso",
    type: "venda",
    price: 580000,
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    address: "Rua das Palmeiras - Jardim",
    city: "Santo André",
    description: "Sobrado com amplo espaço, quintal e edícula. Localização privilegiada.",
    images: [prop1, prop2, prop6],
    iptu: "R$ 90,00",
  },
];

export function formatPrice(price: number, type: "venda" | "aluguel"): string {
  const formatted = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return type === "aluguel" ? `${formatted}/mês` : formatted;
}
