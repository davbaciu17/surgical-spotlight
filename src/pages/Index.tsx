import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ScorePreviewSection } from "@/components/landing/ScorePreviewSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ScarcityBar } from "@/components/ui/ScarcityBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ScorePreviewSection />
        <PricingSection />
      </main>
      <Footer />
      <ScarcityBar />
    </div>
  );
};

export default Index;
