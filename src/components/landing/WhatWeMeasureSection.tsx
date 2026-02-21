import { motion } from "framer-motion";
import { BarChart3, Hash, MessageCircle, Users } from "lucide-react";

const metrics = [
  {
    icon: Hash,
    title: "Rata de Menționaire",
    description:
      "Cât de des menționează AI-ul afacerea ta când clienții pun întrebări relevante.",
  },
  {
    icon: BarChart3,
    title: "Poziția în Răspunsuri",
    description:
      "Pe ce poziție apari când ești menționat — primul, al treilea sau ultimul.",
  },
  {
    icon: MessageCircle,
    title: "Sentimentul Mențiunilor",
    description:
      "Dacă AI-ul te recomandă pozitiv, neutru sau îți asociază recenzii negative.",
  },
  {
    icon: Users,
    title: "Vizibilitate vs Competiție",
    description:
      "Cum te compari cu competitorii tăi în recomandările ChatGPT.",
  },
];

export function WhatWeMeasureSection() {
  return (
    <section id="what-we-measure" className="py-24 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ce măsurăm</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-plex">
            Analizăm 4 dimensiuni ale vizibilității tale în răspunsurile AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="glass rounded-2xl p-6 h-full card-hover">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" }}
                >
                  <metric.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="text-base font-semibold mb-2 font-plex">{metric.title}</h3>
                <p className="text-sm text-muted-foreground font-plex">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
