import { motion } from "framer-motion";
import { Layers, Target, Globe, Heart, Lightbulb, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Scanare Multi-Platformă",
    description: "Verificăm vizibilitatea pe ChatGPT, Gemini, Perplexity, Google AI Overview și Copilot simultan.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Target,
    title: "Surgical Score™",
    description: "Scor de vizibilitate AI de la 0 la 100, cu detalii per platformă și trend în timp.",
    gradient: "from-gold to-gold-muted",
  },
  {
    icon: Globe,
    title: "Căutări în Limba Română",
    description: "Testăm cu interogări reale în română: 'cel mai bun [serviciu] din [oraș]', 'recomandare [industrie] România'.",
    gradient: "from-success to-accent",
  },
  {
    icon: Heart,
    title: "Analiză de Sentiment",
    description: "Nu doar dacă ești menționat - ci cum. Pozitiv, neutru sau negativ.",
    gradient: "from-error to-gold-muted",
  },
  {
    icon: Lightbulb,
    title: "Recomandări Personalizate",
    description: "Pași concreți pentru a-ți îmbunătăți vizibilitatea: structura conținutului, schema markup, autoritate.",
    gradient: "from-accent to-primary",
  },
  {
    icon: TrendingUp,
    title: "Monitorizare în Timp",
    description: "Urmărește evoluția scorului. Vezi impactul optimizărilor tale.",
    gradient: "from-primary to-gold",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ce include{" "}
            <span className="text-gradient-gold">Surgical.AI</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Totul de ce ai nevoie pentru a domina vizibilitatea în AI
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
