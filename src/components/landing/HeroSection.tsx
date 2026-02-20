import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SurgicalScore } from "@/components/dashboard/SurgicalScore";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Afacerea ta este vizibila{" "}
              <span className="text-gradient-blue">in ChatGPT</span>?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Afla in 5 minute daca AI-ul te recomanda clientilor tai.
              Analiza gratuita.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="gold" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/analyze">
                <Sparkles className="h-5 w-5 mr-2" />
                Analizeaza-ti Afacerea Gratuit
              </Link>
            </Button>
          </motion.div>

          {/* Score preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Exemplu de rezultat
              </p>
              <div className="flex items-center gap-6">
                <SurgicalScore score={42} size="md" />
                <div className="text-left space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-warning/10 border border-warning/30">
                    <span className="text-sm font-bold text-warning">
                      Nota: C
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vizibilitate moderata — exista mult loc de imbunatatire
                  </p>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-success">12</p>
                      <p className="text-xs text-muted-foreground">Mentiuni</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-error">38</p>
                      <p className="text-xs text-muted-foreground">Negasite</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
