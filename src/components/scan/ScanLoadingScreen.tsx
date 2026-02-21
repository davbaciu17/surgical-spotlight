import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScanStatus } from "@/hooks/useAnalysisPolling";

interface ScanLoadingScreenProps {
  status: ScanStatus;
  businessName: string;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  pending: "Se initializeaza analiza...",
  generating: "Se genereaza 50 de intrebari AI...",
  testing: "Se testeaza pe ChatGPT...",
};

const statusProgress: Record<string, number> = {
  pending: 5,
  generating: 25,
  testing: 60,
};

const statusSteps = [
  { key: "pending", label: "Initializare" },
  { key: "generating", label: "Generare" },
  { key: "testing", label: "Testare" },
  { key: "completed", label: "Complet" },
];

const statusOrder: Record<string, number> = {
  pending: 0,
  generating: 1,
  testing: 2,
  completed: 3,
};

const feedMessages: Record<string, string[]> = {
  pending: [
    "Conectare la motoarele AI...",
    "Verificare configurare analiza...",
    "Initializare sesiune de scanare...",
    "Pregatire pipeline de date...",
  ],
  generating: [
    "Cautari Locale — intrebari generate",
    "Comparatii — analiza competitori",
    "Recomandari — evaluare recenzii",
    "Solutii la Probleme — verificare autoritate",
    "Produse Specifice — intentii de cumparare",
    "Optimizare formulari pentru context local...",
    "Generare variante de intrebari...",
  ],
  testing: [
    "Testare ChatGPT — procesare raspunsuri...",
    "Analiza intrebare #12 din 50...",
    "Verificare pozitie in raspunsuri AI...",
    "Extragere mentiuni din context...",
    "Analiza intrebare #28 din 50...",
    "Detectare competitori mentionati...",
    "Analiza intrebare #41 din 50...",
  ],
};

// Floating particle component
function FloatingParticle({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ backgroundColor: "rgba(0,229,160,0.25)", width: size, height: size }}
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

export function ScanLoadingScreen({ status, businessName }: ScanLoadingScreenProps) {
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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Analiza in Progres</h1>
        <p className="text-muted-foreground">{businessName}</p>
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
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(0,229,160,0.2)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{ border: "1px solid rgba(0,229,160,0.3)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{ border: "1px solid rgba(0,184,212,0.15)" }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Radar sweep */}
          <div className="absolute inset-6 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 0deg, rgba(0,229,160,0.15) 40deg, transparent 80deg)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Inner glow circle */}
          <div className="absolute inset-12 rounded-full bg-card border border-border/50 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Radar className="h-14 w-14 text-gold transition-colors duration-1000" />
            </motion.div>
          </div>

          {/* Outer ring glow */}
          <motion.div
            className="absolute -inset-2 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)",
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
            {statusLabels[status] || "Se proceseaza..."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progres analiza</span>
          <span className="font-mono text-sm font-semibold text-primary">
            {progress}%
          </span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: "linear-gradient(90deg, hsl(0 0% 50%), hsl(0 0% 70%), hsl(0 0% 90%))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
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
                      className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center"
                      animate={{ boxShadow: ["0 0 10px hsl(0 0% 98% / 0.3)", "0 0 20px hsl(0 0% 98% / 0.5)", "0 0 10px hsl(0 0% 98% / 0.3)"] }}
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
        Timp estimat: 3-5 minute • Poti parasi aceasta pagina in siguranta
      </p>
      <div className="text-center">
        <Button variant="outline" asChild>
          <Link to="/analyze">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Inapoi la Analiza
          </Link>
        </Button>
      </div>
    </div>
  );
}
