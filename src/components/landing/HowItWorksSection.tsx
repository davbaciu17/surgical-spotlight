import { motion } from "framer-motion";
import { Building2, Search, Trophy } from "lucide-react";

const steps = [
  {
    icon: Building2,
    step: "01",
    title: "Completezi datele afacerii tale",
    description:
      "Introdu numele, nișa, piața țintă și competitorii principali ai afacerii tale.",
    time: "30 secunde",
  },
  {
    icon: Search,
    step: "02",
    title: "Testăm 50 de întrebări reale pe ChatGPT",
    description:
      "Simulăm întrebările pe care clienții tăi le-ar pune unui AI, cu web search activat.",
    time: "3–5 minute",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Primești Scorul tău Chirurgical",
    description:
      "Vezi cât de des apari, pe ce poziție și cum te compari cu competiția.",
    time: "Instant",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative bg-section-dots">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.10), transparent)" }} />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Cum funcționează
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-plex">
            3 pași simpli pentru a afla dacă AI-ul te recomandă
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="glass rounded-2xl p-6 h-full text-center card-hover border border-border/50 hover:border-gold/20 transition-colors">
                <div className="flex flex-col items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" }}
                  >
                    <step.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div className="font-mono text-xs text-gold/60 tracking-widest">{step.step}</div>
                </div>
                <h3 className="text-base font-semibold mb-2 font-plex">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-plex mb-3">{step.description}</p>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full border border-gold/20 text-gold/60 font-mono">
                  {step.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
