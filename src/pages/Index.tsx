import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhatWeMeasureSection } from "@/components/landing/WhatWeMeasureSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhatWeMeasureSection />
        <SocialProofSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
