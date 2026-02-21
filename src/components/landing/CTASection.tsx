import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Verifica-ti vizibilitatea AI acum
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Afla in 5 minute daca ChatGPT te recomanda clientilor tai.
            Complet gratuit, fara card.
          </p>
          <Button variant="gold" size="xl" asChild>
            <Link to="/analyze">
              Incepe Analiza Gratuita
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
