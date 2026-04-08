import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const ContactSection = () => {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} id="contato" className="py-24 bg-muted reveal-section">
      <div className="container max-w-5xl">
        <p className="text-accent font-heading text-sm tracking-[0.25em] uppercase text-center mb-3">
          Fale conosco
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          Entre em Contato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-accent-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground mb-1">Telefone</p>
                <p className="text-muted-foreground text-sm">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-accent-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground mb-1">E-mail</p>
                <p className="text-muted-foreground text-sm">contato@soluction.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-accent-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground mb-1">Endereço</p>
                <p className="text-muted-foreground text-sm">Av. Principal, 1000 - Centro<br />Santo André - SP</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de mais informações."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full px-6 py-4 rounded-xl bg-[hsl(142,70%,40%)] text-primary-foreground font-heading font-semibold text-sm tracking-wide hover:bg-[hsl(142,70%,35%)] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <MessageCircle size={22} />
              Fale pelo WhatsApp
            </a>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-5 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full px-5 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <textarea
              rows={4}
              placeholder="Sua mensagem"
              className="w-full px-5 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-all"
            />
            <button type="submit" className="btn-premium w-full">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
