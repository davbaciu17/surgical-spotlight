import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SurgicalScore } from "@/components/dashboard/SurgicalScore";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Download,
  ArrowLeft,
  Lightbulb,
  Radar,
  TrendingUp,
  TrendingDown,
  Minus,
  Quote,
  Sparkles,
} from "lucide-react";

// Mock data
const mockResults = {
  score: 78,
  previousScore: 72,
  date: "Feb 12, 2024",
  company: "Acme Corp",
  platforms: [
    {
      id: "chatgpt",
      name: "ChatGPT",
      icon: "🤖",
      mentioned: true,
      quote: "Acme Corp is a leading provider of enterprise solutions, known for their innovative approach to business automation.",
      sentiment: "positive",
      confidence: 0.92,
    },
    {
      id: "perplexity",
      name: "Perplexity",
      icon: "🔮",
      mentioned: true,
      quote: "According to recent reviews, Acme Corp offers reliable enterprise software with excellent customer support.",
      sentiment: "positive",
      confidence: 0.88,
    },
    {
      id: "google",
      name: "Google AI",
      icon: "🔍",
      mentioned: false,
      quote: null,
      sentiment: null,
      confidence: null,
    },
    {
      id: "bing",
      name: "Bing Copilot",
      icon: "💬",
      mentioned: true,
      quote: "Acme Corp provides business solutions. Some users report satisfaction with their products.",
      sentiment: "neutral",
      confidence: 0.75,
    },
  ],
};

export default function ScanResults() {
  const { id } = useParams();
  const scoreChange = mockResults.score - mockResults.previousScore;

  const getSentimentDisplay = (sentiment: string | null) => {
    switch (sentiment) {
      case "positive":
        return { icon: TrendingUp, color: "text-success", label: "Positive" };
      case "negative":
        return { icon: TrendingDown, color: "text-error", label: "Negative" };
      default:
        return { icon: Minus, color: "text-muted-foreground", label: "Neutral" };
    }
  };

  const mentionedCount = mockResults.platforms.filter((p) => p.mentioned).length;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/scanner"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Scanner
            </Link>
            <h1 className="text-3xl font-bold">Scan Results</h1>
            <p className="text-muted-foreground">
              {mockResults.company} • {mockResults.date}
            </p>
          </div>
          <Button variant="goldOutline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Download Report
            <span className="ml-2 text-xs bg-gold/20 px-2 py-0.5 rounded">Pro</span>
          </Button>
        </div>

        {/* Score Hero */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <SurgicalScore score={mockResults.score} size="lg" />
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                {scoreChange > 0 ? (
                  <>
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="text-lg font-medium text-success">
                      +{scoreChange} points from previous scan
                    </span>
                  </>
                ) : scoreChange < 0 ? (
                  <>
                    <TrendingDown className="h-5 w-5 text-error" />
                    <span className="text-lg font-medium text-error">
                      {scoreChange} points from previous scan
                    </span>
                  </>
                ) : (
                  <>
                    <Minus className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-medium text-muted-foreground">
                      No change from previous scan
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-2xl font-bold text-success">{mentionedCount}</p>
                  <p className="text-xs text-muted-foreground">Platforms Mentioned</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-error/10 border border-error/30">
                  <p className="text-2xl font-bold text-error">
                    {mockResults.platforms.length - mentionedCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Not Found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Results */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Platform Breakdown</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {mockResults.platforms.map((platform) => {
              const sentiment = getSentimentDisplay(platform.sentiment);
              return (
                <AccordionItem
                  key={platform.id}
                  value={platform.id}
                  className="border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="font-semibold">{platform.name}</span>
                      <span
                        className={`ml-auto mr-4 px-3 py-1 rounded-full text-sm font-medium ${
                          platform.mentioned
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {platform.mentioned ? "Mentioned" : "Not Found"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    {platform.mentioned ? (
                      <div className="space-y-4">
                        {/* Quote */}
                        <div className="flex gap-3 p-4 rounded-lg bg-card border border-border">
                          <Quote className="h-5 w-5 text-gold shrink-0 mt-1" />
                          <p className="text-sm leading-relaxed">
                            <span className="bg-gold/20 px-1 rounded">
                              {platform.quote}
                            </span>
                          </p>
                        </div>

                        {/* Sentiment & Confidence */}
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <sentiment.icon className={`h-4 w-4 ${sentiment.color}`} />
                            <span className="text-sm">
                              <span className="text-muted-foreground">Sentiment:</span>{" "}
                              <span className={`font-medium ${sentiment.color}`}>
                                {sentiment.label}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              <span className="text-muted-foreground">Confidence:</span>{" "}
                              <span className="font-medium">
                                {Math.round((platform.confidence || 0) * 100)}%
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg bg-error/5 border border-error/20">
                        <p className="text-sm text-muted-foreground mb-2">
                          Your brand was not found in responses from this platform.
                        </p>
                        <p className="text-sm font-medium">
                          Why this matters: This platform serves millions of users daily. Improving
                          your visibility here could significantly increase brand awareness.
                        </p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="gold" size="lg" className="flex-1" asChild>
            <Link to="/recommendations">
              <Lightbulb className="h-4 w-4 mr-2" />
              View Recommendations
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="flex-1" asChild>
            <Link to="/scanner">
              <Radar className="h-4 w-4 mr-2" />
              Run Another Scan
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
