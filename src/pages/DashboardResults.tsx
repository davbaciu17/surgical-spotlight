import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useUserScans } from "@/hooks/useUserScans";
import { useScanResults } from "@/hooks/useScanResults";
import { QUERY_TYPE_LABELS, isMentioned } from "@/lib/constants";

function SentimentBadge({ sentiment }: { sentiment: string | null }) {
  if (!sentiment || sentiment === "neutral" || sentiment === "none") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-plex px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#6B6B75" }}>
        Neutru
      </span>
    );
  }
  if (sentiment === "positive") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-plex px-2 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>
        😊 Pozitiv
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-plex px-2 py-0.5 rounded-full" style={{ background: "rgba(255,59,92,0.1)", color: "#FF3B5C", border: "1px solid rgba(255,59,92,0.2)" }}>
      😞 Negativ
    </span>
  );
}

function PositionBadge({ pos }: { pos: number | null }) {
  if (!pos) return <span className="text-sm font-mono" style={{ color: "#6B6B75" }}>—</span>;
  const color = pos <= 3 ? "#00E5A0" : pos <= 6 ? "#FFB020" : "#FF3B5C";
  return (
    <span className="text-sm font-mono font-semibold" style={{ color }}>
      #{pos}
    </span>
  );
}

function MentionedBadge({ mentioned }: { mentioned: boolean }) {
  return mentioned ? (
    <span className="inline-flex items-center text-xs font-plex px-2 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>
      ✓ Da
    </span>
  ) : (
    <span className="inline-flex items-center text-xs font-plex px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "#6B6B75" }}>
      ✗ Nu
    </span>
  );
}

