import { motion } from "framer-motion";
import { BarChart3, Hash, MessageCircle, Users } from "lucide-react";

const metrics = [
  {
    icon: Hash,
    title: "Rata de Mentionare",
    description:
      "Cat de des mentioneaza AI-ul afacerea ta cand clientii pun intrebari relevante.",
  },
  {
    icon: BarChart3,
    title: "Pozitia in Raspunsuri",
    description:
      "Pe ce pozitie apari cand esti mentionat — primul, al treilea sau ultimul.",
  },
  {
    icon: MessageCircle,
    title: "Sentimentul Mentiunilor",
    description:
      "Daca AI-ul te recomanda pozitiv, neutru sau iti asociaza recenzii negative.",
  },
  {
    icon: Users,
    title: "Vizibilitate vs Competitie",
    description:
      "Cum te compari cu competitorii tai in recomandarile ChatGPT.",
  },
];

export function WhatWeMeasureSection() {
  return (
    <section id="what-we-measure" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce masuram</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Analizam 4 dimensiuni ale vizibilitatii tale in raspunsurile AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="glass rounded-2xl p-6 h-full">
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <metric.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-semibold mb-2">{metric.title}</h3>
                <p className="text-sm text-muted-foreground">
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
