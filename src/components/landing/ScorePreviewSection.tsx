import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { DimensionCard } from "@/components/ui/DimensionCard";
import { ArrowRight, Lock } from "lucide-react";

const SAMPLE_SCORE = 42;

const SAMPLE_DIMENSIONS = [
  {
    name: "Vizibilitate Directă",
    score: 38,
    weight: 40,
    description: "Cât de des apari în răspunsurile AI",
  },
  {
    name: "Poziție Competitivă",
    score: 55,
    weight: 20,
    description: "Ranking față de competitori",
  },
  {
    name: "Autoritate Nișă",
    score: 48,
    weight: 15,
    description: "Acoperire AI în domeniu",
  },
  {
    name: "Sănătate Sentiment",
    score: 62,
    weight: 15,
    description: "Tonul mențiunilor tale",
  },
  {
    name: "Calitate Răspuns",
    score: 30,
    weight: 10,
    description: "Detaliile din răspunsurile AI",
  },
];

export function ScorePreviewSection() {
  return (
    <section id="score-preview" className="py-24 relative overflow-hidden bg-section-spotlight scalpel-top">
      {/* Green spotlight blob — center */}
      <div
        className="absolute pointer-events-none"
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
      {/* Cyan secondary blob — top right */}
      <div
        className="absolute pointer-events-none"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ce vei afla după{" "}
            <span className="text-gradient-gold">analiză</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-plex">
            Un raport detaliat pentru fiecare dimensiune a vizibilității tale AI.
          </p>
        </motion.div>

        {/* Preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto relative"
        >
          {/* The mock results panel */}
          <div className="glass rounded-2xl border border-white/8 p-6 md:p-8">
            {/* Score hero row */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/6">
              <div className="relative flex-shrink-0">
                <ScoreGauge score={SAMPLE_SCORE} size="lg" delay={0.3} />
                {/* Score number centered inside gauge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-syne text-3xl font-bold" style={{ color: "#FFB020" }}>
                    {SAMPLE_SCORE}
                  </span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                  <span className="font-syne text-4xl font-bold" style={{ color: "#FFB020" }}>C</span>
                  <span className="text-muted-foreground font-plex">Vizibilitate moderată</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs font-plex">
                  Afacerea ta apare în AI, dar competitorii câștigă mai mult teren. Există oportunități clare de îmbunătățire.
                </p>
                {/* Sample business badge */}
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                  <span className="text-xs text-muted-foreground font-mono">Restaurant Bella Italia, Brașov</span>
                </div>
              </div>
            </div>

            {/* Dimensions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
              {SAMPLE_DIMENSIONS.map((dim, i) => (
                <DimensionCard
                  key={dim.name}
                  name={dim.name}
                  score={dim.score}
                  weight={dim.weight}
                  description={dim.description}
                  delay={i * 0.08}
                />
              ))}
            </div>

            {/* Sample query row (blurred) */}
            <div className="space-y-2 relative">
              <div className="h-8 bg-white/4 rounded-lg" />
              <div className="h-8 bg-white/3 rounded-lg" />
              <div className="h-8 bg-white/3 rounded-lg" />

              {/* Blur + CTA overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl"
                style={{
                  background: "linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.6) 50%, transparent 100%)",
                  backdropFilter: "blur(2px)",
                }}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-plex">50 de interogări detaliate — disponibile după analiză</span>
                </div>
                <Button variant="gold" asChild>
                  <Link to="/analyze">
                    Obțin Analiza Mea
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative glow behind card */}
          <div
            className="absolute -inset-8 -z-10 pointer-events-none"
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
