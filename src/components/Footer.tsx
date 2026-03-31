import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Soluction Imóveis" className="h-12 w-auto brightness-200" />
          </Link>

          <div className="flex items-center gap-6 text-sm text-secondary-foreground/70">
            <Link to="/" className="hover:text-secondary-foreground transition-colors">Home</Link>
            <Link to="/imoveis" className="hover:text-secondary-foreground transition-colors">Imóveis</Link>
            <Link to="/#sobre" className="hover:text-secondary-foreground transition-colors">Sobre</Link>
            <Link to="/#contato" className="hover:text-secondary-foreground transition-colors">Contato</Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} Soluction Imóveis. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
