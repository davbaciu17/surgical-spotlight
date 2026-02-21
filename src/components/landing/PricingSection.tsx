import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gratuit",
    price: "0",
    currency: "lei/lună",
    description: "Nu necesită card",
    features: [
      "3 scanări pe lună",
      "1 companie",
      "Recomandări de bază",
      "Rezultate sumare",
    ],
    cta: "Începe Gratuit",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "199",
    originalPrice: "399",
    currency: "lei/lună",
    eurPrice: "~€40",
    description: "Anulezi oricând",
    features: [
      "Scanări nelimitate",
      "Până la 5 companii",
      "Recomandări avansate",
      "Istoric complet",
      "Rapoarte PDF",
      "Suport prioritar",
    ],
    cta: "Alege Pro",
    variant: "gold" as const,
    popular: true,
    badge: "Cel mai popular",
  },
  {
    name: "Agenție",
    price: "799",
    currency: "lei/lună",
    eurPrice: "~€160",
    description: "Facturare în lei",
    features: [
      "Tot din Pro",
      "Companii nelimitate",
      "Rapoarte white-label",
      "Acces API",
      "Membri în echipă",
      "Manager dedicat",
    ],
    cta: "Contactează-ne",
    variant: "outline" as const,
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-section-commercial scalpel-top">
      {/* Large decorative circle — bottom decoration */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.012)",
          filter: "blur(40px)",
        }}
      />
      {/* Green gradient sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,229,160,0.02) 0%, transparent 70%)",
        }}
      />
      {/* Top scalpel — stronger green */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.15), transparent)" }} />
      {/* Bottom scalpel */}
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.07), transparent)" }} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Alege planul <span className="text-gradient-gold">potrivit</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Începe gratuit. Fără card necesar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative glass rounded-2xl p-6 lg:p-8 border transition-all duration-300 ${
                plan.popular 
                  ? "border-gold/50 shadow-lg shadow-gold/10" 
                  : "border-border/50 hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-gold text-gold-foreground text-sm font-bold px-4 py-1 rounded-full shadow-lg shadow-gold/30">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  {plan.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className={`text-4xl font-bold ${plan.popular ? "text-gradient-gold" : ""}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.currency}</span>
                </div>
                {plan.eurPrice && (
                  <p className="text-sm text-muted-foreground mt-1">{plan.eurPrice}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.popular ? "text-gold" : "text-success"}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.variant}
                size="lg"
                className="w-full"
                asChild
              >
                <Link to={plan.name === "Agenție" ? "/contact" : "/signup"}>
                  {plan.popular && <Sparkles className="h-4 w-4 mr-2" />}
                  {plan.cta}
                </Link>
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