export default function DashboardResults() {
  const { user } = useAuth();
  const { scans } = useUserScans(user?.id);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const completedScans = scans.filter((s) => s.status === "completed");
  const latestScan = completedScans[0] ?? null;

  const { queries, isLoading } = useScanResults(latestScan?.request_id);

  // Filter state
  const [search, setSearch] = useState("");
  const [filterMentioned, setFilterMentioned] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filtered = useMemo(() => {
    return queries.filter((q) => {
      const mentionedBool = isMentioned(q.mentions_business);
      if (filterMentioned === "yes" && !mentionedBool) return false;
      if (filterMentioned === "no" && mentionedBool) return false;
      if (filterType !== "all" && q.query_type !== filterType) return false;
      if (search && !q.query_text?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [queries, filterMentioned, filterType, search]);

  // Summary stats
  const totalQueries = queries.length;
  const mentionedCount = queries.filter((q) => isMentioned(q.mentions_business)).length;
  const mentionRate = totalQueries > 0 ? Math.round((mentionedCount / totalQueries) * 100) : 0;
  const mentionedWithRank = queries.filter(
    (q) => isMentioned(q.mentions_business) && q.position_rank
  );
  const avgPos =
    mentionedWithRank.length > 0
      ? (
          mentionedWithRank.reduce((s, q) => s + (q.position_rank ?? 0), 0) /
          mentionedWithRank.length
        ).toFixed(1)
      : "—";
  const positiveCount = queries.filter(
    (q) => isMentioned(q.mentions_business) && q.sentiment === "positive"
  ).length;
  const sentimentPct =
    mentionedCount > 0 ? Math.round((positiveCount / mentionedCount) * 100) : 0;

  // Unique query types for filter
  const queryTypes = Array.from(new Set(queries.map((q) => q.query_type).filter(Boolean))) as string[];

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-syne">Rezultate Detaliate</h1>
          <p className="text-sm font-plex mt-1" style={{ color: "#6B6B75" }}>
            {latestScan?.business_name
              ? `Cele ${totalQueries} interogări testate pentru ${latestScan.business_name}`
              : "Vizualizează toate interogările testate"}
          </p>
        </div>

        {/* Summary stats */}
        {!isLoading && queries.length > 0 && (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl p-4"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { label: "Total interogări", value: String(totalQueries) },
              {
                label: "Menționate",
                value: `${mentionedCount} (${mentionRate}%)`,
                color: "#00E5A0",
              },
              { label: "Poziție medie", value: `#${avgPos}` },
              {
                label: "Sentiment pozitiv",
                value: `${sentimentPct}%`,
                color: sentimentPct >= 60 ? "#00E5A0" : "#FFB020",
              },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p className="text-xs font-plex" style={{ color: "#6B6B75" }}>{label}</p>
                <p
                  className="text-lg font-bold font-syne"
                  style={{ color: color ?? "#F5F5F7" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută interogare..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 font-plex"
              style={{ background: "#141416", borderColor: "rgba(255,255,255,0.1)" }}
            />
          </div>
          <Select value={filterMentioned} onValueChange={setFilterMentioned}>
            <SelectTrigger
              className="w-full sm:w-44 font-plex"
              style={{ background: "#141416", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <SelectValue placeholder="Menționate" />
            </SelectTrigger>
            <SelectContent style={{ background: "#1A1A1E" }}>
              <SelectItem value="all">Toate</SelectItem>
              <SelectItem value="yes">Da — Menționate</SelectItem>
              <SelectItem value="no">Nu — Nemenționate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger
              className="w-full sm:w-52 font-plex"
              style={{ background: "#141416", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <SelectValue placeholder="Tip interogare" />
            </SelectTrigger>
            <SelectContent style={{ background: "#1A1A1E" }}>
              <SelectItem value="all">Toate tipurile</SelectItem>
              {queryTypes.map((t) => (
                <SelectItem key={t} value={t!}>
                  {QUERY_TYPE_LABELS[t!] ?? t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : queries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-plex" style={{ color: "#6B6B75" }}>
                Rulează o scanare pentru a vedea rezultatele detaliate.
              </p>
            </div>
          ) : (
            <>
              {/* Table header */}
              <div
                className="grid grid-cols-[2rem_1fr_auto_auto_auto] md:grid-cols-[2rem_1fr_8rem_6rem_6rem_7rem] gap-3 px-4 py-3 text-xs font-plex font-semibold uppercase tracking-wide"
                style={{
                  background: "#1A1A1E",
                  color: "#6B6B75",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span>#</span>
                <span>Interogare</span>
                <span className="hidden md:block">Tip</span>
                <span>Menționat</span>
                <span>Poziție</span>
                <span className="hidden md:block">Sentiment</span>
              </div>

              {/* Rows */}
              <div>
                {filtered.map((q) => {
                  const mentioned = isMentioned(q.mentions_business);
                  const isExpanded = expandedRow === q.query_number;
                  return (
                    <div key={q.query_number}>
                      <div
                        className="grid grid-cols-[2rem_1fr_auto_auto_auto] md:grid-cols-[2rem_1fr_8rem_6rem_6rem_7rem] gap-3 px-4 py-3 items-center cursor-pointer transition-colors"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          background: isExpanded
                            ? "rgba(0,229,160,0.04)"
                            : "transparent",
                        }}
                        onClick={() =>
                          setExpandedRow(isExpanded ? null : q.query_number ?? null)
                        }
                      >
                        <span
                          className="text-xs font-mono"
                          style={{ color: "#6B6B75" }}
                        >
                          {q.query_number}
                        </span>
                        <span
                          className="text-sm font-plex truncate pr-2"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                          {q.query_text}
                        </span>
                        <span
                          className="hidden md:block text-xs font-plex"
                          style={{ color: "#6B6B75" }}
                        >
                          {QUERY_TYPE_LABELS[q.query_type ?? ""] ?? q.query_type ?? "—"}
                        </span>
                        <MentionedBadge mentioned={mentioned} />
                        <PositionBadge pos={mentioned ? q.position_rank : null} />
                        <div className="hidden md:flex items-center justify-between">
                          {mentioned ? (
                            <SentimentBadge sentiment={q.sentiment} />
                          ) : (
                            <span style={{ color: "#6B6B75" }}>—</span>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 ml-2 flex-shrink-0" style={{ color: "#6B6B75" }} />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" style={{ color: "#6B6B75" }} />
                          )}
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && q.llm_response && (
                        <div
                          className="px-4 pb-4"
                          style={{
                            background: "rgba(0,229,160,0.02)",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          <p
                            className="text-xs font-plex mb-2 uppercase tracking-wide"
                            style={{ color: "#6B6B75" }}
                          >
                            Răspuns AI
                          </p>
                          <p
                            className="text-sm font-plex leading-relaxed"
                            style={{
                              color: "rgba(255,255,255,0.6)",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {q.llm_response}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div
                className="px-4 py-3 text-xs font-plex"
                style={{
                  background: "#1A1A1E",
                  color: "#6B6B75",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {filtered.length} din {totalQueries} interogări afișate
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
