import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { llms } from "@/data/llmData";
import { LLMWindow } from "./LLMWindow";

interface LLMCarouselProps {
  currentIndex: number;
  direction: number;
  onIndexChange: (index: number, direction: number) => void;
}

export function LLMCarousel({ currentIndex, direction, onIndexChange }: LLMCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;

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

      {/*
        Window container — all 4 windows rendered simultaneously with position:absolute.
        Fixed min-height prevents layout shift from typing animation or mount/unmount.
        Active window toggled via opacity + scale only (no layout-triggering properties).
      */}
      <div
        className="rounded-xl relative overflow-hidden min-h-[370px] sm:min-h-[320px]"
        onPointerDown={(e) => { swipeStartX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (swipeStartX.current === null) return;
          const delta = swipeStartX.current - e.clientX;
          if (delta > 60) goNext();
          else if (delta < -60) goPrev();
          swipeStartX.current = null;
        }}
      >
        {llms.map((llm, i) => {
          const isActive = i === currentIndex;
          return (
            <div
              key={llm.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(0.985)",
                transition: "opacity 0.38s ease, transform 0.38s ease",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 1 : 0,
                willChange: "opacity, transform",
              }}
            >
              <LLMWindow llm={llm} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {llms.map((llm, i) => (
          <button
            key={llm.id}
            onClick={() => onIndexChange(i, i > currentIndex ? 1 : -1)}
            aria-label={`Go to ${llm.name}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentIndex ? "28px" : "8px",
              height: "8px",
              backgroundColor:
                i === currentIndex ? currentLLM.color : "rgba(255,255,255,0.14)",
            }}
          />
        ))}
      </div>

      {/* LLM name label */}
      <div className="flex justify-center mt-3">
        <span
          className="text-xs font-medium font-plex"
          style={{
            color: currentLLM.color,
            transition: "color 0.3s ease",
          }}
        >
          {currentLLM.name}
        </span>
      </div>
    </div>
  );
}
