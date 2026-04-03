import { Heart } from "lucide-react";
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const FavoriteButton = ({ propertyId, className = "" }: { propertyId: string; className?: string }) => {
  const { user } = useAuth();
  const { data: favIds = [] } = useFavorites();
  const toggle = useToggleFavorite();
  const { toast } = useToast();
  const isFav = favIds.includes(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast({ title: "Faça login para favoritar imóveis", variant: "destructive" });
      return;
    }
    toggle.mutate({ propertyId, isFav });
  };

  return (
    <button
      onClick={handleClick}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
        isFav
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/70 text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
      } ${className}`}
      title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart size={16} fill={isFav ? "currentColor" : "none"} />
    </button>
  );
};

export default FavoriteButton;
