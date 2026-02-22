import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { DimensionCard } from "@/components/ui/DimensionCard";
import { ArrowRight, Lock } from "lucide-react";

const SAMPLE_SCORE = 42;

// Weights: Rata de Menționare 50%, Poziție 20%, Sentiment 15%, Competiție 15%
// Weighted check: 0.5×36 + 0.2×58 + 0.15×63 + 0.15×22 = 18+11.6+9.45+3.3 = 42.35 ≈ 42
const SAMPLE_DIMENSIONS = [
  {
    name: "Rata de Menționare",
    score: 36,
    weight: 50,
    description: "Din 50 de interogări, 36% au menționat afacerea ta",
  },
  {
    name: "Poziție",
    score: 58,
    weight: 20,
    description: "Poziția medie când ești menționat (1st=100pts, 2nd=89pts…)",
  },
  {
    name: "Sentiment",
    score: 63,
    weight: 15,
    description: "Pozitiv=1pt, Neutru=0.5pt, Negativ=0pt, mediat",
  },
  {
    name: "Competiție",
    score: 22,
    weight: 15,
    description: "Menționările tale vs. competitorul principal (max 100%)",
  },
];

export function ScorePreviewSection() {
  // Trigger all score animations when the card enters the viewport
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });




  return (
    <section id="score-preview" className="py-24 relative overflow-hidden bg-section-spotlight scalpel-top">
      {/* Green spotlight blob — center (simplified for perf) */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: "700px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(0,229,160,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Cyan secondary blob — top right (hidden on mobile for perf) */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: "400px",
          height: "300px",
          top: "-60px",
          right: "-80px",
          background: "radial-gradient(ellipse at center, rgba(0,184,212,0.02) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ce vei afla după{" "}
            <span className="text-gradient-gold">analiză</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-plex">
            Un raport detaliat pentru fiecare dimensiune a vizibilității tale AI.
          </p>
        </motion.div>

        {/* Preview card — ref triggers all score animations */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-3xl mx-auto relative will-change-transform"
        >
          <div className="glass rounded-2xl border border-white/8 p-6 md:p-8">
            {/* Score hero row */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/6">
              <div className="relative flex-shrink-0">
              <ScoreGauge
                  score={SAMPLE_SCORE}
                  size="lg"
                  delay={0.3}
                  triggered={inView}
                />
              </div>
              <div className="text-center sm:text-left">
                <motion.div
                  className="flex items-center gap-3 mb-2 justify-center sm:justify-start"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <span className="font-syne text-4xl font-bold" style={{ color: "#FFB020" }}>C</span>
                  <span className="text-muted-foreground font-plex">Vizibilitate moderată</span>
                </motion.div>
                <motion.p
                  className="text-sm text-muted-foreground max-w-xs font-plex"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.4 }}
                >
                  Afacerea ta apare în AI, dar competitorii câștigă mai mult teren. Există oportunități clare de îmbunătățire.
                </motion.p>
                {/* Sample business badge */}
                <motion.div
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                  <span className="text-xs text-muted-foreground font-mono">Restaurant Bella Italia, Brașov</span>
                </motion.div>
              </div>
            </div>

            {/* Dimensions grid — each card has its own inView via DimensionCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {SAMPLE_DIMENSIONS.map((dim, i) => (
                <DimensionCard
                  key={dim.name}
                  name={dim.name}
                  score={dim.score}
                  weight={dim.weight}
                  description={dim.description}
                  delay={i * 0.1}
                />
              ))}
            </div>

            {/* Sample query rows (blurred) */}
            <div className="space-y-2 relative">
              <div className="h-8 bg-white/4 rounded-lg" />
              <div className="h-8 bg-white/3 rounded-lg" />
              <div className="h-8 bg-white/3 rounded-lg" />

              {/* Blur + CTA overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl"
                style={{
                  background: "linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.6) 50%, transparent 100%)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-plex">50 de interogări detaliate — disponibile după analiză</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.8 }}
                >
                  <Button variant="gold" asChild>
                    <Link to="/analyze">
                      Obțin Analiza Mea
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative glow behind card (hidden on mobile) */}
          <div
            className="absolute -inset-8 -z-10 pointer-events-none hidden md:block"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,229,160,0.04) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
