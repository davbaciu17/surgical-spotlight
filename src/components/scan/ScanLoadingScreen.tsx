import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import type { ScanStatus } from "@/hooks/useScanStatus";

interface ScanLoadingScreenProps {
  status: ScanStatus;
  businessName: string;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  pending: "Se inițializează analiza...",
  generating: "Se generează 100+ întrebări AI...",
  testing: "Se testează pe ChatGPT, Gemini, Perplexity...",
  scoring: "Se calculează Scorul Surgical™...",
};

const statusProgress: Record<string, number> = {
  pending: 5,
  generating: 25,
  testing: 60,
  scoring: 85,
};

const statusSteps = [
  { key: "pending", label: "Inițializare" },
  { key: "generating", label: "Generare" },
  { key: "testing", label: "Testare" },
  { key: "scoring", label: "Scoring" },
  { key: "completed", label: "Complet" },
];

const statusOrder: Record<string, number> = {
  pending: 0,
  generating: 1,
  testing: 2,
  scoring: 3,
  completed: 4,
};

const feedMessages: Record<string, string[]> = {
  pending: [
    "Conectare la motoarele AI...",
    "Verificare configurare analiză...",
    "Inițializare sesiune de scanare...",
    "Pregătire pipeline de date...",
  ],
  generating: [
    "Categorie DISCOVERY — 20 întrebări generate",
    "Categorie COMPARISON — analiză competitori",
    "Categorie REPUTATION — evaluare recenzii",
    "Categorie EXPERTISE — verificare autoritate",
    "Categorie TRANSACTIONAL — intenții de cumpărare",
    "Optimizare formulări pentru context local...",
    "Generare variante de întrebări...",
  ],
  testing: [
    "Testare ChatGPT-4o — procesare răspunsuri...",
    "Testare Google Gemini — query în progres...",
    "Testare Perplexity AI — analiză în curs...",
    "Testare Claude — analiza menționărilor...",
    "Verificare poziție în răspunsuri AI...",
    "Extragere mențiuni din context...",
    "Comparare rezultate între platforme...",
  ],
  scoring: [
    "Calculare scor DISCOVERY: procesare...",
    "Calculare scor COMPARISON: procesare...",
    "Calculare scor REPUTATION: procesare...",
    "Agregare date din toate platformele...",
    "Generare notă finală Surgical™...",
  ],
};

// Floating particle component
function FloatingParticle({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{ width: size, height: size }}
      initial={{ x, y, opacity: 0 }}
      animate={{
        x: [x, x + (Math.random() - 0.5) * 60, x],
        y: [y, y + (Math.random() - 0.5) * 60, y],
        opacity: [0, 0.7, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function ScanLoadingScreen({ status, businessName, createdAt }: ScanLoadingScreenProps) {
  const [feedLines, setFeedLines] = useState<{ id: number; text: string; time: string }[]>([]);
  const feedIdRef = useRef(0);
  const currentStepIndex = statusOrder[status] ?? 0;
  const progress = statusProgress[status] ?? 5;

  const getNewFeedLine = useCallback(() => {
    const messages = feedMessages[status] || feedMessages.pending;
    const text = messages[Math.floor(Math.random() * messages.length)];
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    feedIdRef.current += 1;
    return { id: feedIdRef.current, text, time };
  }, [status]);

  // Initialize feed
  useEffect(() => {
    const initial = Array.from({ length: 4 }, () => getNewFeedLine());
    setFeedLines(initial);
  }, [status, getNewFeedLine]);

  // Add new lines periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedLines((prev) => {
        const next = [...prev.slice(-3), getNewFeedLine()];
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [getNewFeedLine]);

  // Particles data (stable across renders)
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      delay: i * 0.5,
      duration: 4 + Math.random() * 3,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      size: 3 + Math.random() * 4,
    }))
  ).current;

  return (
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
          {businessName} •{" "}
          {format(new Date(createdAt), "d MMM yyyy, HH:mm", { locale: ro })}
        </p>
      </div>

      {/* Central Radar Visualization */}
      <div className="flex justify-center mb-8">
        <div className="relative w-[250px] h-[250px]">
          {/* Floating particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {particles.map((p, i) => (
              <FloatingParticle key={i} {...p} />
            ))}
          </div>

          {/* Outer pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-primary/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-accent/20"
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Radar sweep */}
          <div
            className="absolute inset-6 rounded-full overflow-hidden"
            style={{
              background: "transparent",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 0deg, hsl(217 100% 50% / 0.25) 40deg, transparent 80deg)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Inner glow circle */}
          <div className="absolute inset-12 rounded-full bg-card border border-border/50 flex items-center justify-center glow-blue">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Radar
                className={`h-14 w-14 ${
                  status === "scoring" ? "text-gold" : "text-primary"
                } transition-colors duration-1000`}
              />
            </motion.div>
          </div>

          {/* Status-dependent outer ring glow */}
          <motion.div
            className="absolute -inset-2 rounded-full pointer-events-none"
            style={{
              background:
                status === "scoring"
                  ? "radial-gradient(circle, hsl(43 100% 50% / 0.08) 0%, transparent 70%)"
                  : "radial-gradient(circle, hsl(217 100% 50% / 0.08) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Status Label */}
      <div className="text-center mb-6 h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={status}
            className="text-lg font-semibold text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {statusLabels[status] || "Se procesează..."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progres analiză</span>
          <span className="font-mono text-sm font-semibold text-primary">
            {progress}%
          </span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: "linear-gradient(90deg, hsl(217 100% 50%), hsl(189 100% 50%), hsl(43 100% 50%))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Activitate live
          </span>
        </div>
        <div className="h-[140px] overflow-hidden relative">
          <AnimatePresence initial={false}>
            {feedLines.map((line) => (
              <motion.div
                key={line.id}
                className="flex items-center gap-3 py-1.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm text-muted-foreground flex-1 truncate">
                  {line.text}
                </span>
                <span className="font-mono text-xs text-muted-foreground/50 shrink-0">
                  {line.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Horizontal Step Indicator */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          {statusSteps.map((step, i) => {
            const isComplete = i < currentStepIndex;
            const isCurrent = i === currentStepIndex;
            return (
              <div key={step.key} className="flex flex-col items-center flex-1 relative">
                {/* Connecting line */}
                {i < statusSteps.length - 1 && (
                  <div
                    className={`absolute top-4 left-[50%] w-full h-0.5 ${
                      isComplete ? "bg-gold" : "bg-border"
                    }`}
                    style={{ zIndex: 0 }}
                  />
                )}
                {/* Circle */}
                <div className="relative z-10">
                  {isCurrent ? (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-primary flex items-center justify-center glow-blue"
                      animate={{ boxShadow: ["0 0 10px hsl(217 100% 50% / 0.4)", "0 0 25px hsl(217 100% 50% / 0.6)", "0 0 10px hsl(217 100% 50% / 0.4)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                    </motion.div>
                  ) : isComplete ? (
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <Check className="h-4 w-4 text-gold-foreground" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                </div>
                {/* Label */}
                <span
                  className={`text-xs mt-2 text-center ${
                    isCurrent
                      ? "text-primary font-medium"
                      : isComplete
                      ? "text-gold"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Info */}
      <p className="text-center text-sm text-muted-foreground mb-4">
        Timp estimat: 8-22 minute • Poți părăsi această pagină în siguranță
      </p>
      <div className="text-center">
        <Button variant="outline" asChild>
          <Link to="/dashboard">Înapoi la Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
