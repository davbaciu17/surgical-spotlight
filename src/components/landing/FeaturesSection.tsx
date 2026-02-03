import { Radar, Target, CheckSquare } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Radar,
      title: "AI Platform Scanning",
      description:
        "Query ChatGPT, Perplexity, Google AI Overview, and Bing Copilot to check if your brand appears in responses.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Target,
      title: "Surgical Score™",
      description:
        "Get a 0-100 visibility score with platform-by-platform breakdown and sentiment analysis.",
      gradient: "from-gold to-gold-muted",
    },
    {
      icon: CheckSquare,
      title: "Actionable Recommendations",
      description:
        "Receive prioritized, specific steps to improve your AI visibility based on scan results.",
      gradient: "from-success to-accent",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-glow opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Precision <span className="text-gradient-gold">AI Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand and optimize your AI visibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
