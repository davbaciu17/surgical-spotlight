import { useEffect, useState } from "react";

interface SurgicalScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function SurgicalScore({ score, size = "md", animated = true }: SurgicalScoreProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = score / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayScore(Math.min(Math.round(increment * currentStep), score));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, animated]);

  const getScoreColor = () => {
    if (score >= 75) return { stroke: "#00E5A0", text: "text-[#00E5A0]", label: "Excelent", glow: "rgba(0,229,160,0.25)" };
    if (score >= 55) return { stroke: "#00B8D4", text: "text-[#00B8D4]", label: "Bun", glow: "rgba(0,184,212,0.2)" };
    if (score >= 35) return { stroke: "#FFB020", text: "text-[#FFB020]", label: "Moderat", glow: "rgba(255,176,32,0.2)" };
    if (score >= 18) return { stroke: "#FF3B5C", text: "text-[#FF3B5C]", label: "Slab", glow: "rgba(255,59,92,0.2)" };
    return { stroke: "#FF3B5C", text: "text-[#FF3B5C]", label: "Critic", glow: "rgba(255,59,92,0.2)" };
  };

  const { stroke, text, label, glow } = getScoreColor();

  const sizeClasses = {
    sm: { container: "w-20 h-20", text: "text-xl", label: "text-xs" },
    md: { container: "w-32 h-32", text: "text-3xl", label: "text-sm" },
    lg: { container: "w-48 h-48", text: "text-5xl", label: "text-base" },
  };

  const { container, text: textSize, label: labelSize } = sizeClasses[size];
  const radius = size === "lg" ? 80 : size === "md" ? 52 : 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${container}`}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={size === "lg" ? 6 : size === "md" ? 5 : 4}
            fill="none"
            className="text-border"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={stroke}
            strokeWidth={size === "lg" ? 6 : size === "md" ? 5 : 4}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${glow})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-syne font-bold tabular-nums ${textSize} ${text}`}>
            {displayScore}
          </span>
        </div>
      </div>
      <p className={`font-medium ${labelSize} ${text}`}>
        {label}
      </p>
    </div>
  );
}
