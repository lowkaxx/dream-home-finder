import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="py-20 bg-muted">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Entre em Contato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-primary mt-1" />
              <div>
                <p className="font-heading font-semibold text-foreground">Telefone</p>
                <p className="text-muted-foreground text-sm">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-primary mt-1" />
              <div>
                <p className="font-heading font-semibold text-foreground">E-mail</p>
                <p className="text-muted-foreground text-sm">contato@soluction.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-primary mt-1" />
              <div>
                <p className="font-heading font-semibold text-foreground">Endereço</p>
                <p className="text-muted-foreground text-sm">Av. Principal, 1000 - Centro<br />Santo André - SP</p>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              rows={4}
              placeholder="Sua mensagem"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 gold-gradient text-primary-foreground font-heading font-semibold tracking-widest uppercase rounded-lg hover:opacity-90 transition-opacity"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
