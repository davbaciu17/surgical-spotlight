import { motion } from "framer-motion";
import { BarChart3, Hash, MessageCircle, Users } from "lucide-react";

const metrics = [
  {
    icon: Hash,
    title: "Rata de Menționare",
    weight: "50%",
    description:
      "Din 50 de interogări reale, câte procente au menționat afacerea ta.",
  },
  {
    icon: BarChart3,
    title: "Poziție",
    weight: "20%",
    description:
      "Poziția medie când ești menționat — 1st = 100pts, 2nd = 89pts etc.",
  },
  {
    icon: MessageCircle,
    title: "Sentiment",
    weight: "15%",
    description:
      "Pozitiv = 1pt, Neutru = 0.5pt, Negativ = 0pt, mediat pe toate mențiunile.",
  },
  {
    icon: Users,
    title: "Competiție",
    weight: "15%",
    description:
      "Menționările tale împărțit la menționările competitorului principal (max 100%).",
  },
];

export function WhatWeMeasureSection() {
  return (
    <section id="what-we-measure" className="py-24 relative bg-section-dots">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />
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
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" }}
                  >
                    <metric.icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-xs font-mono font-bold text-gold/70 mt-1">{metric.weight}</span>
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
