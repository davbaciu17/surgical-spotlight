import { motion } from "framer-motion";

export function SocialProofSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-foreground/40" />
            <span className="text-sm font-medium text-muted-foreground">
              Verificat
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-2">
            Testat pe <span className="text-foreground/60">500+</span> afaceri
            din Romania
          </p>
          <p className="text-muted-foreground">
            Restaurante, clinici, magazine online, agentii si multe altele
          </p>
        </motion.div>
      </div>
    </section>
  );
}
