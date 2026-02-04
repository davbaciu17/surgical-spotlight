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
    category: "Conținut",
    title: "Adaugă date structurate pe website",
    description:
      "Sistemele AI se bazează foarte mult pe datele structurate (Schema.org markup) pentru a înțelege afacerea ta.",
    impact: "Impact ridicat asupra înțelegerii AI a afacerii tale",
    steps: [
      "Adaugă schema Organization pe pagina principală",
      "Include schema Product/Service pentru oferte",
      "Adaugă schema FAQ pentru întrebări frecvente",
      "Validează cu Google Rich Results Test",
    ],
    completed: false,
  },
  {
    id: "2",
    priority: "high",
    category: "Autoritate",
    title: "Construiește mai multe backlink-uri de calitate",
    description:
      "Modelele AI fac adesea referire la surse autoritare. Crește autoritatea domeniului prin backlink-uri de calitate.",
    impact: "Impact mediu-ridicat asupra mențiunilor AI",
    steps: [
      "Identifică publicații și bloguri din industrie",
      "Creează conținut linkabil (cercetări, ghiduri)",
      "Contactează pentru oportunități de guest posting",
      "Monitorizează și răspunde la mențiunile brandului",
    ],
    completed: false,
  },
  {
    id: "3",
    priority: "medium",
    category: "Conținut",
    title: "Creează documentație completă pentru produse",
    description:
      "Documentația detaliată ajută AI să înțeleagă și să recomande produsele tale corect.",
    impact: "Impact mediu asupra recomandărilor de produse",
    steps: [
      "Documentează toate funcționalitățile produsului în detaliu",
      "Include cazuri de utilizare și exemple",
      "Adaugă ghiduri comparative cu alternative",
      "Menține conținutul actualizat regulat",
    ],
    completed: true,
  },
  {
    id: "4",
    priority: "low",
    category: "Dovadă Socială",
    title: "Încurajează recenzii pe site-uri terțe",
    description: "Recenziile pe platforme precum G2, Capterra ajută la construirea semnalelor de încredere AI.",
    impact: "Impact scăzut-mediu asupra semnalelor de încredere",
    steps: [
      "Cere recenzii de la clienții mulțumiți",
      "Răspunde profesionist la recenziile existente",
      "Afișează recenziile pe website-ul tău",
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
          label: "Critic",
        };
      case "high":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bg: "bg-warning/10",
          border: "border-warning/30",
          label: "Ridicat",
        };
      case "medium":
        return {
          icon: Info,
          color: "text-primary",
          bg: "bg-primary/10",
          border: "border-primary/30",
          label: "Mediu",
        };
      default:
        return {
          icon: Lightbulb,
          color: "text-muted-foreground",
          bg: "bg-muted",
          border: "border-muted-foreground/30",
          label: "Scăzut",
        };
    }
  };

  const getFilterLabel = (f: string) => {
    switch (f) {
      case "all": return "Toate";
      case "critical": return "Critice";
      case "high": return "Ridicate";
      case "medium": return "Medii";
      case "low": return "Scăzute";
      default: return f;
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
            <h1 className="text-3xl font-bold">Recomandări</h1>
            <p className="text-muted-foreground mt-1">
              Pași acționabili pentru a-ți îmbunătăți vizibilitatea AI
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/scanner">
              <Radar className="h-4 w-4 mr-2" />
              Scanare Nouă
            </Link>
          </Button>
        </div>

        {/* Progress Card */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Progresul Tău</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount} din {mockRecommendations.length} completate
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
              {getFilterLabel(f)}
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
                          <span className="text-sm font-medium">Gata</span>
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
              <h3 className="text-xl font-bold mb-2">Nicio recomandare încă</h3>
              <p className="text-muted-foreground mb-6">
                Rulează o scanare pentru a primi recomandări personalizate de îmbunătățire a vizibilității AI
              </p>
              <Button variant="gold" asChild>
                <Link to="/scanner">
                  <Radar className="h-4 w-4 mr-2" />
                  Începe Prima Scanare
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
                  <h4 className="font-semibold mb-4">Pași de Acțiune</h4>
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
                  Închide
                </Button>
                <Button variant="gold">Marchează ca Finalizat</Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
