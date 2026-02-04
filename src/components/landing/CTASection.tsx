import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-strong rounded-3xl p-8 md:p-12 border-2 border-gold/30 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center space-y-6">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(255, 184, 0, 0)",
                    "0 0 0 8px rgba(255, 184, 0, 0.1)",
                    "0 0 0 0 rgba(255, 184, 0, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-lg">🇷🇴</span>
                <span className="text-sm font-medium text-gold">Pentru piața din România</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Verifică-ți vizibilitatea AI{" "}
                <span className="text-gradient-gold">acum</span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Primele 3 scanări sunt gratuite. Descoperă dacă AI-ul te recomandă.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="gold" size="xl" className="group" asChild>
                  <Link to="/signup">
                    <Sparkles className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    Începe Analiza Gratuită
                  </Link>
                </Button>
              </motion.div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-4">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success" />
                  Date securizate
                </span>
                <span className="flex items-center gap-2">
                  <span>🇷🇴</span>
                  Pentru piața din România
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gold" />
                  Rezultate în 60 secunde
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
