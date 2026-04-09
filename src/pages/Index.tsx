import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PremiumSearchHub from "@/components/PremiumSearchHub";
import FeaturedProperties from "@/components/FeaturedProperties";
import AuthorityStats from "@/components/AuthorityStats";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PremiumSearchHub />
      <FeaturedProperties />
      <AuthorityStats />
      <AboutSection />
      <TestimonialsSection />
      <FinalCTA />
      <ContactSection />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};

export default Index;
