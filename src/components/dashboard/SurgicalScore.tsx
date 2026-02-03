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
    if (score >= 90) return { stroke: "url(#goldGradient)", text: "text-gradient-gold", label: "Surgical Precision" };
    if (score >= 70) return { stroke: "hsl(var(--success))", text: "text-success", label: "Excellent" };
    if (score >= 50) return { stroke: "hsl(var(--primary))", text: "text-primary", label: "Good" };
    if (score >= 30) return { stroke: "hsl(var(--warning))", text: "text-warning", label: "Fair" };
    return { stroke: "hsl(var(--error))", text: "text-error", label: "Poor" };
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
            strokeWidth={size === "lg" ? 10 : size === "md" ? 8 : 6}
            fill="none"
            className="text-border"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={stroke}
            strokeWidth={size === "lg" ? 10 : size === "md" ? 8 : 6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: score >= 70 ? "drop-shadow(0 0 10px rgba(255, 184, 0, 0.4))" : undefined,
            }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43, 100%, 50%)" />
              <stop offset="50%" stopColor="hsl(30, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(43, 100%, 50%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold font-mono ${textSize} ${score >= 90 ? "text-gradient-gold" : text}`}>
            {displayScore}
          </span>
        </div>
      </div>
      <p className={`font-medium ${labelSize} ${score >= 90 ? "text-gradient-gold" : text}`}>
        {label}
      </p>
    </div>
  );
}
