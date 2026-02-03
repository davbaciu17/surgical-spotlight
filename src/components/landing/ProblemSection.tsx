import { AlertTriangle, Eye, TrendingUp } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: TrendingUp,
      stat: "40%",
      title: "of searches now use AI",
      description: "Users are bypassing traditional search for AI assistants",
    },
    {
      icon: Eye,
      title: "Traditional SEO tools",
      stat: "don't track",
      description: "AI visibility, leaving you in the dark",
    },
    {
      icon: AlertTriangle,
      title: "Your competitors",
      stat: "might be",
      description: "getting recommended instead of you",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The New SEO <span className="text-gradient-blue">Blindspot</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI assistants are changing how customers discover businesses. Are you visible?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 stagger-children"
            >
              <div className="w-16 h-16 rounded-xl bg-error/10 flex items-center justify-center mx-auto mb-6">
                <problem.icon className="h-8 w-8 text-error" />
              </div>
              <p className="text-4xl font-bold text-gradient-gold mb-2">{problem.stat}</p>
              <p className="font-semibold mb-2">{problem.title}</p>
              <p className="text-sm text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
