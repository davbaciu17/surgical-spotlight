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
    if (score >= 70) return { stroke: "hsl(0, 0%, 98%)", text: "text-foreground", label: "Excelent" };
    if (score >= 50) return { stroke: "hsl(0, 0%, 70%)", text: "text-foreground/80", label: "Bun" };
    if (score >= 30) return { stroke: "hsl(0, 0%, 45%)", text: "text-muted-foreground", label: "Mediu" };
    return { stroke: "hsl(0, 0%, 30%)", text: "text-muted-foreground/70", label: "Slab" };
  };

  const { stroke, text, label } = getScoreColor();

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
              filter: score >= 70 ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.15))" : undefined,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold font-mono ${textSize} ${text}`}>
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
