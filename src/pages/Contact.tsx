import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
