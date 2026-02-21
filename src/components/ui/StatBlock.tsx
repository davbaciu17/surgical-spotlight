import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface StatBlockProps {
  value: number;          // numeric target (e.g. 40 for "40%")
  suffix?: string;        // e.g. "%" or "din 3"
  prefix?: string;        // e.g. "1 " (before the number)
  label: string;
  description?: string;
  delay?: number;
  className?: string;
}

export function StatBlock({
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  delay = 0,
  className = "",
}: StatBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      import("framer-motion").then(({ animate }) => {
        animate(count, value, {
          duration: 1.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        });
      });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`flex flex-col items-center text-center gap-2 ${className}`}
    >
      <div className="font-syne text-5xl md:text-6xl font-bold text-foreground tabular-nums">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <div className="text-base md:text-lg font-semibold text-foreground/80 font-plex">{label}</div>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs font-plex">{description}</p>
      )}
    </motion.div>
  );
}
