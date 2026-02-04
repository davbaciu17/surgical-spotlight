import { motion } from "framer-motion";
import { TrendingUp, EyeOff, Users } from "lucide-react";

const problems = [
  {
    icon: TrendingUp,
    title: "40% din căutări folosesc acum AI",
    description: "ChatGPT, Perplexity și Google AI Overview sunt noile motoare de căutare. Clienții tăi le folosesc deja.",
  },
  {
    icon: EyeOff,
    title: "Instrumentele SEO clasice nu văd asta",
    description: "Ahrefs, SEMrush și alte tool-uri SEO nu îți arată dacă AI-ul te recomandă. Surgical.AI umple acest gol.",
  },
  {
    icon: Users,
    title: "Competiția ta ar putea fi recomandată în locul tău",
    description: "Când cineva întreabă ChatGPT 'care este cel mai bun [serviciu] din România?', apare numele tău?",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function ProblemSection() {
  return (
    <section className="py-24 relative">
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
            Noul Punct Orb al{" "}
            <span className="text-gradient-blue">Marketingului Digital</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            SEO-ul tradițional nu mai este suficient. AI-ul schimbă modul în care clienții găsesc afaceri.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-xl bg-error/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <problem.icon className="h-7 w-7 text-error" />
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
