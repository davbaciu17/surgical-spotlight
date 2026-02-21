import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ScorePreviewSection } from "@/components/landing/ScorePreviewSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <PricingSection />
        <ScorePreviewSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
