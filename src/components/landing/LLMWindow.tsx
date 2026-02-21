import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LLMConfig } from "@/data/llmData";

// Minimal SVG avatars for each LLM — recognisable but simple
function Avatar({ llm }: { llm: LLMConfig }) {
  const base = "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold";

  if (llm.id === "gemini") {
    return (
      <div
        className={base}
        style={{ background: `linear-gradient(135deg, ${llm.color} 0%, #34A853 100%)` }}
      >
        {/* Gemini 4-pointed sparkle */}
        <svg viewBox="0 0 16 16" fill="white" className="h-3.5 w-3.5">
          <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" />
        </svg>
      </div>
    );
  }

  if (llm.id === "perplexity") {
    return (
      <div className={base} style={{ backgroundColor: llm.color }}>
        {/* Perplexity — angular P */}
        <svg viewBox="0 0 16 16" fill="white" className="h-3 w-3">
          <rect x="3" y="2" width="2" height="12" />
          <rect x="3" y="2" width="6" height="2" />
          <rect x="3" y="7" width="6" height="2" />
          <rect x="9" y="2" width="2" height="7" />
        </svg>
      </div>
    );
  }

  if (llm.id === "claude") {
    return (
      <div className={base} style={{ backgroundColor: llm.color }}>
        {/* Claude — asterisk / sunburst */}
        <svg viewBox="0 0 16 16" fill="white" className="h-3.5 w-3.5">
          <line x1="8" y1="1" x2="8" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="3" x2="13" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="13" y1="3" x2="3" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // ChatGPT — simplified OpenAI swirl
  return (
    <div className={base} style={{ backgroundColor: llm.color }}>
      <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5">
        <path d="M20.7 8.6a5.4 5.4 0 0 0-.47-4.47 5.48 5.48 0 0 0-5.9-2.63 5.4 5.4 0 0 0-3.54-1.62 5.48 5.48 0 0 0-5.23 3.75 5.4 5.4 0 0 0-3.62 2.63 5.48 5.48 0 0 0 .67 6.43 5.4 5.4 0 0 0 .47 4.47 5.48 5.48 0 0 0 5.9 2.63 5.4 5.4 0 0 0 3.54 1.62 5.48 5.48 0 0 0 5.24-3.75 5.4 5.4 0 0 0 3.62-2.63 5.48 5.48 0 0 0-.68-6.43zm-9.2 12.9a4.05 4.05 0 0 1-2.6-.94l.13-.07 4.32-2.5a.72.72 0 0 0 .36-.62V11.5l1.83 1.05a.07.07 0 0 1 .03.05v5.05a4.07 4.07 0 0 1-4.07 3.85zm-8.74-3.73a4.05 4.05 0 0 1-.48-2.73l.12.08 4.32 2.5a.72.72 0 0 0 .72 0l5.28-3.05v2.1a.07.07 0 0 1-.03.05L7.5 19.13a4.07 4.07 0 0 1-4.74-1.36zm-1.14-9.4A4.05 4.05 0 0 1 3.74 6l.01.14V11.3a.72.72 0 0 0 .36.62l5.28 3.05-1.83 1.05a.07.07 0 0 1-.06 0L3 13.05a4.07 4.07 0 0 1-.38-4.68zm15.04 3.5-5.28-3.05 1.83-1.05a.07.07 0 0 1 .06 0l4.5 2.6a4.07 4.07 0 0 1-.63 7.34v-5.22a.72.72 0 0 0-.48-.62zm1.82-2.75-.12-.08-4.32-2.5a.72.72 0 0 0-.72 0L8.16 9.6V7.5a.07.07 0 0 1 .03-.05L12.69 4.9a4.07 4.07 0 0 1 6.06 3.59zm-11.47 3.77-1.83-1.05a.07.07 0 0 1-.03-.05V6.84a4.07 4.07 0 0 1 6.68-3.13l-.12.07-4.33 2.5a.72.72 0 0 0-.36.62zm1-2.16 2.35-1.36 2.35 1.36v2.72l-2.35 1.36-2.35-1.36z" />
      </svg>
    </div>
  );
}

// URL bar favicon per LLM
function URLFavicon({ llm }: { llm: LLMConfig }) {
  if (llm.id === "gemini") {
    return (
      <svg viewBox="0 0 16 16" className="w-3 h-3 flex-shrink-0" fill={llm.color}>
        <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" />
      </svg>
    );
  }
  return (
    <div
      className="w-3 h-3 rounded-sm flex-shrink-0"
      style={{ backgroundColor: llm.color }}
    />
  );
}

function ItemPrefix({ llm, index }: { llm: LLMConfig; index: number }) {
  const textColor = "#ECECEC";
  if (llm.responseStyle === "numbered") {
    return <span className="text-sm font-medium flex-shrink-0 mt-0.5" style={{ color: textColor }}>{index + 1}.</span>;
  }
  if (llm.responseStyle === "emoji") {
    return <span className="text-sm flex-shrink-0 mt-0.5">{llm.emojiMarkers?.[index] ?? "•"}</span>;
  }
  return <span className="text-sm font-medium flex-shrink-0 mt-0.5" style={{ color: textColor }}>•</span>;
}

interface LLMWindowProps {
  llm: LLMConfig;
  isActive?: boolean;
}

export function LLMWindow({ llm, isActive = true }: LLMWindowProps) {
  const [phase, setPhase] = useState<"typing" | "response">("typing");
  // Detect mobile once at mount — used to skip typing animation and item stagger
  const isMobile = useRef(typeof window !== "undefined" && window.innerWidth < 768);

  // Trigger typing → response sequence when window becomes active; reset when inactive
  useEffect(() => {
    if (isActive) {
      if (isMobile.current) {
        // On mobile: skip typing dots, show content immediately
        setPhase("response");
      } else {
        setPhase("typing");
        const t = setTimeout(() => setPhase("response"), 1600);
        return () => clearTimeout(t);
      }
    } else {
      // Reset so the sequence replays next time this window becomes active
      setPhase("typing");
    }
  }, [isActive]);

  const textColor = "#ECECEC";
  const mutedColor = "#8E8EA0";

  return (
    <div className="relative max-w-3xl mx-auto select-none">
      {/* Dynamic window glow — LLM brand color */}
      <div
        className="absolute pointer-events-none rounded-2xl"
        style={{
          inset: "-24px",
          background: `radial-gradient(ellipse at center, ${llm.color}18 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Title bar */}
      <div
        className="rounded-t-xl px-4 py-3 flex items-center gap-3"
        style={{
          backgroundColor: llm.titleBarBg,
          border: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "none",
        }}
      >
        {/* macOS traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex justify-center">
          <div
            className="rounded-lg px-4 py-1.5 flex items-center gap-2 min-w-[200px] max-w-xs"
            style={{ backgroundColor: llm.urlBarBg }}
          >
            <URLFavicon llm={llm} />
            <span className="text-xs font-mono truncate" style={{ color: mutedColor }}>
              {llm.urlText}
            </span>
          </div>
        </div>
      </div>

      {/* Chat body */}
      <div
        className="rounded-b-xl p-5 space-y-4"
        style={{
          backgroundColor: llm.bgColor,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* User message */}
        <div className="flex justify-end">
          <div
            className="rounded-2xl rounded-br-md px-4 py-2.5 max-w-xs sm:max-w-sm"
            style={{ backgroundColor: llm.urlBarBg }}
          >
            <p className="text-sm" style={{ color: textColor }}>
              {llm.userMessage}
            </p>
          </div>
        </div>

        {/* Typing indicator → Response */}
        <div className="flex justify-start gap-2 min-h-[80px]">
          <Avatar llm={llm} />

          <AnimatePresence mode="wait">
            {phase === "typing" ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex gap-1 items-center px-1 py-2"
              >
                {[0, 160, 320].map((delay, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: mutedColor, animationDelay: `${delay}ms` }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex-1 min-w-0"
              >
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: `${textColor}99` }}
                >
                  {llm.intro}
                </p>

                <div className="space-y-2">
                  {/* Real results */}
                  {llm.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: isMobile.current ? 0 : i * 0.14, duration: 0.28 }}
                      className="flex items-start gap-2"
                    >
                      <ItemPrefix llm={llm} index={i} />
                      <div className="min-w-0">
                        <span className="text-sm font-semibold" style={{ color: textColor }}>
                          {item.name}
                        </span>
                        <span className="text-sm" style={{ color: mutedColor }}>
                          {" "}— {item.detail}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* The conversion placeholder */}
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isMobile.current ? 0 : llm.items.length * 0.14 + 0.18, duration: 0.35 }}
                    className="flex items-start gap-2"
                  >
                    <ItemPrefix llm={llm} index={llm.items.length} />
                    <div
                      className="flex-1 rounded-lg px-3 py-2 border"
                      style={{
                        background: "rgba(0,229,160,0.055)",
                        borderColor: "rgba(0,229,160,0.28)",
                        animation: "pulse-border 2.8s ease-in-out infinite",
                      }}
                    >
                      <span
                        className="text-sm italic"
                        style={{ color: `${textColor}45` }}
                      >
                        Afacerea ta ar putea fi aici...
                      </span>
                      <span
                        className="inline-block ml-2 text-xs px-2 py-0.5 rounded font-medium"
                        style={{
                          border: "1px solid rgba(0,229,160,0.35)",
                          color: "rgba(0,229,160,0.75)",
                        }}
                      >
                        ?
                      </span>
                    </div>
                  </motion.div>

                  {/* Perplexity source attribution */}
                  {llm.sourceNote && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: isMobile.current ? 0 : (llm.items.length + 1) * 0.14 + 0.3 }}
                      className="text-xs pt-2 mt-1"
                      style={{
                        color: `${mutedColor}70`,
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {llm.sourceNote}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom reflection line — brand color */}
      <div
        className="absolute -bottom-px left-6 right-6 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${llm.color}50, transparent)`,
        }}
      />
    </div>
  );
}
