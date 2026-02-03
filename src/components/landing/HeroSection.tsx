import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium">Now tracking AI Overviews & Copilot</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Is AI Recommending{" "}
            <span className="text-gradient-gold">Your Business?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Discover your visibility across ChatGPT, Perplexity, Google AI & more. 
            Get surgical precision insights to dominate AI search.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="gold" size="xl" asChild>
              <Link to="/signup">
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze Your Brand - Free
              </Link>
            </Button>
            <Button variant="hero" size="xl">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="glass rounded-2xl border border-border/50 p-8 shadow-2xl">
              {/* Mock Dashboard Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="glass-strong rounded-xl p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-border"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#goldGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="251"
                        strokeDashoffset="50"
                        className="animate-score-fill"
                      />
                      <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(43, 100%, 50%)" />
                          <stop offset="100%" stopColor="hsl(30, 100%, 50%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold font-mono text-gradient-gold">78</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Surgical Score™</p>
                </div>

                {/* Platform Status */}
                <div className="glass-strong rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-sm">Platform Status</h4>
                  {[
                    { name: "ChatGPT", status: true },
                    { name: "Perplexity", status: true },
                    { name: "Google AI", status: false },
                    { name: "Bing Copilot", status: true },
                  ].map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{platform.name}</span>
                      <span className={`text-xs font-medium ${platform.status ? "text-success" : "text-error"}`}>
                        {platform.status ? "✓ Found" : "✗ Not Found"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="glass-strong rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-sm">Last 30 Days</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Visibility</span>
                        <span className="text-success">+12%</span>
                      </div>
                      <div className="h-2 rounded-full bg-border overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Sentiment</span>
                        <span className="text-success">Positive</span>
                      </div>
                      <div className="h-2 rounded-full bg-border overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-success to-accent rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
