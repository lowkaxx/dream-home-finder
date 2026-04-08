import { Route, Routes } from "react-router-dom";
import { usePageTransition } from "@/hooks/usePageTransition";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminPropertyForm from "@/pages/AdminPropertyForm";
import Register from "@/pages/Register";
import UserSettings from "@/pages/UserSettings";
import Favorites from "@/pages/Favorites";
import Preferences from "@/pages/Preferences";
import About from "@/pages/About";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const { displayLocation, transitionClass } = usePageTransition();

  return (
    <div className={`page-transition ${transitionClass}`}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Index />} />
        <Route path="/imoveis" element={<Properties />} />
        <Route path="/imovel/:id" element={<PropertyDetail />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/depoimentos" element={<Testimonials />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/configuracoes" element={<UserSettings />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/preferencias" element={<Preferences />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/imovel/:id" element={<ProtectedRoute><AdminPropertyForm /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
