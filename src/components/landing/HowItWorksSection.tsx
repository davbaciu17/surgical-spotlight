import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ScoreGauge } from "@/components/ui/ScoreGauge";

// ─── Shared window chrome ─────────────────────────────────────────────────────
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

// ─── Blinking cursor hook ─────────────────────────────────────────────────────
function useCursorBlink(active: boolean) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, [active]);
  return visible;
}

// ─── Step 1: Onboarding Form Mockup ──────────────────────────────────────────
const MOCK_FIELDS = [
  { label: "Numele afacerii", value: "Restaurant Bella Italia", active: false },
  { label: "Nișa", value: "Restaurante italiene", active: false },
  { label: "Piața țintă", value: "", active: true }, // typed
  { label: "Website (opțional)", value: "www.bellaitalia.ro", active: false },
];

const TYPED_TEXT = "Brașov, România";

function OnboardingFormMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cursorOn = useCursorBlink(inView);

  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const delay = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setTyped(TYPED_TEXT.slice(0, i));
        if (i >= TYPED_TEXT.length) clearInterval(id);
      }, 55);
      return () => clearInterval(id);
    }, 700);
    return () => clearTimeout(delay);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-[460px]"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#131315",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,229,160,0.03)",
        }}
      >
        <WindowChrome label="Surgical Spotlight — Analiză nouă" />

        <div className="p-5">
          {/* Form heading */}
          <div className="mb-4">
            <p className="text-sm font-syne font-bold text-white">Spune-ne despre afacerea ta</p>
            <p className="text-xs font-plex mt-0.5" style={{ color: "#3A3A45" }}>
              Durează 30 de secunde · Câmpurile marcate sunt obligatorii
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {MOCK_FIELDS.map((field) => {
              const displayValue = field.active ? typed : field.value;
              const isActive = field.active;
              return (
                <div key={field.label} className="space-y-1">
                  <label
                    className="text-xs font-plex font-medium"
                    style={{ color: isActive ? "#00E5A0" : "#4A4A55" }}
                  >
                    {field.label}
                    {!field.label.includes("opțional") && (
                      <span style={{ color: "#00E5A0" }}> *</span>
                    )}
                  </label>
                  <div
                    className="px-3 py-2 rounded-lg text-sm font-plex flex items-center min-h-[38px]"
                    style={{
                      background: isActive ? "rgba(0,229,160,0.03)" : "#0A0A0B",
                      border: `1px solid ${isActive ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.06)"}`,
                      boxShadow: isActive ? "0 0 0 3px rgba(0,229,160,0.06)" : "none",
                      color: isActive ? "#E8E8EE" : "#5A5A65",
                    }}
                  >
                    <span>{displayValue || "\u00A0"}</span>
                    {isActive && (
                      <span
                        className="ml-px inline-block w-[2px] h-[14px] flex-shrink-0 rounded-sm"
                        style={{
                          background: "#00E5A0",
                          opacity: cursorOn ? 1 : 0,
                          transition: "opacity 0.05s",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit button (decorative) */}
          <div className="mt-4">
            <div
              className="w-full py-2.5 rounded-lg text-center text-sm font-plex font-semibold"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.9), rgba(0,184,212,0.9))",
                color: "#0A0A0B",
              }}
            >
              Continuă — Analizează afacerea mea →
            </div>
          </div>
        </div>
      </div>

      {/* Glow line below */}
      <div
        className="mx-auto h-px w-2/3 mt-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.12), transparent)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}

// ─── Step 2: Query Processing Visual ─────────────────────────────────────────
const QUERIES = [
  { num: "01", text: "cel mai bun restaurant italian Brașov" },
  { num: "02", text: "recomandare restaurant familie centru" },
  { num: "03", text: "restaurant italian cu livrare Brașov" },
  { num: "04", text: "unde mănânci paste proaspete în Brașov" },
  { num: "05", text: "pizzerie autentică brasov centru vechi" },
  { num: "06", text: "restaurant romantic brasov weekend" },
];

const LLM_CARDS = [
  {
    name: "ChatGPT",
    color: "#00E5A0",
    headerBg: "#0D2318",
    bodyBg: "#0F1512",
    rows: ["1.  La Famiglia", "2.  Bella Italia", "3.  Trattoria Roma"],
    highlightRow: 1,
    pos: { top: 8, left: 0, zIndex: 14, width: 210 },
  },
  {
    name: "Gemini",
    color: "#A78BFA",
    headerBg: "#18102A",
    bodyBg: "#130F1E",
    rows: ["1.  Trattoria Roma", "2.  Bella Italia", "3.  La Famiglia"],
    highlightRow: 1,
    pos: { top: 32, left: 135, zIndex: 13, width: 200 },
  },
  {
    name: "Claude",
    color: "#FFB020",
    headerBg: "#231A08",
    bodyBg: "#181308",
    rows: ["1.  Bella Italia", "2.  La Famiglia", "3.  Pane e Vino"],
    highlightRow: 0,
    pos: { top: 145, left: 18, zIndex: 12, width: 205 },
  },
  {
    name: "Perplexity",
    color: "#00B8D4",
    headerBg: "#08151F",
    bodyBg: "#080F17",
    rows: ["1.  Pane e Vino", "2.  Bella Italia", "3.  Trattoria…"],
    highlightRow: 1,
    pos: { top: 168, left: 158, zIndex: 11, width: 196 },
  },
] as const;

function QueryProcessingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Progress bar motion value
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const c = animate(progress, 64, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.6,
      });
      return c.stop;
    }, 100);
    return () => clearTimeout(t);
  }, [inView]);

  const CONTAINER_H = 350;
  const CHROME_H = 38;

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-[480px]"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#131315",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
          height: CONTAINER_H,
          position: "relative",
        }}
      >
        <WindowChrome label="50 interogări active — 4 motoare AI" />

        {/* Content area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Layer 1: Query list (behind) */}
          <div
            className="absolute inset-0 px-4 pt-3"
            style={{
              zIndex: 1,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 35%, transparent 75%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 35%, transparent 75%)",
            }}
          >
            {QUERIES.map((q, i) => (
              <motion.div
                key={q.num}
                className="flex items-center gap-3 py-1.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.025)" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              >
                <span className="font-mono text-[10px] font-medium flex-shrink-0" style={{ color: "rgba(0,229,160,0.25)" }}>
                  {q.num}
                </span>
                <span className="font-plex text-xs truncate" style={{ color: "#2A2A35" }}>
                  {q.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Layer 2: LLM result cards */}
          {LLM_CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              className="absolute rounded-xl overflow-hidden"
              style={{
                top: card.pos.top,
                left: card.pos.left,
                width: card.pos.width,
                zIndex: card.pos.zIndex,
                border: `1px solid ${card.color}1A`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px ${card.color}0D`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.35 + i * 0.13,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Card header */}
              <div
                className="px-3 py-1.5 flex items-center gap-2"
                style={{ background: card.headerBg }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: card.color }}
                />
                <span
                  className="text-[11px] font-plex font-semibold tracking-wide"
                  style={{ color: card.color }}
                >
                  {card.name}
                </span>
              </div>
              {/* Card rows */}
              <div className="px-3 py-1.5" style={{ background: card.bodyBg }}>
                {card.rows.map((row, j) => (
                  <div
                    key={j}
                    className="text-[11px] font-mono py-0.5"
                    style={{
                      color: j === card.highlightRow ? "#00E5A0" : "#3A3A45",
                      fontWeight: j === card.highlightRow ? 600 : 400,
                    }}
                  >
                    {j === card.highlightRow ? row.replace("Bella Italia", "★ Bella Italia") : row}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Layer 3: Progress indicator (bottom) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 px-4 py-3"
            style={{
              zIndex: 20,
              background:
                "linear-gradient(to top, #131315 40%, rgba(19,19,21,0.9) 70%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-plex" style={{ color: "#3A3A45" }}>
                Progres analiză
              </span>
              <span
                className="text-[11px] font-mono font-semibold tabular-nums"
                style={{ color: "#00E5A0" }}
              >
                32 / 50
              </span>
            </div>
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: progressWidth,
                  background: "linear-gradient(90deg, #00E5A0, #00B8D4)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glow line below */}
      <div
        className="mx-auto h-px w-2/3 mt-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.1), transparent)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}

// ─── Step 3: Dashboard Preview Mockup ────────────────────────────────────────
const PREVIEW_SCORE = 42;
const PREVIEW_GRADE_COLOR = "#FFB020";
const PREVIEW_DIMS = [
  { label: "Rata de Menționare", score: 36, color: "#FF3B5C" },
  { label: "Poziție Medie", score: 58, color: "#FFB020" },
  { label: "Sentiment", score: 63, color: "#00B8D4" },
  { label: "vs. Competiție", score: 22, color: "#FF3B5C" },
];
const PREVIEW_COMPETITORS = [
  { name: "La Famiglia", pct: 82, mine: false },
  { name: "Bella Italia", pct: 42, mine: true },
  { name: "Trattoria Roma", pct: 38, mine: false },
];

function DashboardPreviewMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Score count-up
  const scoreCount = useMotionValue(0);
  const displayScore = useTransform(scoreCount, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const c = animate(scoreCount, PREVIEW_SCORE, {
      duration: 1.5,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return c.stop;
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-[480px] relative"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Card — overflow hidden for window-crop at bottom */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#131315",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,176,32,0.03)",
          maxHeight: 390,
        }}
      >
        <WindowChrome label="Surgical Spotlight — Diagnostic" />

        <div className="p-5">
          {/* Score hero row */}
          <div className="flex items-center gap-5 mb-5 pb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {/* Gauge */}
            <div className="relative flex-shrink-0">
              <ScoreGauge
                score={PREVIEW_SCORE}
                size="md"
                triggered={inView}
                delay={0.3}
                hideValue={true}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.span
                  className="font-syne text-2xl font-bold tabular-nums leading-none"
                  style={{ color: PREVIEW_GRADE_COLOR }}
                >
                  {displayScore}
                </motion.span>
                <span className="text-[10px] font-plex mt-0.5" style={{ color: "#3A3A45" }}>
                  / 100
                </span>
              </div>
            </div>

            {/* Grade label */}
            <div>
              <motion.div
                className="flex items-center gap-2 mb-1.5"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.3 }}
              >
                <span className="font-syne text-3xl font-bold leading-none" style={{ color: PREVIEW_GRADE_COLOR }}>
                  C
                </span>
                <span
                  className="text-[11px] font-plex px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,176,32,0.1)",
                    color: PREVIEW_GRADE_COLOR,
                    border: "1px solid rgba(255,176,32,0.18)",
                  }}
                >
                  Vizibilitate moderată
                </span>
              </motion.div>
              <motion.p
                className="text-[11px] font-plex"
                style={{ color: "#3A3A45" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                Restaurant Bella Italia · Brașov, România
              </motion.p>
            </div>
          </div>

          {/* Dimension bars */}
          <div className="space-y-2.5 mb-5">
            {PREVIEW_DIMS.map((dim, i) => (
              <div key={dim.label} className="flex items-center gap-2.5">
                <span
                  className="text-[11px] font-plex flex-shrink-0"
                  style={{ color: "#3A3A45", width: 128 }}
                >
                  {dim.label}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: dim.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${dim.score}%` } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.7 + i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
                <span
                  className="text-[11px] font-mono flex-shrink-0 w-5 text-right tabular-nums"
                  style={{ color: "#3A3A45" }}
                >
                  {dim.score}
                </span>
              </div>
            ))}
          </div>

          {/* Competitor list */}
          <div>
            <p
              className="text-[10px] font-plex font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#2A2A35" }}
            >
              Competitori principali
            </p>
            {PREVIEW_COMPETITORS.map((comp, i) => (
              <motion.div
                key={comp.name}
                className="flex items-center justify-between py-1.5 px-1.5 rounded-md"
                style={{
                  background: comp.mine ? "rgba(0,229,160,0.05)" : "transparent",
                  borderBottom:
                    i < PREVIEW_COMPETITORS.length - 1
                      ? "1px solid rgba(255,255,255,0.03)"
                      : "none",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
              >
                <span
                  className="text-xs font-plex"
                  style={{ color: comp.mine ? "#00E5A0" : "#3A3A45" }}
                >
                  {comp.mine ? "→ " : `${i + 1}. `}
                  {comp.name}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: comp.mine ? "#00E5A0" : "#2A2A35" }}
                >
                  {comp.pct}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient crop overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 rounded-b-2xl pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,10,11,0.96))",
        }}
      />

      {/* Glow line below */}
      <div
        className="mx-auto h-px w-2/3 mt-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,176,32,0.1), transparent)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}

