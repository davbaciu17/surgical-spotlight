import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface DimensionCardProps {
  name: string;
  score: number;        // 0-100
  weight: number;       // percentage weight e.g. 40
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "#00E5A0";
  if (score >= 55) return "#00B8D4";
  if (score >= 35) return "#FFB020";
  return "#FF3B5C";
}

export function DimensionCard({
  name,
  score,
  weight,
  description,
  icon,
  delay = 0,
  className = "",
}: DimensionCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const color = getScoreColor(score);

  const count = useMotionValue(0);
  const displayScore = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, score, {
      duration: 1.0,
      delay: delay + 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return controls.stop;
  }, [inView, score, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay }}
      className={`bg-[#1A1A1E] border border-white/6 rounded-xl p-4 flex flex-col gap-3 will-change-transform ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {icon && (
            <span className="text-muted-foreground flex-shrink-0">{icon}</span>
          )}
          <span className="text-sm font-semibold text-foreground/90 leading-tight font-plex">
            {name}
          </span>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 font-mono">
          {weight}%
        </span>
      </div>

      {/* Score number */}
      <div className="flex items-baseline gap-1">
        <motion.span
          className="text-2xl font-syne font-bold tabular-nums"
          style={{ color }}
        >
          {displayScore}
        </motion.span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${score}%` } : { width: 0 }}
          transition={{ duration: 1.0, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed font-plex">
          {description}
        </p>
      )}
    </motion.div>
  );
}
