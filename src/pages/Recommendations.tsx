import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronRight,
  Check,
  Radar,
} from "lucide-react";
import { Link } from "react-router-dom";

const mockRecommendations = [
  {
    id: "1",
    priority: "critical",
    category: "Content",
    title: "Add structured data to your website",
    description:
      "AI systems rely heavily on structured data (Schema.org markup) to understand your business.",
    impact: "High impact on AI understanding of your business",
    steps: [
      "Add Organization schema to your homepage",
      "Include Product/Service schema for offerings",
      "Add FAQ schema for common questions",
      "Validate with Google's Rich Results Test",
    ],
    completed: false,
  },
  {
    id: "2",
    priority: "high",
    category: "Authority",
    title: "Build more quality backlinks",
    description:
      "AI models often reference authoritative sources. Increase your domain authority through quality backlinks.",
    impact: "Medium-high impact on AI mentions",
    steps: [
      "Identify industry publications and blogs",
      "Create linkable content (research, guides)",
      "Reach out for guest posting opportunities",
      "Monitor and respond to brand mentions",
    ],
    completed: false,
  },
  {
    id: "3",
    priority: "medium",
    category: "Content",
    title: "Create comprehensive product documentation",
    description:
      "Detailed documentation helps AI understand and recommend your products accurately.",
    impact: "Medium impact on product recommendations",
    steps: [
      "Document all product features thoroughly",
      "Include use cases and examples",
      "Add comparison guides with alternatives",
      "Keep content regularly updated",
    ],
    completed: true,
  },
  {
    id: "4",
    priority: "low",
    category: "Social Proof",
    title: "Encourage customer reviews on third-party sites",
    description: "Reviews on platforms like G2, Capterra help build AI trust signals.",
    impact: "Low-medium impact on trust signals",
    steps: [
      "Ask satisfied customers for reviews",
      "Respond to existing reviews professionally",
      "Showcase reviews on your website",
    ],
    completed: false,
  },
];

export default function Recommendations() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedRec, setSelectedRec] = useState<typeof mockRecommendations[0] | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean[]>>({});

  const completedCount = mockRecommendations.filter((r) => r.completed).length;
  const progress = (completedCount / mockRecommendations.length) * 100;

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "critical":
        return {
          icon: AlertTriangle,
          color: "text-error",
          bg: "bg-error/10",
          border: "border-error/30",
          label: "Critical",
        };
      case "high":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bg: "bg-warning/10",
          border: "border-warning/30",
          label: "High",
        };
      case "medium":
        return {
          icon: Info,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/30",
          label: "Medium",
        };
      default:
        return {
          icon: Lightbulb,
          color: "text-muted-foreground",
          bg: "bg-muted",
          border: "border-muted-foreground/30",
          label: "Low",
        };
    }
  };

  const filteredRecs = mockRecommendations.filter(
    (rec) => filter === "all" || rec.priority === filter
  );

  const toggleStep = (recId: string, stepIndex: number) => {
    setCompletedSteps((prev) => {
      const recSteps = prev[recId] || [];
      const newSteps = [...recSteps];
      newSteps[stepIndex] = !newSteps[stepIndex];
      return { ...prev, [recId]: newSteps };
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Recommendations</h1>
            <p className="text-muted-foreground mt-1">
              Actionable steps to improve your AI visibility
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/scanner">
              <Radar className="h-4 w-4 mr-2" />
              Run New Scan
            </Link>
          </Button>
        </div>

        {/* Progress Card */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Your Progress</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {mockRecommendations.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "critical", "high", "medium", "low"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-primary/10 text-primary" : ""}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecs.length > 0 ? (
            filteredRecs.map((rec) => {
              const config = getPriorityConfig(rec.priority);
              const PriorityIcon = config.icon;

              return (
                <div
                  key={rec.id}
                  className={`glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer ${
                    rec.completed ? "opacity-60" : ""
                  }`}
                  onClick={() => setSelectedRec(rec)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}
                    >
                      <PriorityIcon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border}`}
                        >
                          {config.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{rec.category}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {rec.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {rec.completed && (
                        <div className="flex items-center gap-1 text-success">
                          <Check className="h-4 w-4" />
                          <span className="text-sm font-medium">Done</span>
                        </div>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No recommendations yet</h3>
              <p className="text-muted-foreground mb-6">
                Run a scan to get personalized recommendations for improving your AI visibility
              </p>
              <Button variant="gold" asChild>
                <Link to="/scanner">
                  <Radar className="h-4 w-4 mr-2" />
                  Start First Scan
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Recommendation Detail Modal */}
        <Dialog open={!!selectedRec} onOpenChange={() => setSelectedRec(null)}>
          {selectedRec && (
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const config = getPriorityConfig(selectedRec.priority);
                    return (
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border}`}
                      >
                        {config.label}
                      </span>
                    );
                  })()}
                  <span className="text-xs text-muted-foreground">{selectedRec.category}</span>
                </div>
                <DialogTitle>{selectedRec.title}</DialogTitle>
                <DialogDescription>{selectedRec.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm font-medium">Impact: {selectedRec.impact}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Action Steps</h4>
                  <div className="space-y-3">
                    {selectedRec.steps.map((step, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-card cursor-pointer transition-colors"
                      >
                        <Checkbox
                          checked={completedSteps[selectedRec.id]?.[index] || false}
                          onCheckedChange={() => toggleStep(selectedRec.id, index)}
                        />
                        <span
                          className={`text-sm ${
                            completedSteps[selectedRec.id]?.[index]
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {step}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setSelectedRec(null)}>
                  Close
                </Button>
                <Button variant="gold">Mark as Complete</Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
