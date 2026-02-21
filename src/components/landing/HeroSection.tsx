import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                Analiza gratuita de vizibilitate AI
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Afacerea ta este
              <br />
              vizibila in{" "}
              <span className="text-foreground/50">ChatGPT</span>?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Afla in 5 minute daca AI-ul te recomanda clientilor tai.
              Testam 50 de intrebari reale si iti aratam exact unde stai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/analyze">
                Analizeaza-ti Afacerea
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <a href="#how-it-works">
                Cum functioneaza
              </a>
            </Button>
          </motion.div>

          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20"
          >
            <div className="relative max-w-3xl mx-auto">
              {/* Browser chrome */}
              <div className="rounded-t-xl border border-border/60 bg-card/80 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-foreground/10" />
                  <div className="w-3 h-3 rounded-full bg-foreground/10" />
                  <div className="w-3 h-3 rounded-full bg-foreground/10" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background/80 rounded-md px-4 py-1 text-xs text-muted-foreground font-mono">
                    chatgpt.com
                  </div>
                </div>
              </div>

              {/* Chat content */}
              <div className="rounded-b-xl border border-t-0 border-border/60 bg-card/40 p-6 space-y-4">
                {/* User message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="bg-foreground/10 rounded-2xl rounded-br-md px-4 py-2.5 max-w-sm">
                    <p className="text-sm">
                      Recomanda-mi cel mai bun restaurant italian din Brasov
                    </p>
                  </div>
                </motion.div>

                {/* AI response */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-4 py-3 max-w-md">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      In Brasov exista cateva restaurante italiene foarte apreciate.
                      Iata cateva recomandari:
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">1.</span>
                        <span className="text-sm text-muted-foreground">La Famiglia — restaurant de familie...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">2.</span>
                        <span className="text-sm text-muted-foreground">Trattoria del Centro — paste proaspete...</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2, duration: 0.3 }}
                        className="flex items-center gap-2 bg-foreground/5 rounded-lg px-2 py-1 -mx-2"
                      >
                        <span className="text-sm font-medium">3.</span>
                        <span className="text-sm text-foreground/40">Afacerea ta ar putea fi aici...</span>
                        <span className="text-xs px-2 py-0.5 rounded border border-foreground/20 text-muted-foreground">
                          ?
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Subtle glow */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-foreground/5 to-transparent -z-10 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
