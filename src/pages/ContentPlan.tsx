import { useState } from "react";
import {
  Calendar,
  FileText,
  HelpCircle,
  TrendingUp,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { useContentPlan } from "@/hooks/useContentPlan";
import type { Tables } from "@/integrations/supabase/types";

type ContentPiece = Tables<"content_pieces">;

// ── Strategy colors & labels (client-facing Romanian) ──
const STRATEGY_CONFIG: Record<string, { bg: string; text: string; border: string; label: string; description: string }> = {
  captura: { bg: "rgba(255,59,92,0.12)", text: "#FF3B5C", border: "rgba(255,59,92,0.25)", label: "Vizibilitate Nou\u0103", description: "te face vizibil c\u00e2nd cineva pune aceast\u0103 \u00eentrebare" },
  ascensiune: { bg: "rgba(255,176,32,0.12)", text: "#FFB020", border: "rgba(255,176,32,0.25)", label: "Pozi\u021bie Mai Bun\u0103", description: "te mut\u0103 pe prima pozi\u021bie \u00een recomand\u0103ri" },
  sentiment: { bg: "rgba(0,229,160,0.12)", text: "#00E5A0", border: "rgba(0,229,160,0.25)", label: "Reputa\u021bie", description: "d\u0103 AI-ului motive concrete s\u0103 te recomande" },
  competitie: { bg: "rgba(0,184,212,0.12)", text: "#00B8D4", border: "rgba(0,184,212,0.25)", label: "Diferen\u021biere", description: "eviden\u021biaz\u0103 ce te face unic" },
  supporting: { bg: "rgba(139,92,246,0.12)", text: "#A78BFA", border: "rgba(139,92,246,0.25)", label: "Suport", description: "con\u021binut de sus\u021binere" },
  reinforcement: { bg: "rgba(107,107,117,0.12)", text: "#6B6B75", border: "rgba(107,107,117,0.25)", label: "\u00cent\u0103rire", description: "consolideaz\u0103 vizibilitatea existent\u0103" },
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  pillar: "Pilon", product_deep: "Produs", faq_page: "FAQ", local_context: "Local",
  listicle: "List\u0103", reputation: "Reputa\u021bie", differentiation: "Diferen\u021biere",
  process_bts: "Proces", guide: "Ghid", seasonal: "Sezonier", comparison: "Compara\u021bie",
  event_hook: "Eveniment", reinforcement: "\u00cent\u0103rire",
};

const PRIORITY_COLORS: Record<string, string> = {
  "CRITIC\u0102": "#FF3B5C", "RIDICAT\u0102": "#FFB020", "MEDIE": "#00E5A0",
};

const DAYS_OF_WEEK = ["LUN", "MAR", "MIE", "JOI", "VIN", "S\u00c2M", "DUM"];

function getScoreColor(score: number) {
  if (score >= 80) return "#00E5A0";
  if (score >= 65) return "#FFB020";
  return "#FF3B5C";
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

// ── Overview Cards ──
function OverviewCards({ plan, publishedCount, totalPieces }: {
  plan: Tables<"content_plans">;
  publishedCount: number;
  totalPieces: number;
}) {
  const scoreDiff = (plan.estimated_score || 0) - (plan.current_score || 0);
  const cards = [
    {
      label: "Scor Estimat",
      value: `${plan.current_score || 0} \u2192 ${plan.estimated_score || "?"}`,
      sub: scoreDiff > 0 ? `+${scoreDiff} puncte` : "",
      color: "#00E5A0",
    },
    {
      label: "Articole Generate",
      value: `${totalPieces}/30`,
      sub: plan.status === "generating" ? "Se genereaz\u0103..." : "Complete",
      color: "#00B8D4",
    },
    {
      label: "Publicate",
      value: `${publishedCount}/30`,
      sub: publishedCount > 0 ? `${Math.round((publishedCount / 30) * 100)}% progres` : "Niciun articol publicat",
      color: "#A78BFA",
    },
    {
      label: "\u00cembun\u0103t\u0103\u021bire Scor",
      value: scoreDiff > 0 ? `+${scoreDiff}` : "N/A",
      sub: "Dup\u0103 publicarea tuturor articolelor",
      color: "#FFB020",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl p-4"
          style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-plex mb-1" style={{ color: "#6B6B75" }}>{c.label}</p>
          <p className="text-xl font-syne font-bold" style={{ color: c.color }}>{c.value}</p>
          <p className="text-xs font-plex mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ── Calendar Tab ──
function CalendarTab({ pieces, onSelectPiece }: { pieces: ContentPiece[]; onSelectPiece: (p: ContentPiece) => void }) {
  // Build a 30-day grid starting from the first piece's publish_date
  const firstDate = pieces[0]?.publish_date ? new Date(pieces[0].publish_date) : new Date();
  const startOfMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
  const daysInMonth = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();
  const firstDayOffset = (startOfMonth.getDay() + 6) % 7; // Mon=0
  const monthLabel = startOfMonth.toLocaleDateString("ro-RO", { month: "long", year: "numeric" });
  const totalCells = Math.ceil((daysInMonth + firstDayOffset) / 7) * 7;

  const cells: (number | null)[] = Array.from({ length: totalCells }, (_, i) => {
    const day = i - firstDayOffset + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  const piecesByDay: Record<number, ContentPiece[]> = {};
  for (const p of pieces) {
    if (p.publish_date) {
      const d = new Date(p.publish_date).getDate();
      if (!piecesByDay[d]) piecesByDay[d] = [];
      piecesByDay[d].push(p);
    }
  }

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {Object.entries(STRATEGY_CONFIG).slice(0, 4).map(([key, c]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.text }} />
            <span className="text-xs font-plex" style={{ color: "#6B6B75" }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Month header */}
      <div
        className="flex items-center justify-center rounded-xl px-4 py-3 mb-4"
        style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h2 className="font-semibold font-syne capitalize">{monthLabel}</h2>
      </div>

      {/* Grid */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-7">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-xs font-plex font-semibold uppercase tracking-wide"
              style={{ background: "#1A1A1E", color: "#6B6B75", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const dayPieces = day ? (piecesByDay[day] || []) : [];
            return (
              <div
                key={idx}
                className="min-h-[100px] p-1.5 space-y-1"
                style={{
                  borderRight: (idx + 1) % 7 !== 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: day ? "#141416" : "#0F0F11",
                }}
              >
                {day && (
                  <>
                    <p className="text-xs font-mono font-semibold" style={{ color: "#6B6B75" }}>{day}</p>
                    {dayPieces.map((piece) => {
                      const sc = STRATEGY_CONFIG[piece.strategy || ""] || STRATEGY_CONFIG.captura;
                      return (
                        <button
                          key={piece.id}
                          onClick={() => onSelectPiece(piece)}
                          className="rounded-lg p-2 text-left w-full transition-opacity hover:opacity-80"
                          style={{ background: sc.bg, border: `1px solid ${sc.border}` }}
                        >
                          <div className="flex items-center gap-1 mb-0.5">
                            <span
                              className="text-[9px] font-plex font-semibold px-1.5 py-0.5 rounded-full"
                              style={{ background: sc.bg, color: sc.text }}
                            >
                              {CONTENT_TYPE_LABELS[piece.content_type || ""] || piece.content_type}
                            </span>
                            {piece.status === "published" && (
                              <Check className="w-3 h-3" style={{ color: "#00E5A0" }} />
                            )}
                          </div>
                          <p className="text-[11px] font-plex leading-snug line-clamp-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                            {piece.title}
                          </p>
                          {piece.priority && (
                            <div className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: PRIORITY_COLORS[piece.priority] || "#6B6B75" }} />
                          )}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Article Detail Panel ──
function ArticleDetail({ piece, onClose, onMarkPublished }: {
  piece: ContentPiece;
  onClose: () => void;
  onMarkPublished: (id: string, url: string) => void;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const [publishUrl, setPublishUrl] = useState("");
  const sc = STRATEGY_CONFIG[piece.strategy || ""] || STRATEGY_CONFIG.captura;
  const score = piece.ai_citation_score || 0;

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto"
        style={{ background: "#0E0E10", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4" style={{ background: "#0E0E10", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-plex px-2 py-1 rounded-full" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
              {sc.label}
            </span>
            <span className="text-xs font-plex px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#6B6B75" }}>
              Ziua {piece.day_number}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title + Score */}
          <div>
            <h2 className="text-xl font-syne font-bold mb-3">{piece.title}</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-plex" style={{ color: "#6B6B75" }}>AI Citation Score</span>
              <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: getScoreColor(score) }} />
              </div>
              <span className="text-sm font-mono font-bold" style={{ color: getScoreColor(score) }}>{score}</span>
            </div>
          </div>

          {/* Target Queries */}
          {piece.target_queries_text && piece.target_queries_text.length > 0 && (
            <div>
              <h3 className="text-sm font-plex font-semibold mb-2" style={{ color: "#6B6B75" }}>Interog&#259;ri &#538;intite</h3>
              <div className="flex flex-wrap gap-2">
                {piece.target_queries_text.map((q, i) => (
                  <span key={i} className="text-xs font-plex px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Unique Angle */}
          {piece.unique_angle && (
            <div className="rounded-lg p-3" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.12)" }}>
              <h3 className="text-xs font-plex font-semibold mb-1" style={{ color: "#00E5A0" }}>Unghi Unic</h3>
              <p className="text-sm font-plex" style={{ color: "rgba(255,255,255,0.7)" }}>{piece.unique_angle}</p>
            </div>
          )}

          {/* Article Preview */}
          {piece.body_html && (
            <div>
              <h3 className="text-sm font-plex font-semibold mb-2" style={{ color: "#6B6B75" }}>Previzualizare Articol</h3>
              <div
                className="rounded-lg p-4 prose prose-invert prose-sm max-w-none"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                dangerouslySetInnerHTML={{ __html: piece.body_html }}
              />
            </div>
          )}

          {/* Copy Buttons */}
          <div className="flex flex-wrap gap-2">
            {piece.body_html && (
              <button
                onClick={() => handleCopy(piece.body_html!, "html")}
                className="flex items-center gap-1.5 text-xs font-plex px-3 py-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied === "html" ? "#00E5A0" : "rgba(255,255,255,0.6)" }}
              >
                {copied === "html" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} HTML
              </button>
            )}
            {piece.body_text && (
              <button
                onClick={() => handleCopy(piece.body_text!, "text")}
                className="flex items-center gap-1.5 text-xs font-plex px-3 py-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied === "text" ? "#00E5A0" : "rgba(255,255,255,0.6)" }}
              >
                {copied === "text" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Text
              </button>
            )}
            {piece.schema_json && (
              <button
                onClick={() => handleCopy(JSON.stringify(piece.schema_json, null, 2), "schema")}
                className="flex items-center gap-1.5 text-xs font-plex px-3 py-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied === "schema" ? "#00E5A0" : "rgba(255,255,255,0.6)" }}
              >
                {copied === "schema" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Schema
              </button>
            )}
            <button
              onClick={() => {
                const all = `<!-- ${piece.title} -->\n${piece.body_html || ""}\n\n<!-- Schema JSON-LD -->\n<script type="application/ld+json">\n${JSON.stringify(piece.schema_json, null, 2)}\n</script>`;
                handleCopy(all, "all");
              }}
              className="flex items-center gap-1.5 text-xs font-plex px-3 py-2 rounded-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied === "all" ? "#00E5A0" : "rgba(255,255,255,0.6)" }}
            >
              {copied === "all" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Tot
            </button>
          </div>

          {/* Publish Section */}
          {piece.status !== "published" ? (
            <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-plex font-semibold mb-3">Marcheaz&#259; ca Publicat</h3>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://site.ro/articol-slug"
                  value={publishUrl}
                  onChange={(e) => setPublishUrl(e.target.value)}
                  className="flex-1 text-sm font-plex px-3 py-2 rounded-lg bg-transparent"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
                <button
                  onClick={() => {
                    if (publishUrl) onMarkPublished(piece.id, publishUrl);
                  }}
                  className="text-sm font-plex font-semibold px-4 py-2 rounded-lg"
                  style={{ background: "#00E5A0", color: "#0E0E10" }}
                >
                  Salveaz&#259;
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg p-3" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.12)" }}>
              <Check className="w-4 h-4" style={{ color: "#00E5A0" }} />
              <span className="text-sm font-plex" style={{ color: "#00E5A0" }}>Publicat</span>
              {piece.published_url && (
                <a href={piece.published_url} target="_blank" rel="noreferrer" className="ml-auto">
                  <ExternalLink className="w-4 h-4" style={{ color: "#00E5A0" }} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Articles Tab ──
function ArticlesTab({ pieces, onSelectPiece }: { pieces: ContentPiece[]; onSelectPiece: (p: ContentPiece) => void }) {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<"day" | "score" | "priority">("day");

  let filtered = filter === "all" ? pieces : pieces.filter((p) => p.strategy === filter);
  if (sort === "score") filtered = [...filtered].sort((a, b) => (b.ai_citation_score || 0) - (a.ai_citation_score || 0));
  if (sort === "priority") {
    const order = { "CRITIC\u0102": 0, "RIDICAT\u0102": 1, "MEDIE": 2 };
    filtered = [...filtered].sort((a, b) => (order[a.priority as keyof typeof order] ?? 3) - (order[b.priority as keyof typeof order] ?? 3));
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex gap-1">
          {[{ key: "all", label: "Toate" }, ...Object.entries(STRATEGY_CONFIG).slice(0, 4).map(([k, v]) => ({ key: k, label: v.label }))].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="text-xs font-plex px-3 py-1.5 rounded-lg transition-colors"
              style={{
                background: filter === f.key ? "rgba(0,229,160,0.12)" : "rgba(255,255,255,0.04)",
                color: filter === f.key ? "#00E5A0" : "#6B6B75",
                border: `1px solid ${filter === f.key ? "rgba(0,229,160,0.25)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 ml-auto">
          {([["day", "Zi"], ["score", "Scor"], ["priority", "Prioritate"]] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className="text-xs font-plex px-2 py-1 rounded"
              style={{ color: sort === k ? "white" : "#6B6B75" }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="grid grid-cols-[50px_1fr_120px_100px_80px_80px_60px] gap-0 text-xs font-plex font-semibold uppercase tracking-wide" style={{ background: "#1A1A1E", color: "#6B6B75" }}>
          <div className="px-3 py-2.5">Zi</div>
          <div className="px-3 py-2.5">Titlu</div>
          <div className="px-3 py-2.5">Strategie</div>
          <div className="px-3 py-2.5">Tip</div>
          <div className="px-3 py-2.5">Scor AI</div>
          <div className="px-3 py-2.5">Priorit.</div>
          <div className="px-3 py-2.5">Status</div>
        </div>
        {filtered.map((piece) => {
          const sc = STRATEGY_CONFIG[piece.strategy || ""] || STRATEGY_CONFIG.captura;
          const score = piece.ai_citation_score || 0;
          return (
            <button
              key={piece.id}
              onClick={() => onSelectPiece(piece)}
              className="grid grid-cols-[50px_1fr_120px_100px_80px_80px_60px] gap-0 w-full text-left transition-colors hover:bg-white/[0.02]"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "#141416" }}
            >
              <div className="px-3 py-3 text-sm font-mono" style={{ color: "#6B6B75" }}>{piece.day_number}</div>
              <div className="px-3 py-3 text-sm font-plex truncate" style={{ color: "rgba(255,255,255,0.8)" }}>{piece.title}</div>
              <div className="px-3 py-3">
                <span className="text-[10px] font-plex font-semibold px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
              </div>
              <div className="px-3 py-3 text-xs font-plex" style={{ color: "#6B6B75" }}>{CONTENT_TYPE_LABELS[piece.content_type || ""] || piece.content_type}</div>
              <div className="px-3 py-3 flex items-center gap-1.5">
                <div className="w-12 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${score}%`, background: getScoreColor(score) }} />
                </div>
                <span className="text-xs font-mono" style={{ color: getScoreColor(score) }}>{score}</span>
              </div>
              <div className="px-3 py-3">
                {piece.priority && <div className="w-2 h-2 rounded-full" style={{ background: PRIORITY_COLORS[piece.priority] || "#6B6B75" }} />}
              </div>
              <div className="px-3 py-3">
                {piece.status === "published" ? (
                  <Check className="w-4 h-4" style={{ color: "#00E5A0" }} />
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ background: "#6B6B75" }} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── FAQ Tab ──
function FaqTab({ faqPiece }: { faqPiece: ContentPiece | undefined }) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!faqPiece) {
    return (
      <div className="text-center py-12">
        <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>Pagina FAQ nu a fost generat&#259; \u00eenc\u0103.</p>
      </div>
    );
  }

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-syne font-bold">{faqPiece.title}</h3>
        <div className="flex gap-2">
          {faqPiece.body_html && (
            <button
              onClick={() => handleCopy(faqPiece.body_html!, "html")}
              className="flex items-center gap-1.5 text-xs font-plex px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied === "html" ? "#00E5A0" : "rgba(255,255,255,0.6)" }}
            >
              {copied === "html" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} HTML
            </button>
          )}
          {faqPiece.schema_json && (
            <button
              onClick={() => handleCopy(JSON.stringify(faqPiece.schema_json, null, 2), "schema")}
              className="flex items-center gap-1.5 text-xs font-plex px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied === "schema" ? "#00E5A0" : "rgba(255,255,255,0.6)" }}
            >
              {copied === "schema" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Schema JSON-LD
            </button>
          )}
        </div>
      </div>

      {/* Rendered FAQ */}
      {faqPiece.body_html && (
        <div
          className="rounded-xl p-6 prose prose-invert prose-sm max-w-none"
          style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
          dangerouslySetInnerHTML={{ __html: faqPiece.body_html }}
        />
      )}

      {/* Target queries */}
      {faqPiece.target_queries_text && faqPiece.target_queries_text.length > 0 && (
        <div className="rounded-xl p-4" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h4 className="text-sm font-plex font-semibold mb-2" style={{ color: "#6B6B75" }}>Interog&#259;ri acoperite ({faqPiece.target_queries_text.length})</h4>
          <div className="flex flex-wrap gap-2">
            {faqPiece.target_queries_text.map((q, i) => (
              <span key={i} className="text-xs font-plex px-2 py-1 rounded-lg" style={{ background: "rgba(255,59,92,0.08)", color: "rgba(255,59,92,0.7)", border: "1px solid rgba(255,59,92,0.12)" }}>
                {q}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Progress Tab ──
function ProgressTab({ plan }: { plan: Tables<"content_plans"> }) {
  const metrics = [
    { label: "Rat\u0103 Men\u021bionare", current: plan.current_mention_rate, estimated: plan.estimated_mention_rate, suffix: "%" },
    { label: "Pozi\u021bie Medie", current: plan.current_avg_position, estimated: plan.estimated_avg_position, suffix: "", lower: true },
    { label: "Rat\u0103 Sentiment", current: plan.current_sentiment_rate, estimated: plan.estimated_sentiment_rate, suffix: "%" },
    { label: "Scor Surgical", current: plan.current_score, estimated: plan.estimated_score, suffix: "" },
  ];

  return (
    <div className="space-y-6">
      {/* Before/After Bars */}
      <div className="grid gap-4">
        {metrics.map((m) => {
          const cur = m.current || 0;
          const est = m.estimated || 0;
          const maxVal = m.label === "Pozi\u021bie Medie" ? 10 : 100;
          const curPct = m.lower ? ((maxVal - Number(cur)) / maxVal) * 100 : (Number(cur) / maxVal) * 100;
          const estPct = m.lower ? ((maxVal - Number(est)) / maxVal) * 100 : (Number(est) / maxVal) * 100;
          const improved = m.lower ? Number(est) < Number(cur) : Number(est) > Number(cur);

          return (
            <div key={m.label} className="rounded-xl p-4" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-plex font-semibold">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono" style={{ color: "#6B6B75" }}>{Number(cur).toFixed(1)}{m.suffix}</span>
                  <span className="text-xs" style={{ color: "#6B6B75" }}>\u2192</span>
                  <span className="text-sm font-mono font-bold" style={{ color: improved ? "#00E5A0" : "#FFB020" }}>
                    {Number(est).toFixed(1)}{m.suffix}
                  </span>
                  <span className="text-[10px] font-plex px-1.5 py-0.5 rounded" style={{ background: "rgba(255,176,32,0.12)", color: "#FFB020" }}>
                    Estimat
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-plex w-12" style={{ color: "#6B6B75" }}>Acum</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.max(curPct, 2)}%`, background: "#6B6B75" }} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-plex w-12" style={{ color: "#00E5A0" }}>Dup\u0103</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.max(estPct, 2)}%`, background: "#00E5A0" }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategy breakdown */}
      <div className="rounded-xl p-4" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-sm font-plex font-semibold mb-3">Distribu\u021bie Strategie</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "captura", count: plan.captura_count },
            { key: "ascensiune", count: plan.ascensiune_count },
            { key: "sentiment", count: plan.sentiment_count },
            { key: "competitie", count: plan.competitie_count },
          ].map((s) => {
            const cfg = STRATEGY_CONFIG[s.key];
            return (
              <div key={s.key} className="flex items-center gap-2 rounded-lg p-3" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.text }} />
                <span className="text-sm font-plex" style={{ color: cfg.text }}>{cfg.label}</span>
                <span className="ml-auto text-sm font-mono font-bold" style={{ color: cfg.text }}>{s.count || 0}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──
export default function ContentPlan() {
  const { plan, pieces, articlePieces, faqPiece, isLoading, isGenerating, publishedCount, markPublished, generatePlan, scanReady, error } = useContentPlan();
  const [activeTab, setActiveTab] = useState<"calendar" | "articole" | "faq" | "progres">("calendar");
  const [selectedPiece, setSelectedPiece] = useState<ContentPiece | null>(null);

  const tabs = [
    { key: "calendar" as const, label: "Calendar", icon: Calendar },
    { key: "articole" as const, label: "Articole", icon: FileText },
    { key: "faq" as const, label: "FAQ", icon: HelpCircle },
    { key: "progres" as const, label: "Progres", icon: TrendingUp },
  ];

  // Loading state
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#00E5A0" }} />
        </div>
      </AppLayout>
    );
  }

  // No plan yet — empty state
  if (!plan) {
    return (
      <AppLayout>
        <div className="p-6 max-w-[1400px]">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.25)" }}>
              <Sparkles className="w-7 h-7" style={{ color: "#00E5A0" }} />
            </div>
            <h2 className="text-2xl font-syne font-bold mb-3">Plan de Vizibilitate AI</h2>
            <p className="text-sm font-plex max-w-md mb-6" style={{ color: "#6B6B75" }}>
              {scanReady
                ? `Analiza pentru "${scanReady.businessName}" este complet\u0103. Genereaz\u0103 30 de articole optimizate pentru vizibilitate AI.`
                : "Ruleaz\u0103 mai \u00eent\u00e2i o analiz\u0103 complet\u0103, apoi genereaz\u0103 planul de con\u021binut bazat pe rezultate."}
            </p>
            {error && (
              <p className="text-sm font-plex mb-4" style={{ color: "#FF3B5C" }}>{error}</p>
            )}
            {scanReady ? (
              <button
                onClick={() => generatePlan(scanReady.businessId, scanReady.scanRunId)}
                className="flex items-center gap-2 text-sm font-plex font-semibold px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: "#00E5A0", color: "#0A0A0B" }}
              >
                <Sparkles className="w-4 h-4" />
                Genereaz\u0103 Plan de Con\u021binut
              </button>
            ) : (
              <p className="text-xs font-plex" style={{ color: "rgba(255,255,255,0.3)" }}>
                Mergi la Prezentare General\u0103 pentru a rula o analiz\u0103.
              </p>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Generating state
  if (isGenerating) {
    return (
      <AppLayout>
        <div className="p-6 max-w-[1400px]">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-12 h-12 animate-spin mb-6" style={{ color: "#00E5A0" }} />
            <h2 className="text-xl font-syne font-bold mb-2">Se genereaz&#259; planul de con\u021binut...</h2>
            <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
              30 de articole unice, optimizate pentru vizibilitate AI. Dureaz&#259; aproximativ 5 minute.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00E5A0" }} />
              <span className="text-xs font-plex" style={{ color: "#6B6B75" }}>Se proceseaz&#259;...</span>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-syne">Planul t\u0103u de vizibilitate AI \u2014 30 de zile</h1>
          <p className="text-sm font-plex mt-1" style={{ color: "#6B6B75" }}>
            Con\u021binut generat pentru a-\u021bi cre\u0219te vizibilitatea \u00een r\u0103spunsurile chatbot-urilor AI.
          </p>
        </div>

        {/* Overview Cards */}
        <OverviewCards plan={plan} publishedCount={publishedCount} totalPieces={pieces.length} />

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-plex transition-colors flex-1 justify-center"
                style={{
                  background: isActive ? "rgba(0,229,160,0.12)" : "transparent",
                  color: isActive ? "#00E5A0" : "#6B6B75",
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "calendar" && <CalendarTab pieces={pieces} onSelectPiece={setSelectedPiece} />}
        {activeTab === "articole" && <ArticlesTab pieces={articlePieces} onSelectPiece={setSelectedPiece} />}
        {activeTab === "faq" && <FaqTab faqPiece={faqPiece} />}
        {activeTab === "progres" && <ProgressTab plan={plan} />}

        {/* Article Detail Slide-over */}
        {selectedPiece && (
          <ArticleDetail
            piece={selectedPiece}
            onClose={() => setSelectedPiece(null)}
            onMarkPublished={async (id, url) => {
              await markPublished(id, url);
              setSelectedPiece(null);
            }}
          />
        )}
      </div>
    </AppLayout>
  );
}
