import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out Surgical.AI",
      features: [
        "3 scans per month",
        "1 company",
        "Basic recommendations",
        "Email support",
      ],
      cta: "Start Free",
      href: "/signup",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "For businesses serious about AI visibility",
      features: [
        "Unlimited scans",
        "5 companies",
        "Advanced recommendations",
        "Historical tracking",
        "PDF reports",
        "Priority support",
      ],
      cta: "Go Pro",
      href: "/signup?plan=pro",
      popular: true,
    },
    {
      name: "Agency",
      price: "$199",
      period: "per month",
      description: "For agencies managing multiple clients",
      features: [
        "Everything in Pro",
        "Unlimited companies",
        "White-label reports",
        "API access",
        "Team members",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      href: "/signup?plan=agency",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-glow opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient-gold">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? "border-2 border-gold shadow-lg shadow-gold/20"
                  : "hover:border-primary/50"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-gold text-gold-foreground text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-gradient-gold" : ""}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 ${plan.popular ? "text-gold" : "text-success"}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "gold" : "outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <Link to={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
