import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/5511978580174?text=Olá! Gostaria de mais informações."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Fale pelo WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,40%)] animate-[whatsapp-pulse_2.5s_ease-in-out_infinite] opacity-40" />
      {/* Glow */}
      <span className="absolute -inset-1 rounded-full bg-[hsl(142,70%,40%)]/20 blur-md group-hover:blur-lg transition-all duration-500" />
      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] text-primary-foreground shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_24px_hsla(142,70%,40%,0.5)]">
        <MessageCircle size={26} />
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
