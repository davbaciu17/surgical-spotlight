import { Link, useNavigate } from "react-router-dom";
import { ScanLoadingState } from "@/components/dashboard/ScanLoadingState";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  ArrowRight,
  Download,
  Radar,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { useAuth } from "@/contexts/AuthContext";
import { useUserScans } from "@/hooks/useUserScans";
import { useScanResults } from "@/hooks/useScanResults";
import {
  getGradeFromScore,
  GRADE_HEX_COLORS,
  GRADE_INTERPRETATIONS,
  isMentioned,
} from "@/lib/constants";
import { toast } from "sonner";

// Grade label map (short one-word label)
const GRADE_LABELS: Record<string, string> = {
  A: "Excelent",
  B: "Bun",
  C: "Moderat",
  D: "Scăzut",
  F: "Critic",
};

// Platform brand colors
const PLATFORM_COLORS: Record<string, string> = {
  ChatGPT: "#10A37F",
  Gemini: "#4285F4",
  Perplexity: "#20B8CD",
  Claude: "#D97757",
};

function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-3 w-full" />
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color = "#F5F5F7",
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="text-xs font-plex mb-1" style={{ color: "#6B6B75" }}>
        {label}
      </p>
      <p className="text-2xl font-bold font-syne" style={{ color }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs font-plex mt-0.5" style={{ color: "#6B6B75" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function DashboardOverview() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { scans, isLoading } = useUserScans(user?.id);

  const completedScans = scans.filter((s) => s.status === "completed");
  const inProgressScans = scans.filter(
    (s) => s.status !== "completed" && s.status !== "failed"
  );
  const latestScan = completedScans[0] ?? null;
  const previousScan = completedScans[1] ?? null;

  // No longer auto-redirect to onboarding — dashboard always shows

  const { results, queries, isLoading: resultsLoading } = useScanResults(
    latestScan?.request_id
  );

  const score = latestScan?.surgical_score ?? null;
  const grade = latestScan?.grade ?? (score !== null ? getGradeFromScore(score) : null);
  const scoreChange =
    score !== null && previousScan?.surgical_score != null
      ? score - previousScan.surgical_score
      : null;

  const gradeColor = grade ? GRADE_HEX_COLORS[grade] ?? "#F5F5F7" : "#F5F5F7";

  // Score trend chart data
  const trendData = completedScans
    .slice(0, 8)
    .reverse()
    .map((s, i) => ({
      label:
        completedScans.length === 1
          ? "Scanare 1"
          : format(new Date(s.created_at), "d MMM", { locale: ro }),
      score: s.surgical_score ?? 0,
    }));

  // Compute quick stats from queries
  const totalQueries = queries.length || 50;
  const mentionedCount = queries.filter((q) => isMentioned(q.mentions_business)).length;
  const mentionRate = totalQueries > 0 ? Math.round((mentionedCount / totalQueries) * 100) : 0;
  const mentionedWithRank = queries.filter(
    (q) => isMentioned(q.mentions_business) && q.position_rank
  );
  const avgPosition =
    mentionedWithRank.length > 0
      ? (
          mentionedWithRank.reduce((sum, q) => sum + (q.position_rank ?? 0), 0) /
          mentionedWithRank.length
        ).toFixed(1)
      : "—";
  const positiveCount = queries.filter(
    (q) => isMentioned(q.mentions_business) && q.sentiment === "positive"
  ).length;
  const sentimentPct =
    mentionedCount > 0 ? Math.round((positiveCount / mentionedCount) * 100) : 0;
  const opportunityScore = score !== null ? 100 - score : null;

  // Top competitors from results
  let topCompetitors: { name: string; count: number }[] = [];
  if (results?.top_competitors) {
    try {
      const parsed =
        typeof results.top_competitors === "string"
          ? JSON.parse(results.top_competitors)
          : results.top_competitors;
      if (Array.isArray(parsed)) {
        topCompetitors = parsed.slice(0, 5).map((c: { name?: string; mentions?: number }) => ({
          name: c.name ?? String(c),
          count: c.mentions ?? 0,
        }));
      }
    } catch {
      // ignore
    }
  }

  // Mock platform visibility (no per-platform data in DB yet)
  const platformData = [
    { platform: "ChatGPT", pct: score ? Math.min(100, Math.round(score * 1.1)) : 0 },
    { platform: "Gemini", pct: score ? Math.min(100, Math.round(score * 0.85)) : 0 },
    { platform: "Perplexity", pct: score ? Math.min(100, Math.round(score * 0.95)) : 0 },
    { platform: "Claude", pct: score ? Math.min(100, Math.round(score * 0.7)) : 0 },
  ];

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardSkeleton className="h-48" />
            <CardSkeleton className="h-48" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </AppLayout>
    );
  }

  // ── In-progress loading state ──
  if (inProgressScans.length > 0 && completedScans.length === 0) {
    return (
      <AppLayout>
        <ScanLoadingState />
      </AppLayout>
    );
  }

  // ── No completed scans — show empty state with CTA ──
  if (!latestScan) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl mb-6"
            style={{ background: "rgba(0,229,160,0.10)", border: "1px solid rgba(0,229,160,0.25)" }}
          >
            <Radar className="h-10 w-10" style={{ color: "#00E5A0" }} />
          </div>
          <h2 className="text-2xl font-bold font-syne mb-3">
            Bine ai venit în Surgical!
          </h2>
          <p className="font-plex mb-6 max-w-md" style={{ color: "#6B6B75" }}>
            {scans.length > 0
              ? "Scanările tale anterioare nu au fost finalizate. Pornește o analiză nouă pentru a vedea rezultatele."
              : "Pornește prima ta analiză de vizibilitate AI pentru a descoperi cum apare brandul tău în platformele AI."}
          </p>
          <Button variant="gold" size="lg" className="font-plex" asChild>
            <Link to="/onboarding">
              <Sparkles className="h-5 w-5 mr-2" />
              {scans.length > 0 ? "Scanare Nouă" : "Începe Prima Scanare"}
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const lastScanDate = format(
    new Date(latestScan.created_at),
    "d MMMM yyyy, HH:mm",
    { locale: ro }
  );

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-syne">
              {latestScan.business_name || profile?.company_name || "Prezentare Generală"}
            </h1>
            <p className="text-sm font-plex mt-0.5" style={{ color: "#6B6B75" }}>
              Ultima scanare: {lastScanDate}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="font-plex"
              onClick={() => toast.info("Funcție disponibilă cu planul Tratament.")}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="gold" size="sm" className="font-plex" asChild>
              <Link to="/onboarding">
                <Plus className="h-4 w-4 mr-2" />
                Scanare Nouă
              </Link>
            </Button>
          </div>
        </div>

        {/* ── In-progress banner (if new scan is running alongside existing results) ── */}
        {inProgressScans.length > 0 && (
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3"
            style={{
              background: "rgba(0,184,212,0.08)",
              border: "1px solid rgba(0,184,212,0.2)",
            }}
          >
            <div
              className="h-2 w-2 rounded-full animate-pulse flex-shrink-0"
              style={{ background: "#00B8D4" }}
            />
            <p className="text-sm font-plex" style={{ color: "#00B8D4" }}>
              O nouă analiză rulează în fundal. Rezultatele vor apărea automat.
            </p>
          </div>
        )}

        {/* ── Top row: Score hero + Interpretation ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score card */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs font-plex uppercase tracking-wider mb-5" style={{ color: "#6B6B75" }}>
              Scor Chirurgical™
            </p>
            <ScoreGauge score={score ?? 0} size="lg" />
            {scoreChange !== null && (
              <div className="flex items-center gap-1.5 mt-4">
                {scoreChange > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4" style={{ color: "#00E5A0" }} />
                    <span className="text-sm font-plex font-medium" style={{ color: "#00E5A0" }}>
                      +{scoreChange} față de scanarea anterioară
                    </span>
                  </>
                ) : scoreChange < 0 ? (
                  <>
                    <TrendingDown className="h-4 w-4" style={{ color: "#FF3B5C" }} />
                    <span className="text-sm font-plex font-medium" style={{ color: "#FF3B5C" }}>
                      {scoreChange} față de scanarea anterioară
                    </span>
                  </>
                ) : (
                  <>
                    <Minus className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-plex text-muted-foreground">Nicio schimbare</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Interpretation card */}
          <div
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {grade && (
              <>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-xl text-3xl font-bold font-syne"
                      style={{
                        background: `${gradeColor}15`,
                        border: `1px solid ${gradeColor}30`,
                        color: gradeColor,
                      }}
                    >
                      {grade}
                    </div>
                    <div>
                      <p className="text-lg font-bold font-syne">{GRADE_LABELS[grade]}</p>
                      <p className="text-xs font-plex" style={{ color: "#6B6B75" }}>
                        Grad de vizibilitate
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-plex leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {GRADE_INTERPRETATIONS[grade]}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5 w-full font-plex"
                  asChild
                >
                  <Link to="/dashboard/recommendations">
                    Următorii pași
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* ── Quick stats row ── */}
        {resultsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Rată de menționare"
              value={`${mentionRate}%`}
              sub={`${mentionedCount} din ${totalQueries} interogări`}
              color="#00E5A0"
            />
            <StatCard
              label="Poziție medie"
              value={`#${avgPosition}`}
              sub="Când ești menționat"
            />
            <StatCard
              label="Sentiment pozitiv"
              value={`${sentimentPct}%`}
              sub="Din mențiunile tale"
              color={sentimentPct >= 60 ? "#00E5A0" : sentimentPct >= 40 ? "#FFB020" : "#FF3B5C"}
            />
            <StatCard
              label="Scor oportunitate"
              value={opportunityScore !== null ? `${opportunityScore}` : "—"}
              sub="Puncte posibil de câștigat"
              color="#00B8D4"
            />
          </div>
        )}

        {/* ── Platform visibility + Top competitors ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform visibility */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold font-plex">Vizibilitate pe Platforme</h3>
              <span
                className="text-xs font-plex px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,183,0,0.1)", color: "#FFB020", border: "1px solid rgba(255,183,0,0.2)" }}
              >
                Estimat
              </span>
            </div>
            <div className="space-y-4">
              {platformData.map(({ platform, pct }) => (
                <div key={platform}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-plex" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {platform}
                    </span>
                    <span
                      className="text-sm font-mono font-semibold"
                      style={{ color: PLATFORM_COLORS[platform] ?? "#00E5A0" }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: PLATFORM_COLORS[platform] ?? "#00E5A0",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs font-plex mt-4" style={{ color: "#6B6B75" }}>
              Vizibilitate estimată per platformă — date exacte vin în curând.
            </p>
          </div>

          {/* Top competitors */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h3 className="text-sm font-semibold font-plex mb-5">Top Competitori</h3>
            {topCompetitors.length > 0 ? (
              <div className="space-y-3">
                {topCompetitors.map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono w-5 text-center flex-shrink-0"
                        style={{ color: "#6B6B75" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-plex" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {c.name}
                      </span>
                    </div>
                    <span
                      className="text-sm font-mono font-semibold"
                      style={{ color: i === 0 ? "#FF3B5C" : "rgba(255,255,255,0.5)" }}
                    >
                      {c.count}×
                    </span>
                  </div>
                ))}

                {/* User's own position note */}
                {latestScan.business_name && (
                  <div
                    className="mt-3 px-3 py-2 rounded-lg flex items-center justify-between"
                    style={{
                      background: "rgba(0,229,160,0.06)",
                      border: "1px solid rgba(0,229,160,0.15)",
                    }}
                  >
                    <span className="text-sm font-plex font-medium" style={{ color: "#00E5A0" }}>
                      {latestScan.business_name}
                    </span>
                    <span className="text-sm font-mono font-semibold" style={{ color: "#00E5A0" }}>
                      {mentionedCount}×
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="h-32 flex items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-sm font-plex text-center" style={{ color: "#6B6B75" }}>
                  Date competitori disponibile<br />după analiză completă.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Score evolution chart ── */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold font-plex">Evoluție Scor</h3>
            <span className="text-xs font-plex" style={{ color: "#6B6B75" }}>
              Ultimele {trendData.length} scanări
            </span>
          </div>

          {trendData.length >= 2 ? (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    stroke="transparent"
                    tick={{ fill: "#6B6B75", fontSize: 11, fontFamily: "IBM Plex Sans" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="transparent"
                    tick={{ fill: "#6B6B75", fontSize: 11, fontFamily: "IBM Plex Sans" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1A1A1E",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      fontFamily: "IBM Plex Sans",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#6B6B75" }}
                    itemStyle={{ color: "#00E5A0" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#00E5A0"
                    strokeWidth={2.5}
                    dot={{ fill: "#00E5A0", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#00E5A0", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div
              className="h-52 flex flex-col items-center justify-center rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <Radar className="h-8 w-8 mb-3" style={{ color: "#6B6B75" }} />
              <p className="text-sm font-plex text-center" style={{ color: "#6B6B75" }}>
                Rulează mai multe scanări pentru a vedea evoluția scorului tău.
              </p>
              <Button variant="outline" size="sm" className="mt-4 font-plex" asChild>
                <Link to="/onboarding">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Scanare Nouă
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(0,229,160,0.04)",
            border: "1px solid rgba(0,229,160,0.12)",
          }}
        >
          <div>
            <h3 className="font-semibold font-syne mb-1">Îmbunătățește-ți scorul</h3>
            <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
              Rulează o nouă scanare sau urmează planul de recomandări.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="outline" size="sm" className="font-plex" asChild>
              <Link to="/dashboard/recommendations">
                <ArrowRight className="h-4 w-4 mr-2" />
                Recomandări
              </Link>
            </Button>
            <Button variant="gold" size="sm" className="font-plex" asChild>
              <Link to="/onboarding">
                <Plus className="h-4 w-4 mr-2" />
                Scanare Nouă
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
