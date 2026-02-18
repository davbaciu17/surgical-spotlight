// Surgical AEO/GEO Dashboard
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SurgicalScore } from "@/components/dashboard/SurgicalScore";
import { ScanProgressBanner } from "@/components/dashboard/ScanProgressBanner";
import { Button } from "@/components/ui/button";
import {
  Radar,
  Plus,
  Lightbulb,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useUserScans } from "@/hooks/useUserScans";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

const gradeColor = (grade: string | null) => {
  switch (grade) {
    case "A":
    case "A+":
      return "text-success";
    case "B":
    case "B+":
      return "text-primary";
    case "C":
      return "text-warning";
    default:
      return "text-error";
  }
};

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { scans, isLoading } = useUserScans(user?.id);

  const firstName = profile?.full_name?.split(" ")[0] || "Utilizator";

  // Derive scores from completed scans
  const completedScans = scans.filter((s) => s.status === "completed");
  const inProgressScans = scans.filter(
    (s) => s.status !== "completed" && s.status !== "failed"
  );

  const currentScore = completedScans[0]?.surgical_score ?? null;
  const previousScore = completedScans[1]?.surgical_score ?? null;
  const scoreChange =
    currentScore !== null && previousScore !== null
      ? currentScore - previousScore
      : null;

  const lastScanDate = scans[0]?.created_at
    ? format(new Date(scans[0].created_at), "d MMM yyyy", { locale: ro })
    : null;

  // Build score trend from completed scans (most recent 7, reversed for chronological order)
  const scoreData = completedScans
    .slice(0, 7)
    .reverse()
    .map((s) => ({
      date: format(new Date(s.created_at), "d MMM", { locale: ro }),
      score: s.surgical_score ?? 0,
    }));

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  // Empty state — no scans yet
  if (scans.length === 0) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold mb-6">
              <Radar className="h-10 w-10 text-gold-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-3">
              Bine ai venit, {firstName}!
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Începe prima ta scanare de vizibilitate AI pentru a descoperi cum
              apare brandul tău în platformele AI.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/scanner">
                <Sparkles className="h-5 w-5 mr-2" />
                Începe Prima Scanare
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bine ai revenit, {firstName}</h1>
            {lastScanDate && (
              <p className="text-muted-foreground mt-1">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Ultima scanare: {lastScanDate}
                </span>
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/companies">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă Companie
              </Link>
            </Button>
            <Button variant="gold" asChild>
              <Link to="/scanner">
                <Radar className="h-4 w-4 mr-2" />
                Scanare Nouă
              </Link>
            </Button>
          </div>
        </div>

        {/* In-Progress Scan Banners */}
        {inProgressScans.map((scan) => (
          <div key={scan.id} className="mb-6">
            <ScanProgressBanner scan={scan} />
          </div>
        ))}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Surgical Score Card */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-6">
                Scorul Tău Surgical™
              </h3>
              {currentScore !== null ? (
                <>
                  <SurgicalScore score={currentScore} size="lg" />
                  {scoreChange !== null && (
                    <div className="mt-6 flex items-center gap-2">
                      {scoreChange > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-success" />
                          <span className="text-success font-medium">
                            +{scoreChange} față de ultima scanare
                          </span>
                        </>
                      ) : scoreChange < 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-error rotate-180" />
                          <span className="text-error font-medium">
                            {scoreChange} față de ultima scanare
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground font-medium">
                          Nicio schimbare
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">
                  Niciun scor disponibil încă
                </p>
              )}
              <Button variant="gold" className="mt-6 w-full" asChild>
                <Link to="/scanner">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Îmbunătățește Scorul
                </Link>
              </Button>
            </div>
          </div>

          {/* Score Trend Chart */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Evoluția Scorului</h3>
                <span className="text-sm text-muted-foreground">
                  Ultimele scanări
                </span>
              </div>
              {scoreData.length > 1 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{
                          fill: "hsl(var(--gold))",
                          strokeWidth: 2,
                          r: 5,
                        }}
                        activeDot={{ r: 8, fill: "hsl(var(--gold))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Graficul apare după cel puțin 2 scanări completate.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Recent Scans */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Acțiuni Rapide</h3>
              <div className="space-y-3">
                <Link
                  to="/scanner"
                  className="flex items-center justify-between p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <Radar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Scanare Completă</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
                <Link
                  to="/recommendations"
                  className="flex items-center justify-between p-3 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-gold" />
                    <span className="font-medium">Vezi Recomandări</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </div>
            </div>

            {/* Recent Scans */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Scanări Recente</h3>
              <div className="space-y-3">
                {scans.slice(0, 5).map((scan) => (
                  <Link
                    key={scan.id}
                    to={`/scanner/results/${scan.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-card/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{scan.business_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(scan.created_at), "d MMM yyyy", {
                          locale: ro,
                        })}
                        {scan.status !== "completed" &&
                          scan.status !== "failed" && (
                            <span className="ml-2 text-primary">
                              • În progres
                            </span>
                          )}
                        {scan.status === "failed" && (
                          <span className="ml-2 text-error">• Eșuat</span>
                        )}
                      </p>
                    </div>
                    {scan.surgical_score !== null ? (
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-gradient-gold">
                          {scan.surgical_score}
                        </span>
                        {scan.grade && (
                          <p
                            className={`text-xs font-medium ${gradeColor(
                              scan.grade
                            )}`}
                          >
                            {scan.grade}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Banner (for free users) */}
        <div className="mt-8 glass-strong rounded-2xl p-6 md:p-8 border-2 border-gold/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-3">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">
                  Funcție Pro
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Deblochează Scanări Nelimitate
              </h3>
              <p className="text-muted-foreground">
                Obține scanări nelimitate, istoric și rapoarte PDF cu Pro.
              </p>
            </div>
            <Button variant="gold" size="lg">
              Treci la Pro
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
