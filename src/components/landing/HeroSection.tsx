import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { llms } from "@/data/llmData";
import { LLMCarousel } from "./LLMCarousel";
import chatgptLogo from "@/assets/logos/chatgpt.svg";
import geminiLogo from "@/assets/logos/gemini.svg";
import perplexityLogo from "@/assets/logos/perplexity.svg";
import claudeLogo from "@/assets/logos/claude.svg";

const LLM_LOGOS: Record<string, string> = {
  chatgpt: chatgptLogo,
  gemini: geminiLogo,
  perplexity: perplexityLogo,
  claude: claudeLogo,
};

// ChatGPT SVG is an icon mark — needs the text label alongside it.
// Gemini, Perplexity, Claude SVGs are full wordmarks (icon + name baked in).
const LLM_LOGO_TEXT: Record<string, boolean> = {
  chatgpt: true,
  gemini: false,
  perplexity: false,
  claude: false,
};

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentLLM = llms[currentIndex];

  const handleIndexChange = (index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(index);
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Scan lines — subtle horizontal repeating texture */}
      <div className="absolute inset-0 bg-scan-lines pointer-events-none" />
      {/* Very faint top glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge + static headline wrapper — animate in once */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-medium text-gold/80 tracking-wide uppercase font-plex">
                Analiză gratuită de vizibilitate AI
              </span>
            </div>

            {/* Dynamic headline — static first line, LLM on its own fixed-height row */}
            <h1 className="font-syne text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
              {/* Line 1 — completely static, never reflows */}
              <span className="block mb-[0.15em]">
                Afacerea ta este vizibilă în
              </span>

              {/* Line 2 — fixed height so nothing above/below ever shifts */}
              <span
                className="flex items-center justify-center"
                style={{ height: "1.15em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentLLM.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ color: currentLLM.color }}
                    className="inline-flex items-center gap-[0.2em]"
                  >
                    <img
                      src={LLM_LOGOS[currentLLM.id]}
                      alt={currentLLM.name}
                      style={{ height: "0.82em", width: "auto" }}
                      className="inline-block flex-shrink-0"
                    />
                    {LLM_LOGO_TEXT[currentLLM.id] && currentLLM.name}
                    ?
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Dynamic subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLLM.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-plex"
              >
                {currentLLM.subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/analyze" className="sm:w-auto">
              <ShimmerButton
                shimmerColor="#00E5A0"
                background="linear-gradient(135deg, #00E5A0 0%, #00B8D4 100%)"
                borderRadius="12px"
                className="h-14 px-10 text-lg font-bold text-black"
              >
                Analizează-ți Afacerea
                <ArrowRight className="h-5 w-5 ml-1" />
              </ShimmerButton>
            </Link>
            <Button variant="hero" size="xl" asChild>
              <a href="#how-it-works">Cum funcționează</a>
            </Button>
          </motion.div>

          {/* LLM Carousel — slides in on load */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <LLMCarousel
              currentIndex={currentIndex}
              direction={direction}
              onIndexChange={handleIndexChange}
            />
          </motion.div>
        </div>
      </div>

      {/* pulse-border keyframe for the conversion placeholder box */}
      <style>{`
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(0,229,160,0.22); background: rgba(0,229,160,0.04); }
          50%       { border-color: rgba(0,229,160,0.42); background: rgba(0,229,160,0.09); }
        }
      `}</style>
    </section>
  );
}
