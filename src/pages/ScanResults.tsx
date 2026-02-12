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
  Sparkles,
  Loader2,
  Check,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useScanStatus, type ScanStatus } from "@/hooks/useScanStatus";
import { useScanResults } from "@/hooks/useScanResults";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

const statusSteps: { key: ScanStatus; label: string }[] = [
  { key: "pending", label: "Inițializare" },
  { key: "generating", label: "Generare Întrebări" },
  { key: "testing", label: "Testare Platforme" },
  { key: "scoring", label: "Calculare Scor" },
  { key: "completed", label: "Complet" },
];

const statusOrder: Record<ScanStatus, number> = {
  pending: 0,
  generating: 1,
  testing: 2,
  scoring: 3,
  completed: 4,
  failed: -1,
};

// Map 10 n8n query_types → 5 display categories
const DISPLAY_CATEGORIES = [
  "DISCOVERY",
  "COMPARISON",
  "REPUTATION",
  "EXPERTISE",
  "TRANSACTIONAL",
] as const;

const categoryLabels: Record<string, string> = {
  DISCOVERY: "Descoperire",
  COMPARISON: "Comparație",
  REPUTATION: "Reputație",
  EXPERTISE: "Expertiză",
  TRANSACTIONAL: "Tranzacțional",
};

const queryTypeToCategory: Record<string, string> = {
  local_search: "DISCOVERY",
  service_search: "DISCOVERY",
  comparison: "COMPARISON",
  price_focused: "COMPARISON",
  recommendation: "REPUTATION",
  review_based: "REPUTATION",
  quality_focused: "EXPERTISE",
  problem_solution: "EXPERTISE",
  product_specific: "TRANSACTIONAL",
  delivery_focused: "TRANSACTIONAL",
};

function getDisplayCategory(queryType: string): string {
  return queryTypeToCategory[queryType] ?? "DISCOVERY";
}

// mentions_business is a string in DB: "none" | "mentioned" | "recommended" etc.
function isMentioned(mentions: string | null | boolean): boolean {
  if (typeof mentions === "boolean") return mentions;
  if (!mentions) return false;
  return mentions !== "none";
}

