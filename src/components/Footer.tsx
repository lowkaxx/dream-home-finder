import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Soluction Imóveis" className="h-12 w-auto brightness-200" />
          </Link>

          <div className="flex items-center gap-8 text-sm text-secondary-foreground/70">
            <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
            <Link to="/imoveis" className="hover:text-accent transition-colors duration-300">Imóveis</Link>
            <Link to="/sobre" className="hover:text-accent transition-colors duration-300">Sobre</Link>
            <Link to="/contato" className="hover:text-accent transition-colors duration-300">Contato</Link>
          </div>
        </div>

        {/* Gold separator */}
        <div className="mt-10 mb-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="text-center text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} Soluction Imóveis. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
