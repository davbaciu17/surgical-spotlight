import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface ScoreGaugeProps {
  score: number;       // 0-100
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;   // show pulsing loading state
  delay?: number;      // animation start delay in seconds
  triggered?: boolean; // when provided, starts animation only when true
  className?: string;
}

const sizeMap = {
  sm:  { svg: 80,  stroke: 6,  r: 32 },
  md:  { svg: 120, stroke: 8,  r: 48 },
  lg:  { svg: 160, stroke: 9,  r: 64 },
  xl:  { svg: 200, stroke: 10, r: 80 },
};

function getScoreColor(score: number): string {
  if (score >= 75) return "#00E5A0";   // clinical green — A grade
  if (score >= 55) return "#00B8D4";   // clinical cyan — B grade
  if (score >= 35) return "#FFB020";   // amber — C grade
  if (score >= 18) return "#FF3B5C";   // red — D grade
  return "#FF3B5C";                     // red — F grade
}

export function ScoreGauge({
  score,
  size = "md",
  loading = false,
  delay = 0,
  triggered,
  className = "",
}: ScoreGaugeProps) {
  const { svg: svgSize, stroke, r } = sizeMap[size];
  const center = svgSize / 2;
  const circumference = 2 * Math.PI * r;
  const color = getScoreColor(score);

  // Convert score (0-100) to strokeDashoffset
  const targetOffset = circumference - (score / 100) * circumference;

  const dashOffset = useMotionValue(circumference);
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (loading) return;
    // If triggered is explicitly false, wait until it's true
    if (triggered === false) return;

    const timer = setTimeout(() => {
      animate(dashOffset, targetOffset, {
        duration: 1.2,
        ease: "easeOut",
      });
      animate(opacity, 1, {
        duration: 0.2,
      });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [score, loading, delay, triggered]);

  if (loading) {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: svgSize, height: svgSize }}>
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {/* Pulsing dashed arc */}
          <circle
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="rgba(0,229,160,0.4)"
            strokeWidth={stroke}
            strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            className="animate-ring-pulse"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: svgSize, height: svgSize }}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track ring */}
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        {/* Score arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset, opacity }}
          strokeLinecap="round"
          filter={`drop-shadow(0 0 6px ${color}60)`}
        />
      </svg>
    </div>
  );
}
