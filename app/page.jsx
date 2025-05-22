import { Header } from "../sections/Header";
import { HeroSection } from "../sections/Hero";
import { ProjectsSection } from "../sections/Projects";
import { CardsSection } from "../sections/Cards"
import { ContactSection } from "../sections/Contact"
import { PricingSection } from "../sections/Pricing";
import { Faqs } from "../sections/Faqs";
import { Footer } from "../sections/Footer";
import Chatbot from '../components/Chatbot/Chatbot';

export default function Home() {
  return (
    <> 
      <Chatbot />
      <Header />   
      <HeroSection />
      <ProjectsSection />
      <CardsSection />
      <PricingSection />
      <Faqs />
      <ContactSection />
      <Footer />

    </>
  );
}
