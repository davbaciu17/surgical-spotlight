import { useState } from "react";
import { ChevronLeft, ChevronRight, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/dashboard/AppLayout";

// ── Static mock calendar data ──
const MOCK_ITEMS: {
  day: number;
  type: "Listicle" | "Explainer" | "How-To" | "Brand";
  title: string;
  kd: number;
  vol: number;
}[] = [
  { day: 3, type: "Listicle", title: "Top 5 restaurante italiene din Brașov", kd: 22, vol: 470 },
  { day: 5, type: "How-To", title: "Cum alegi un restaurant autentic italian", kd: 18, vol: 320 },
  { day: 8, type: "Explainer", title: "De ce pasta proaspătă face diferența", kd: 12, vol: 260 },
  { day: 10, type: "Brand", title: "Povestea Bella Italia — 10 ani în Brașov", kd: 5, vol: 150 },
  { day: 12, type: "Listicle", title: "Cele mai bune locuri pentru cine în familie", kd: 28, vol: 580 },
  { day: 15, type: "How-To", title: "Cum rezervi o masă pentru ocazii speciale", kd: 14, vol: 200 },
  { day: 18, type: "Explainer", title: "Ingrediente italiene originale: ce să cauți", kd: 9, vol: 180 },
  { day: 20, type: "Listicle", title: "5 feluri de mâncare de încercat neapărat", kd: 31, vol: 640 },
  { day: 22, type: "Brand", title: "Recenzii Google: ce spun clienții noștri", kd: 4, vol: 120 },
  { day: 25, type: "How-To", title: "Cum complotezi o masă perfectă pentru cuplu", kd: 16, vol: 290 },
];

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Listicle: { bg: "rgba(0,184,212,0.12)", text: "#00B8D4", border: "rgba(0,184,212,0.25)" },
  Explainer: { bg: "rgba(0,229,160,0.12)", text: "#00E5A0", border: "rgba(0,229,160,0.25)" },
  "How-To": { bg: "rgba(255,176,32,0.12)", text: "#FFB020", border: "rgba(255,176,32,0.25)" },
  Brand: { bg: "rgba(139,92,246,0.12)", text: "#A78BFA", border: "rgba(139,92,246,0.25)" },
};

const DAYS_OF_WEEK = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

// Feb 2026 starts on Sunday (day 0) → in Mon-start grid, that's position 6
const MONTH_LABEL = "Februarie 2026";
const DAYS_IN_MONTH = 28;
const FIRST_DAY_OFFSET = 6; // Feb 1 is a Sunday; in Mon-first grid, offset = 6

function CalendarCard({
  title,
  type,
  kd,
  vol,
}: {
  title: string;
  type: string;
  kd: number;
  vol: number;
}) {
  const colors = TYPE_COLORS[type] ?? TYPE_COLORS["Explainer"];
  return (
    <div
      className="rounded-lg p-2 text-left w-full"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span
        className="text-[10px] font-plex font-semibold px-1.5 py-0.5 rounded-full inline-block mb-1"
        style={{ background: colors.bg, color: colors.text }}
      >
        {type}
      </span>
      <p className="text-[11px] font-plex leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>
        {title}
      </p>
      <p className="text-[10px] font-mono mt-1" style={{ color: "#6B6B75" }}>
        KD: {kd} · Vol: {vol}
      </p>
    </div>
  );
}

export default function ContentPlan() {
  const [month, setMonth] = useState(0); // 0 = Feb 2026

  // Build calendar grid: 6 rows × 7 cols
  const totalCells = 6 * 7;
  const cells: (number | null)[] = Array.from({ length: totalCells }, (_, i) => {
    const day = i - FIRST_DAY_OFFSET + 1;
    return day >= 1 && day <= DAYS_IN_MONTH ? day : null;
  });

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-syne">Plan Conținut</h1>
          <p className="text-sm font-plex mt-1" style={{ color: "#6B6B75" }}>
            Conținut recomandat AI pentru îmbunătățirea vizibilității tale.
          </p>
        </div>

        {/* Calendar shell (blurred behind overlay) */}
        <div className="relative">
          {/* Calendar content (blurred) */}
          <div style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none" }}>
            {/* Month nav */}
            <div
              className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
              style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button className="text-muted-foreground">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="font-semibold font-syne">{MONTH_LABEL}</h2>
              <button className="text-muted-foreground">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              {Object.entries(TYPE_COLORS).map(([type, c]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.text }} />
                  <span className="text-xs font-plex" style={{ color: "#6B6B75" }}>{type}</span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Day headers */}
              <div className="grid grid-cols-7">
                {DAYS_OF_WEEK.map((d) => (
                  <div
                    key={d}
                    className="py-2 text-center text-xs font-plex font-semibold uppercase tracking-wide"
                    style={{
                      background: "#1A1A1E",
                      color: "#6B6B75",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Cells */}
              <div className="grid grid-cols-7">
                {cells.map((day, idx) => {
                  const items = day
                    ? MOCK_ITEMS.filter((it) => it.day === day)
                    : [];
                  return (
                    <div
                      key={idx}
                      className="min-h-[90px] p-1.5 space-y-1"
                      style={{
                        borderRight:
                          (idx + 1) % 7 !== 0
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background: day ? "#141416" : "#0F0F11",
                      }}
                    >
                      {day && (
                        <>
                          <p
                            className="text-xs font-mono font-semibold"
                            style={{ color: "#6B6B75" }}
                          >
                            {day}
                          </p>
                          {items.map((item, ii) => (
                            <CalendarCard key={ii} {...item} />
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Coming soon overlay ── */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl"
            style={{ backdropFilter: "blur(1px)" }}
          >
            <div
              className="rounded-2xl p-8 text-center max-w-sm w-full mx-4"
              style={{
                background: "rgba(14,14,16,0.96)",
                border: "1px solid rgba(0,229,160,0.18)",
                boxShadow: "0 0 40px rgba(0,229,160,0.06), 0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "rgba(0,229,160,0.1)",
                  border: "1px solid rgba(0,229,160,0.25)",
                }}
              >
                <Lock className="h-5 w-5" style={{ color: "#00E5A0" }} />
              </div>

              <h3 className="text-lg font-bold font-syne mb-2">Plan de Conținut AI</h3>
              <p className="text-sm font-plex mb-6" style={{ color: "#6B6B75" }}>
                Generăm automat un plan de conținut lunar bazat pe lacunele din analiza ta —
                ce să scrii, când și pentru ce cuvinte cheie.
              </p>

              <div
                className="rounded-lg px-4 py-3 mb-5 text-left"
                style={{
                  background: "rgba(255,176,32,0.08)",
                  border: "1px solid rgba(255,176,32,0.18)",
                }}
              >
                <p className="text-xs font-plex font-semibold mb-1" style={{ color: "#FFB020" }}>
                  Disponibil cu planul Tratament
                </p>
                <p className="text-xs font-plex" style={{ color: "rgba(255,255,255,0.5)" }}>
                  8–12 articole sugerate/lună + brief complet
                </p>
              </div>

              <Button variant="gold" size="sm" className="w-full font-plex" asChild>
                <Link to="/dashboard/settings">
                  Upgrade la Tratament
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
