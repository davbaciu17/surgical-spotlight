import { motion } from "framer-motion";
import { StatBlock } from "@/components/ui/StatBlock";
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

export function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0D0D0F]" />
      <div className="absolute inset-0 bg-glow opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            AI-ul a schimbat căutarea.{" "}
            <span className="text-gradient-gold">Te-ai adaptat?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-plex">
            SEO-ul tradițional nu mai este suficient. AI-ul schimbă modul în care clienții găsesc afaceri.
          </p>
        </motion.div>

        {/* Animated stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatBlock
            value={40}
            suffix="%"
            label="din căutări trec prin AI"
            description="ChatGPT, Perplexity, Google AI Overview"
            delay={0}
          />
          <StatBlock
            value={33}
            suffix="%"
            label="dintre utilizatori nu mai deschid Google"
            description="Răspunsul AI înlocuiește căutarea clasică"
            delay={0.1}
          />
          <StatBlock
            value={0}
            suffix="%"
            label="din afaceri își măsoară vizibilitatea AI"
            description="Golul pe care Surgical îl umple"
            delay={0.2}
          />
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="glass rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-[#FF3B5C]/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ background: "rgba(255,59,92,0.08)", border: "1px solid rgba(255,59,92,0.15)" }}
              >
                <problem.icon className="h-7 w-7 text-[#FF3B5C]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-plex">{problem.title}</h3>
              <p className="text-muted-foreground font-plex">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-lg font-semibold text-foreground/70 mt-16 font-plex"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Competitorii tăi sunt recomandați de AI.{" "}
          <span className="text-foreground">Tu?</span>
        </motion.p>
      </div>
    </section>
  );
}
