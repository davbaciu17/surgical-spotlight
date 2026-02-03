import { Building2, Search, BarChart3, Trophy } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Building2,
      title: "Enter your brand",
      description: "Add your company name, website, and target keywords",
    },
    {
      icon: Search,
      title: "We query AI platforms",
      description: "Our system asks real questions to ChatGPT, Perplexity & more",
    },
    {
      icon: BarChart3,
      title: "Analyze mentions & sentiment",
      description: "We detect if you're mentioned and how positively",
    },
    {
      icon: Trophy,
      title: "Get your Surgical Score™",
      description: "Receive your visibility score and actionable recommendations",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-card/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient-blue">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to surgical precision AI visibility
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-gold to-success -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-gold-foreground font-bold text-sm z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-8 pt-10 w-full hover:border-primary/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