// ─── Step wrapper ─────────────────────────────────────────────────────────────
interface StepProps {
  number: string;
  title: React.ReactNode;
  description: string;
  textSide: "left" | "right";
  children: React.ReactNode;
}

function Step({ number, title, description, textSide, children }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textBlock = (
    <motion.div
      className="flex flex-col justify-center"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span
        className="font-mono text-xs font-semibold tracking-[0.18em] mb-5 block"
        style={{ color: "#00E5A0" }}
      >
        {number}
      </span>
      <h3 className="font-syne text-[1.75rem] md:text-[2rem] font-bold text-white leading-[1.2] mb-4">
        {title}
      </h3>
      <p
        className="font-plex text-[15px] leading-relaxed"
        style={{ color: "#4A4A55", maxWidth: 360 }}
      >
        {description}
      </p>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        textSide === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-12 lg:gap-20`}
    >
      {/* Text — always first in DOM so it's on top in mobile stack */}
      <div className="w-full lg:w-[40%] flex-shrink-0">{textBlock}</div>
      {/* Visual */}
      <div className="w-full lg:flex-1 flex justify-center">{children}</div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative bg-section-dots">
      {/* Top edge line */}
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
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-2">
            3 pași.{" "}
            <span className="text-gradient-gold">5 minute.</span>
          </h2>
          <p
            className="font-syne text-xl md:text-2xl lg:text-3xl font-bold"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Un diagnostic complet.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24 md:space-y-32">
          {/* 01 */}
          <Step
            number="01"
            title="Completezi datele afacerii tale"
            description="Introdu numele, nișa, piața țintă și competitorii principali. Durează 30 de secunde."
            textSide="left"
          >
            <OnboardingFormMockup />
          </Step>

          {/* Separator */}
          <div
            className="h-px max-w-[200px] mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            }}
          />

          {/* 02 */}
          <Step
            number="02"
            title={
              <>
                Testăm 50 de întrebări reale pe{" "}
                <span style={{ color: "#A78BFA" }}>4 motoare AI</span>
              </>
            }
            description="Simulăm întrebările pe care clienții tăi le-ar pune unui AI, cu web search activat. Fiecare motor răspunde independent."
            textSide="right"
          >
            <QueryProcessingVisual />
          </Step>

          {/* Separator */}
          <div
            className="h-px max-w-[200px] mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            }}
          />

          {/* 03 */}
          <Step
            number="03"
            title={<>Primești <span style={{ color: "#00E5A0" }}>Surgical Score</span><sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>™</sup></>}
            description="Vezi cât de des apari, pe ce poziție, cum te compari cu competiția, și un plan concret de îmbunătățire."
            textSide="left"
          >
            <DashboardPreviewMockup />
          </Step>
        </div>
      </div>
    </section>
  );
}
