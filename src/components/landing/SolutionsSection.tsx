import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

// ─── Window chrome ────────────────────────────────────────────────────────────
function WindowChrome({ label }: { label: string }) {
  return (
    <div
      className="px-4 py-2.5 flex items-center gap-2 border-b flex-shrink-0"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57", opacity: 0.7 }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E", opacity: 0.7 }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840", opacity: 0.7 }} />
      </div>
      <span className="text-xs font-plex mx-auto" style={{ color: "#3A3A45" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Stat block ───────────────────────────────────────────────────────────────
function StatBlock({ value, line1, line2 }: { value: string; line1: string; line2: string }) {
  return (
    <div
      className="flex-1 px-3 py-2.5 rounded-xl min-w-0"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <p className="font-syne text-sm font-bold text-white leading-none mb-1 truncate">
        {value}
      </p>
      <p className="text-[10px] font-plex leading-tight" style={{ color: "#3A3A45" }}>
        {line1}
      </p>
      <p className="text-[10px] font-plex leading-tight" style={{ color: "#3A3A45" }}>
        {line2}
      </p>
    </div>
  );
}

// ─── BentoCard ────────────────────────────────────────────────────────────────
interface BentoCardProps {
  children: React.ReactNode;
  hoverBorder: string;
  delay?: number;
  className?: string;
}

function BentoCard({ children, hoverBorder, delay = 0, className = "" }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "#131315",
        border: `1px solid ${hovered ? hoverBorder : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 250ms ease-out",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </motion.div>
  );
}

// ─── CardText ─────────────────────────────────────────────────────────────────
interface CardTextProps {
  tag: string;
  title: React.ReactNode;
  description: string;
  stats: Array<{ value: string; line1: string; line2: string }>;
}

function CardText({ tag, title, description, stats }: CardTextProps) {
  return (
    <div className="p-5 md:p-6">
      <span
        className="font-mono text-[10px] font-semibold tracking-[0.18em] mb-4 block uppercase"
        style={{ color: "#00E5A0" }}
      >
        {tag}
      </span>
      <h3 className="font-syne text-xl md:text-2xl font-bold text-white leading-[1.25] mb-3">
        {title}
      </h3>
      <p
        className="font-plex text-sm leading-relaxed mb-5"
        style={{ color: "#4A4A55" }}
      >
        {description}
      </p>
      <div className="flex gap-2">
        {stats.map((s) => (
          <StatBlock key={s.line1} value={s.value} line1={s.line1} line2={s.line2} />
        ))}
      </div>
    </div>
  );
}

// ─── Content 1: Reddit Autopilot ──────────────────────────────────────────────
function RedditMockupContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <WindowChrome label="reddit.com • r/Romania" />

      <div className="p-4 space-y-3">
        {/* Thread post card */}
        <motion.div
          className="rounded-xl p-4"
          style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.05)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Subreddit + meta */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-plex font-semibold" style={{ color: "#FF5733" }}>
              r/Romania
            </span>
            <span className="text-[10px] font-plex" style={{ color: "#3A3A45" }}>
              • u/travel_enthusiast • 3h
            </span>
          </div>

          {/* Post title */}
          <p className="text-sm font-plex font-semibold text-white mb-2 leading-snug">
            Recomandări restaurant italian Brașov?
          </p>

          {/* Post body */}
          <p className="text-xs font-plex leading-relaxed mb-3" style={{ color: "#8A8A95" }}>
            Plănuim o vizită în Brașov weekendul viitor și căutăm un restaurant italian bun.
            Ceva autentic, nu fast-food.
          </p>

          {/* Actions */}
          <div
            className="flex items-center gap-4 pb-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-[11px] font-plex" style={{ color: "#4A4A55" }}>▲ 47</span>
            <span className="text-[11px] font-plex" style={{ color: "#4A4A55" }}>💬 12</span>
            <span className="text-[11px] font-plex" style={{ color: "#4A4A55" }}>↗ Share</span>
          </div>

          {/* Comment — slides up */}
          <motion.div
            className="mt-3 rounded-lg p-3"
            style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-plex font-semibold" style={{ color: "#00E5A0" }}>
                u/local_foodie
              </span>
              <span className="text-[10px] font-plex" style={{ color: "#3A3A45" }}>• 2h</span>
            </div>
            <p className="text-xs font-plex leading-relaxed mb-2.5" style={{ color: "#8A8A95" }}>
              Am fost recent la{" "}
              <span
                className="font-semibold"
                style={{
                  color: "#00E5A0",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(0,229,160,0.3)",
                  textUnderlineOffset: "2px",
                }}
              >
                Bella Italia
              </span>{" "}
              în centrul vechi. Paste proaspete, prețuri ok, atmosferă de familie. Recomand! 👌
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-plex" style={{ color: "#3A3A45" }}>▲ 23</span>
              <span className="text-[10px] font-plex" style={{ color: "#3A3A45" }}>Reply</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Surgical attribution label */}
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(0,229,160,0.05)",
            border: "1px solid rgba(0,229,160,0.12)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <span className="text-[10px]" style={{ color: "#00E5A0" }}>✦</span>
          <span className="text-[11px] font-plex" style={{ color: "#4A4A55" }}>
            Generat automat de{" "}
            <span style={{ color: "#00E5A0" }}>Surgical</span>
            {" "}· Indexat de ChatGPT în{" "}
            <span style={{ color: "#00E5A0" }}>36h</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Content 2: Content Calendar ──────────────────────────────────────────────
const FEB_WEEKS = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, null],
] as const;

const CONTENT_DAYS = new Set([3, 6, 10, 14, 17, 20, 24, 25, 27]);
const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
const SCHEMA_ITEMS = ["LocalBusiness Schema", "FAQ Section", "Structured Headers"];

function ContentCalendarContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [checked, setChecked] = useState([false, false, false]);

  useEffect(() => {
    if (!inView) return;
    const delays = [950, 1200, 1450];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        setChecked((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <WindowChrome label="Plan Editorial — Februarie 2026" />

      <div className="p-4 space-y-3">
        {/* Calendar grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Month header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-plex font-medium" style={{ color: "#6B6B75" }}>
              Februarie 2026
            </span>
            <span className="text-[10px] font-mono" style={{ color: "#2A2A35" }}>
              ← →
            </span>
          </div>

          {/* Day label row */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map((d, i) => (
              <div
                key={i}
                className="text-center text-[10px] font-plex font-medium"
                style={{ color: "#2A2A35" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          {FEB_WEEKS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => (
                <div key={di} className="flex flex-col items-center justify-center py-[3px]">
                  {day !== null && (
                    <>
                      <span
                        className="text-[11px] font-plex leading-none"
                        style={{
                          color: CONTENT_DAYS.has(day as number) ? "#D0D0D8" : "#2A2A35",
                        }}
                      >
                        {day}
                      </span>
                      {CONTENT_DAYS.has(day as number) && (
                        <div
                          className="w-1 h-1 rounded-full mt-[2px]"
                          style={{ background: "#00E5A0" }}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Article preview card — slides up */}
        <motion.div
          className="rounded-xl p-4"
          style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Type + target badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span
              className="text-[10px] font-plex font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,184,212,0.1)",
                color: "#00B8D4",
                border: "1px solid rgba(0,184,212,0.18)",
              }}
            >
              📝 Listicle
            </span>
            <span
              className="text-[10px] font-plex px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#4A4A55",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              Google + ChatGPT
            </span>
          </div>

          {/* Title */}
          <p className="text-sm font-plex font-semibold text-white mb-2 leading-snug">
            "Top 5 restaurante italiene din Brașov care merită vizitate în 2026"
          </p>

          {/* Target keyword */}
          <p className="text-[11px] font-plex mb-3" style={{ color: "#3A3A45" }}>
            🔍{" "}
            <span style={{ color: "#5A5A65" }}>
              "cel mai bun restaurant italian brașov"
            </span>
          </p>

          {/* Metrics */}
          <div
            className="flex items-center gap-4 mb-3 pb-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-[11px] font-plex" style={{ color: "#3A3A45" }}>
              KD: <span style={{ color: "#6B6B75" }}>22</span>
            </span>
            <span className="text-[11px] font-plex" style={{ color: "#3A3A45" }}>
              Vol: <span style={{ color: "#6B6B75" }}>470</span>
            </span>
            <span className="text-[11px] font-plex" style={{ color: "#3A3A45" }}>
              AI Visibility:{" "}
              <span style={{ color: "#FF3B5C", fontWeight: 600 }}>0%</span>
            </span>
          </div>

          {/* Schema checklist */}
          <div className="space-y-1.5">
            {SCHEMA_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: checked[i] ? "rgba(0,229,160,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${checked[i] ? "rgba(0,229,160,0.25)" : "rgba(255,255,255,0.07)"}`,
                    transition: "background 0.25s, border-color 0.25s",
                  }}
                >
                  {checked[i] && <Check className="w-2.5 h-2.5" style={{ color: "#00E5A0" }} />}
                </div>
                <span
                  className="text-[11px] font-plex"
                  style={{
                    color: checked[i] ? "#6B6B75" : "#3A3A45",
                    transition: "color 0.25s",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Content 3: Platform Stack ────────────────────────────────────────────────
const PLATFORM_KEYWORDS = ["restaurant italian", "brașov", "paste proaspete", "centru vechi"];

const PLATFORMS = [
  {
    name: "TripAdvisor",
    accent: "#34E0A1",
    headerBg: "#0D1F16",
    bodyBg: "#111613",
    rating: "4.6",
    meta: "127 recenzii",
    stars: 4,
    desc: "Restaurant italian autentic în centrul vechi al Brașovului. Paste proaspete, ingrediente locale, atmosferă caldă de familie.",
    showKeywords: true,
    indent: 0,
  },
  {
    name: "Google Business",
    accent: "#4285F4",
    headerBg: "#0D1220",
    bodyBg: "#0F1219",
    rating: "4.8",
    meta: "Deschis acum · $$",
    stars: 5,
    desc: "Cel mai apreciat restaurant italian din Brașov. Meniu diversificat, prețuri accesibile.",
    showKeywords: false,
    indent: 16,
  },
  {
    name: "Yelp",
    accent: "#D32323",
    headerBg: "#1F0D0D",
    bodyBg: "#170D0D",
    rating: "4.5",
    meta: "$$ · Italian",
    stars: 4,
    desc: "",
    showKeywords: false,
    indent: 32,
  },
] as const;

function PlatformStackContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [kwActive, setKwActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const timers = PLATFORM_KEYWORDS.map((_, i) =>
      setTimeout(() => setKwActive(i), 680 + i * 190)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref}>
      <WindowChrome label="Prezență platforme — sincronizat" />

      <div className="p-4 space-y-2">
        {PLATFORMS.map((platform, i) => (
          <motion.div
            key={platform.name}
            className="rounded-xl overflow-hidden"
            style={{
              marginLeft: platform.indent,
              border: `1px solid ${platform.accent}18`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
            }}
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.42,
              delay: 0.28 + i * 0.13,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Platform header */}
            <div
              className="px-3 py-2 flex items-center gap-2"
              style={{ background: platform.headerBg }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: platform.accent }}
              />
              <span
                className="text-[11px] font-plex font-semibold"
                style={{ color: platform.accent }}
              >
                {platform.name}
              </span>
              <div className="flex-1" />
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={si}
                    className="text-[10px]"
                    style={{
                      color: si < platform.stars ? platform.accent : "rgba(255,255,255,0.12)",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span
                className="text-[10px] font-plex ml-1"
                style={{ color: platform.accent, opacity: 0.8 }}
              >
                {platform.rating}
              </span>
            </div>

            {/* Platform body */}
            {(platform.desc || platform.showKeywords) && (
              <div className="px-3 py-2.5" style={{ background: platform.bodyBg }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-plex font-semibold text-white">Bella Italia</span>
                  <span className="text-[10px] font-plex" style={{ color: "#3A3A45" }}>
                    {platform.meta}
                  </span>
                </div>
                {platform.desc && (
                  <p
                    className="text-[11px] font-plex leading-relaxed mb-2"
                    style={{ color: "#4A4A55" }}
                  >
                    {platform.desc.length > 75
                      ? platform.desc.slice(0, 75) + "…"
                      : platform.desc}
                  </p>
                )}
                {platform.showKeywords && (
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORM_KEYWORDS.map((kw, ki) => (
                      <span
                        key={ki}
                        className="text-[10px] font-plex px-2 py-[2px] rounded-full"
                        style={{
                          background:
                            ki <= kwActive
                              ? "rgba(52,224,161,0.1)"
                              : "rgba(255,255,255,0.04)",
                          color: ki <= kwActive ? "#34E0A1" : "#3A3A45",
                          border: `1px solid ${
                            ki <= kwActive
                              ? "rgba(52,224,161,0.22)"
                              : "rgba(255,255,255,0.06)"
                          }`,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}

        {/* Surgical sync status */}
        <motion.div
          className="flex items-center justify-between px-3 py-2 rounded-lg"
          style={{
            background: "rgba(0,229,160,0.05)",
            border: "1px solid rgba(0,229,160,0.12)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px]" style={{ color: "#00E5A0" }}>✦</span>
            <span className="text-[11px] font-plex" style={{ color: "#4A4A55" }}>
              <span style={{ color: "#00E5A0" }}>3/3</span> platforme sincronizate
            </span>
          </div>
          <span className="text-[10px] font-plex" style={{ color: "#3A3A45" }}>
            Ultima actualizare: acum 2h
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function SolutionsSection() {
  return (
    <section id="solutii" className="py-24 relative bg-section-dots">
      {/* Top edge separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,160,0.10), transparent)",
        }}
      />

      <div className="container mx-auto px-4 max-w-[1080px]">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Nu doar diagnosticăm.
          </h2>
          <h2
            className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 text-gradient-gold"
          >
            Operăm.
          </h2>
          <p
            className="font-plex text-base mx-auto"
            style={{ color: "#4A4A55", maxWidth: 420 }}
          >
            Trei intervenții chirurgicale care îți cresc vizibilitatea AI în 30 de zile.
          </p>
        </motion.div>

        {/* ── Bento grid ─────────────────────────────────────────────────────── */}

        {/* Row 1: two portrait cards side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 01 — Reddit Autopilot */}
          <BentoCard hoverBorder="rgba(255,86,0,0.22)" delay={0}>
            <CardText
              tag="INTERVENȚIE 01"
              title="Reddit Autopilot"
              description="Postări automate pe Reddit care pun afacerea ta în conversațiile din care AI-ul învață. Reddit este sursa #1 din care ChatGPT și Perplexity extrag recomandări locale."
              stats={[
                { value: "24-48h", line1: "până la", line2: "indexare" },
                { value: "15+", line1: "postări", line2: "/lună" },
                { value: "3×", line1: "creștere", line2: "medie" },
              ]}
            />
            <RedditMockupContent />
          </BentoCard>

          {/* Card 02 — Content Engine */}
          <BentoCard hoverBorder="rgba(0,184,212,0.22)" delay={0.12}>
            <CardText
              tag="INTERVENȚIE 02"
              title={
                <>
                  Motor de Conținut{" "}
                  <span className="text-gradient-gold">30 de Zile</span>
                </>
              }
              description="Un plan editorial complet: articole optimizate pentru AI, structurate cu schema markup, FAQ și headere pe care motoarele AI le pot cita direct."
              stats={[
                { value: "8-12", line1: "articole", line2: "/lună" },
                { value: "100%", line1: "bazate", line2: "pe date" },
                { value: "Schema", line1: "markup", line2: "inclus" },
              ]}
            />
            <ContentCalendarContent />
          </BentoCard>
        </div>

        {/* Row 2: full-width landscape card */}
        <div className="mt-4">
          <BentoCard hoverBorder="rgba(0,229,160,0.22)" delay={0.24}>
            <div className="flex flex-col lg:flex-row">
              {/* Text column */}
              <div className="lg:w-[42%] flex-shrink-0">
                <CardText
                  tag="INTERVENȚIE 03"
                  title={
                    <>
                      Prezență pe{" "}
                      <span className="text-gradient-gold">Platforme</span>
                    </>
                  }
                  description="Profiluri optimizate cu cuvinte cheie pe care AI-ul le caută. Descrieri rescrise, răspunsuri la recenzii generate, acuratețe monitorizată pe TripAdvisor, Google și directoare de profil."
                  stats={[
                    { value: "4×", line1: "mai mult", line2: "vizibil" },
                    { value: "100%", line1: "profil", line2: "complet" },
                    { value: "Auto", line1: "răspuns", line2: "recenzii" },
                  ]}
                />
              </div>

              {/* Separator: horizontal on mobile, vertical on desktop */}
              <div
                className="h-px lg:h-auto lg:w-px flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />

              {/* Visual column */}
              <div className="flex-1 min-w-0">
                <PlatformStackContent />
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ── Section CTA ─────────────────────────────────────────────────────── */}
        <motion.div
          className="relative text-center mt-20 md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 640px 320px at center, rgba(0,229,160,0.04) 0%, transparent 70%)",
            }}
          />

          <p className="font-syne text-2xl md:text-3xl font-bold text-white mb-1 relative">
            Diagnosticul e gratuit.
          </p>
          <p
            className="font-syne text-2xl md:text-3xl font-bold mb-8 relative"
            style={{ color: "#00E5A0" }}
          >
            Operația începe cu un click.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Button variant="gold" size="lg" asChild>
              <Link to="/analyze">
                Obțin Analiza Mea
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#pricing">Vezi Prețuri</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
