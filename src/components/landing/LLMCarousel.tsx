import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { llms } from "@/data/llmData";
import { LLMWindow } from "./LLMWindow";

interface LLMCarouselProps {
  currentIndex: number;
  direction: number;
  onIndexChange: (index: number, direction: number) => void;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export function LLMCarousel({ currentIndex, direction, onIndexChange }: LLMCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;

  // Pointer tracking for swipe
  const swipeStartX = useRef<number | null>(null);

  const goNext = () => {
    const next = (indexRef.current + 1) % llms.length;
    onIndexChange(next, 1);
  };

  const goPrev = () => {
    const prev = (indexRef.current - 1 + llms.length) % llms.length;
    onIndexChange(prev, -1);
  };

  // Auto-advance every 5s
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  // Keyboard left/right
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentLLM = llms[currentIndex];

  return (
    <div
      className="mt-20 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left arrow — hidden on mobile */}
      <button
        onClick={goPrev}
        aria-label="Previous"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-10 w-9 h-9 rounded-full items-center justify-center transition-all hover:scale-110"
        style={{
          background: "rgba(14,14,16,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#6B6B75",
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Right arrow — hidden on mobile */}
      <button
        onClick={goNext}
        aria-label="Next"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-10 w-9 h-9 rounded-full items-center justify-center transition-all hover:scale-110"
        style={{
          background: "rgba(14,14,16,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#6B6B75",
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Window container — overflow hidden clips slide animation */}
      <div
        className="overflow-hidden rounded-xl"
        onPointerDown={(e) => { swipeStartX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (swipeStartX.current === null) return;
          const delta = swipeStartX.current - e.clientX;
          if (delta > 60) goNext();
          else if (delta < -60) goPrev();
          swipeStartX.current = null;
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          >
            <LLMWindow llm={currentLLM} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {llms.map((llm, i) => (
          <button
            key={llm.id}
            onClick={() => onIndexChange(i, i > currentIndex ? 1 : -1)}
            aria-label={`Go to ${llm.name}`}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === currentIndex ? "28px" : "8px",
              height: "8px",
              backgroundColor:
                i === currentIndex ? currentLLM.color : "rgba(255,255,255,0.14)",
            }}
          />
        ))}
      </div>

      {/* LLM name labels under dots */}
      <div className="flex justify-center mt-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentLLM.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-medium font-plex"
            style={{ color: currentLLM.color }}
          >
            {currentLLM.name}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