export default function ScanResults() {
  const { id } = useParams();
  const { scan, isLoading: statusLoading, isInProgress } = useScanStatus(id);
  const { results, queries, isLoading: resultsLoading } = useScanResults(
    scan?.request_id
  );

  // Loading state
  if (statusLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  // Scan not found
  if (!scan) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Scanare negăsită</h1>
          <p className="text-muted-foreground mb-6">
            Scanarea cu acest ID nu a fost găsită.
          </p>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Înapoi la Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Failed state
  if (scan.status === "failed") {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-16 text-center max-w-lg">
          <AlertTriangle className="h-12 w-12 text-error mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Scanare eșuată</h1>
          <p className="text-muted-foreground mb-6">
            A apărut o eroare la procesarea scanării pentru{" "}
            <strong>{scan.business_name}</strong>. Te rugăm să încerci din nou.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/dashboard">Înapoi la Dashboard</Link>
            </Button>
            <Button variant="gold" asChild>
              <Link to="/scanner">
                <RefreshCw className="h-4 w-4 mr-2" />
                Scanare Nouă
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // In-progress state
  if (isInProgress) {
    const currentStepIndex = statusOrder[scan.status] ?? 0;

    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Înapoi la Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Analiză în Progres</h1>
            <p className="text-muted-foreground">
              {scan.business_name} •{" "}
              {format(new Date(scan.created_at), "d MMM yyyy, HH:mm", {
                locale: ro,
              })}
            </p>
          </div>

          {/* Animated Logo */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-20 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-gradient-gold flex items-center justify-center">
                <Radar className="h-12 w-12 text-gold-foreground animate-pulse" />
              </div>
            </div>
          </div>

          {/* Status Stepper */}
          <div className="glass rounded-2xl p-8 mb-8">
            <div className="space-y-4">
              {statusSteps.map((step, i) => {
                const isComplete = i < currentStepIndex;
                const isCurrent = i === currentStepIndex;

                return (
                  <div key={step.key} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isComplete
                          ? "bg-success text-success-foreground"
                          : isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="h-5 w-5" />
                      ) : isCurrent ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          isCurrent
                            ? "text-foreground"
                            : isComplete
                            ? "text-muted-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-primary">Se procesează...</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6 pt-6 border-t border-border">
              Timp estimat: 8-22 minute. Poți părăsi această pagină — te vom
              notifica.
            </p>
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/dashboard">Înapoi la Dashboard</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Completed state — show full results
  const scanDate = format(new Date(scan.created_at), "d MMM yyyy", {
    locale: ro,
  });

  // Group queries by display category (mapped from query_type)
  const queriesByCategory = DISPLAY_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = queries.filter(
        (q: any) => getDisplayCategory(q.query_type) === cat
      );
      return acc;
    },
    {} as Record<string, any[]>
  );

  // Category scores
  const categoryScores = DISPLAY_CATEGORIES.map((cat) => {
    const catQueries = queriesByCategory[cat] || [];
    if (catQueries.length === 0)
      return { category: cat, score: 0, total: 0, mentioned: 0 };
    const mentioned = catQueries.filter((q: any) =>
      isMentioned(q.mentions_business)
    ).length;
    return {
      category: cat,
      total: catQueries.length,
      mentioned,
    };
  });

  const totalMentioned = queries.filter((q: any) =>
    isMentioned(q.mentions_business)
  ).length;
  const totalQueries = queries.length;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Înapoi la Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Rezultatele Scanării</h1>
            <p className="text-muted-foreground">
              {scan.business_name} • {scanDate}
            </p>
          </div>
          <Button variant="goldOutline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Descarcă Raport
            <span className="ml-2 text-xs bg-gold/20 px-2 py-0.5 rounded">
              Pro
            </span>
          </Button>
        </div>

        {/* Score Hero */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <SurgicalScore score={scan.surgical_score ?? 0} size="lg" />
            <div className="flex-1 text-center md:text-left space-y-4">
              {scan.grade && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/30">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-lg font-bold text-gold">
                    Nota: {scan.grade}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {totalQueries > 0 && (
                  <>
                    <div className="px-4 py-2 rounded-lg bg-success/10 border border-success/30">
                      <p className="text-2xl font-bold text-success">
                        {totalMentioned}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mențiuni din {totalQueries}
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-error/10 border border-error/30">
                      <p className="text-2xl font-bold text-error">
                        {totalQueries - totalMentioned}
                      </p>
                      <p className="text-xs text-muted-foreground">Negăsite</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        {categoryScores.some((c) => c.total > 0) && (
          <div className="glass rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Rezultate pe Categorii</h2>
            <div className="space-y-4">
              {categoryScores
                .filter((c) => c.total > 0)
                .map((cat) => {
                  const percentage =
                    cat.total > 0
                      ? Math.round((cat.mentioned / cat.total) * 100)
                      : 0;
                  return (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {categoryLabels[cat.category] || cat.category}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {cat.mentioned}/{cat.total} mențiuni ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percentage >= 70
                              ? "bg-success"
                              : percentage >= 40
                              ? "bg-primary"
                              : percentage >= 20
                              ? "bg-warning"
                              : "bg-error"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Query Details by Category */}
        {queries.length > 0 && (
          <div className="glass rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">
              Detalii Întrebări ({queries.length})
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {DISPLAY_CATEGORIES.filter(
                (cat) => (queriesByCategory[cat] || []).length > 0
              ).map((cat) => {
                const catQueries = queriesByCategory[cat] || [];
                const catMentioned = catQueries.filter((q: any) =>
                  isMentioned(q.mentions_business)
                ).length;
                return (
                  <AccordionItem
                    key={cat}
                    value={cat}
                    className="border border-border rounded-xl px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="font-semibold">
                          {categoryLabels[cat] || cat}
                        </span>
                        <span className="ml-auto mr-4 text-sm text-muted-foreground">
                          {catMentioned}/{catQueries.length} mențiuni
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="space-y-3">
                        {catQueries.map((q: any, i: number) => {
                          const mentioned = isMentioned(q.mentions_business);
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                            >
                              <span
                                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                                  mentioned
                                    ? "bg-success/20 text-success"
                                    : "bg-error/20 text-error"
                                }`}
                              >
                                {mentioned ? "\u2713" : "\u2717"}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm">{q.query_text}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  {q.sentiment && (
                                    <span
                                      className={`text-xs ${
                                        q.sentiment === "positive"
                                          ? "text-success"
                                          : q.sentiment === "negative"
                                          ? "text-error"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {q.sentiment === "positive"
                                        ? "Pozitiv"
                                        : q.sentiment === "negative"
                                        ? "Negativ"
                                        : "Neutru"}
                                    </span>
                                  )}
                                  {q.position_rank > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      Poziția #{q.position_rank}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="gold" size="lg" className="flex-1" asChild>
            <Link to="/recommendations">
              <Lightbulb className="h-4 w-4 mr-2" />
              Vezi Recomandări
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="flex-1" asChild>
            <Link to="/scanner">
              <Radar className="h-4 w-4 mr-2" />
              Rulează Altă Scanare
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
