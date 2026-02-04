import { motion } from "framer-motion";
import { Building2, Radar, Search, Target } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Introdu brandul tău",
    description: "Adaugă numele companiei, website-ul și industria",
  },
  {
    icon: Radar,
    title: "Scanăm platformele AI",
    description: "Interogăm ChatGPT, Gemini, Perplexity și altele cu căutări relevante în limba română",
  },
  {
    icon: Search,
    title: "Analizăm mențiunile",
    description: "Detectăm dacă brandul tău apare, cu ce sentiment și în ce context",
  },
  {
    icon: Target,
    title: "Primești Surgical Score™",
    description: "Scor de vizibilitate 0-100, detalii per platformă și recomandări de îmbunătățire",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-card/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Cum funcționează{" "}
            <span className="text-gradient-gold">Surgical.AI</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            De la verificare la optimizare în 4 pași simpli
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2">
            <div className="h-full bg-gradient-to-r from-primary via-gold to-success" style={{ backgroundSize: '200% 100%' }} />
            <motion.div 
              className="absolute inset-0 h-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,184,0,0.5) 50%, transparent 100%)',
                backgroundSize: '50% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-gold-foreground font-bold text-sm z-10 shadow-lg shadow-gold/30">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-6 lg:p-8 pt-10 w-full border border-border/50 hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
