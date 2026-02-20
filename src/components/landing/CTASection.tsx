import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Verifica-ti vizibilitatea AI acum
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Afla in 5 minute daca ChatGPT te recomanda clientilor tai.
            Complet gratuit, fara card.
          </p>
          <Button variant="gold" size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/analyze">
              <Sparkles className="h-5 w-5 mr-2" />
              Incepe Analiza Gratuita
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
