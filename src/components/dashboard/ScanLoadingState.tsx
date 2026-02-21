import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const ACTIVITY_MESSAGES = [
  "Inițializare analiză...",
  "Se conectează la ChatGPT-4o...",
  "Testare Gemini Pro...",
  "Interogare Perplexity AI...",
  "Se testează Claude Sonnet...",
  "Generare interogări specifice industriei...",
  "Evaluare relevanță brand...",
  "Analiză sentiment răspunsuri...",
  "Calculare poziție menționare...",
  "Testare interogări de tip DISCOVERY...",
  "Testare interogări COMPARISON...",
  "Analiză competitori menționați...",
  "Evaluare calitate recomandări...",
  "Calculare scor chirurgical™...",
  "Finalizare raport detaliat...",
];

const STEP_LABELS = [
  "Inițializare",
  "Generare",
  "Testare",
  "Analiză",
  "Finalizare",
];

export function ScanLoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  // Cycle activity messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % ACTIVITY_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Simulate slow progress (capped at 90%)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressPct((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 2 + 0.5;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentStep = Math.min(
    Math.floor(progressPct / 20),
    STEP_LABELS.length - 1
  );

  return (
    <div className="p-6 space-y-8 max-w-[900px] mx-auto">
      {/* Radar animation + status */}
      <div className="flex flex-col items-center text-center pt-4">
        {/* Radar visual */}
        <div className="relative w-40 h-40 mb-6">
          {/* Concentric rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full"
              style={{
                inset: `${ring * 16}px`,
                border: "1px solid rgba(0,229,160,0.12)",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: ring * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Sweep line */}
          <motion.div
            className="absolute top-1/2 left-1/2 origin-bottom-left"
            style={{
              width: "50%",
              height: "2px",
              background:
                "linear-gradient(90deg, rgba(0,229,160,0.6), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{ background: "#00E5A0", boxShadow: "0 0 16px rgba(0,229,160,0.5)" }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ping blips */}
          {[
            { x: "25%", y: "30%", delay: 1 },
            { x: "70%", y: "55%", delay: 2.5 },
            { x: "40%", y: "75%", delay: 4 },
          ].map((blip, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: blip.x,
                top: blip.y,
                background: "#00E5A0",
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: blip.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold font-syne mb-2">
          Analiză în curs...
        </h2>

        {/* Activity feed */}
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-plex"
              style={{ color: "#00E5A0" }}
            >
              {ACTIVITY_MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mt-5">
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #00B8D4, #00E5A0)",
              }}
              animate={{ width: `${Math.min(progressPct, 90)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    background:
                      i <= currentStep
                        ? "#00E5A0"
                        : "rgba(255,255,255,0.15)",
                    boxShadow:
                      i === currentStep
                        ? "0 0 8px rgba(0,229,160,0.4)"
                        : "none",
                  }}
                />
                <span
                  className="text-[10px] font-plex hidden sm:inline"
                  style={{
                    color:
                      i <= currentStep
                        ? "rgba(255,255,255,0.7)"
                        : "#6B6B75",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className="w-4 h-px"
                  style={{
                    background:
                      i < currentStep
                        ? "rgba(0,229,160,0.3)"
                        : "rgba(255,255,255,0.08)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs font-plex mt-4" style={{ color: "#6B6B75" }}>
          Poți închide pagina — te notificăm pe email când analiza este completă.
        </p>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* YouTube video section */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-bold font-syne mb-1">
            Descoperă Surgical.AI
          </h3>
          <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
            Urmărește ghidul video în timp ce analiza rulează
          </p>
        </div>

        {/* Video placeholder — replace src with actual YouTube embed */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "16/9",
            background: "#111113",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* TODO: Replace with actual YouTube embed:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
          */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <motion.div
              className="flex items-center justify-center w-16 h-16 rounded-full cursor-pointer"
              style={{
                background: "rgba(0,229,160,0.15)",
                border: "2px solid rgba(0,229,160,0.3)",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-7 w-7 ml-1" style={{ color: "#00E5A0" }} />
            </motion.div>
            <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
              Video introductiv — disponibil în curând
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
