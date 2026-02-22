import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useAnalysisPolling } from "@/hooks/useAnalysisPolling";
import { ScanLoadingScreen } from "@/components/scan/ScanLoadingScreen";
import { ScoreHero } from "@/components/results/ScoreHero";
import { MetricsGrid } from "@/components/results/MetricsGrid";
import { CategoryBreakdown } from "@/components/results/CategoryBreakdown";
import { CompetitorChart } from "@/components/results/CompetitorChart";
import { ExampleResponses } from "@/components/results/ExampleResponses";
import { ResultsCTA } from "@/components/results/ResultsCTA";
import { isMentioned } from "@/lib/constants";

export default function ScanResults() {
  const { requestId } = useParams();
  const {
    scan,
    results,
    queries,
    isLoading,
    isWaiting,
    isCompleted,
    isFailed,
    isTimedOut,
    requestId: reqId,
  } = useAnalysisPolling(requestId);

  // Initial loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No scan found yet — show loading/polling state (not "not found")
  // The scan_runs row may not exist yet if polling started before the edge function finished
  if (!scan && !isTimedOut) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <ScanLoadingScreen
            status="pending"
            businessName="afacerea ta"
            createdAt={new Date().toISOString()}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Timed out without any scan data
  if (!scan && isTimedOut) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 py-16 text-center max-w-lg">
            <AlertTriangle className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Analiza negăsită</h1>
            <p className="text-muted-foreground mb-4">
              Nu am putut găsi rezultatele. Verifică link-ul sau încearcă o analiză nouă.
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono mb-6">
              Request ID: {requestId}
            </p>
            <Button variant="outline" asChild>
              <Link to="/analyze">Începe o analiză nouă</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Failed
  if (isFailed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 py-16 text-center max-w-lg">
            <AlertTriangle className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Analiza esuata</h1>
            <p className="text-muted-foreground mb-6">
              A aparut o eroare la procesarea analizei pentru{" "}
              <strong>{scan.business_name}</strong>. Te rugam sa incerci din
              nou.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="gold" asChild>
                <Link to="/analyze">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Analiza Noua
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Timed out
  if (isTimedOut) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 py-16 text-center max-w-lg">
            <AlertTriangle className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Analiza durează mai mult decât de obicei</h1>
            <p className="text-muted-foreground mb-4">
              Reveniți mai târziu. Puteți salva acest link pentru a verifica rezultatele.
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono mb-6">
              Request ID: {requestId}
            </p>
            <Button variant="outline" asChild>
              <Link to="/analyze">Încearcă o analiză nouă</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // In-progress — show loading screen
  if (isWaiting) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <ScanLoadingScreen
            status={scan.status}
            businessName={scan.business_name}
            createdAt={scan.created_at}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Completed — show full results
  const totalMentioned = queries.filter((q: any) =>
    isMentioned(q.mentions_business)
  ).length;
  const totalRecommended = results?.total_recommended ?? 0;
  const totalQueries = queries.length;

  // Parse top_competitors from results
  let topCompetitors: { name: string; mentions: number }[] = [];
  try {
    if (results?.top_competitors) {
      const parsed =
        typeof results.top_competitors === "string"
          ? JSON.parse(results.top_competitors)
          : results.top_competitors;
      if (Array.isArray(parsed)) {
        topCompetitors = parsed;
      }
    }
  } catch {
    // ignore parse errors
  }

  const businessMentions = totalMentioned;
  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScoreHero
            businessName={scan.business_name}
            score={results?.surgical_score ?? scan.surgical_score ?? 0}
            grade={results?.grade ?? scan.grade}
            totalMentioned={totalMentioned}
            totalRecommended={totalRecommended}
            totalQueries={totalQueries}
          />

          <MetricsGrid
            queries={queries as any}
            topCompetitors={topCompetitors}
          />

          {queries.length > 0 && (
            <CategoryBreakdown queries={queries as any} />
          )}

          <CompetitorChart
            businessName={scan.business_name}
            businessMentions={businessMentions}
            topCompetitors={topCompetitors}
          />

          <ExampleResponses
            queries={queries as any}
            businessName={scan.business_name}
          />

          <ResultsCTA shareUrl={shareUrl} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
