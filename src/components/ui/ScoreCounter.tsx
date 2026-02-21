import { useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface ScoreCounterProps {
  score: number;          // target 0-100
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;         // start delay in seconds
  showGrade?: boolean;
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "#00E5A0";
  if (score >= 55) return "#00B8D4";
  if (score >= 35) return "#FFB020";
  return "#FF3B5C";
}

function getGrade(score: number): { letter: string; label: string } {
  if (score >= 75) return { letter: "A", label: "Excelent" };
  if (score >= 55) return { letter: "B", label: "Bun" };
  if (score >= 35) return { letter: "C", label: "Moderat" };
  if (score >= 15) return { letter: "D", label: "Slab" };
  return { letter: "F", label: "Critic" };
}

const fontSizeMap = {
  sm:  "text-4xl",
  md:  "text-6xl",
  lg:  "text-8xl",
  xl:  "text-[120px]",
};

export function ScoreCounter({
  score,
  size = "lg",
  delay = 0,
  showGrade = false,
  className = "",
}: ScoreCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const color = getScoreColor(score);
  const grade = getGrade(score);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = count.animation;
      if (controls) controls.stop();

      import("framer-motion").then(({ animate }) => {
        animate(count, score, {
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        });
      });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <motion.span
        className={`font-syne font-bold leading-none tabular-nums`}
        style={{ color, fontSize: size === "xl" ? "120px" : undefined }}
        {...(size !== "xl" ? { className: `font-syne font-bold leading-none tabular-nums ${fontSizeMap[size]}` } : {})}
      >
        <motion.span>{rounded}</motion.span>
        <span className="text-muted-foreground" style={{ fontSize: "0.4em" }}>/100</span>
      </motion.span>

      {showGrade && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 1.2, duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span
            className="text-3xl font-syne font-bold"
            style={{ color }}
          >
            {grade.letter}
          </span>
          <span className="text-muted-foreground text-sm font-plex">{grade.label}</span>
        </motion.div>
      )}
    </div>
  );
}
