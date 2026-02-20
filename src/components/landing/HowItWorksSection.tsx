import { motion } from "framer-motion";
import { Building2, Search, Trophy } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Completezi datele afacerii tale",
    description:
      "Introdu numele, nisa, piata tinta si competitorii principali ai afacerii tale.",
  },
  {
    icon: Search,
    title: "Testam 50 de intrebari reale pe ChatGPT",
    description:
      "Simulam intrebarile pe care clientii tai le-ar pune unui AI, cu web search activat.",
  },
  {
    icon: Trophy,
    title: "Primesti scorul tau de vizibilitate AI",
    description:
      "Vezi cat de des apari, pe ce pozitie si cum te compari cu competitia.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cum functioneaza
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            3 pasi simpli pentru a afla daca AI-ul te recomanda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto stagger-children">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="glass rounded-2xl p-6 h-full text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-sm font-mono text-primary mb-2">
                  Pasul {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
