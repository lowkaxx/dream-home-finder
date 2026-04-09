import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PremiumSearchHub from "@/components/PremiumSearchHub";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PremiumSearchHub />
      <FeaturedProperties />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
