import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/signup?email=${encodeURIComponent(email)}`);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 md:p-12 border-2 border-gold/30 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Free to start</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to see your <span className="text-gradient-gold">AI visibility?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Join 500+ brands already optimizing their presence in ChatGPT, Perplexity, and more.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background/50 border-border focus:border-gold"
                  required
                />
                <Button type="submit" variant="gold" size="lg" className="shrink-0">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">
                No credit card required • 3 free scans • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
