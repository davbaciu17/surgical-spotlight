import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(true);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ delay: 2, type: "spring", stiffness: 180, damping: 22 }}
        >
          {/* Pill button with pulsing ring */}
          <div className="relative">
            {/* Outer pulsing ring */}
            <span
              className="absolute inset-0 rounded-full animate-float-cta-ring pointer-events-none"
              style={{ background: "rgba(0,229,160,0.35)" }}
            />
            {/* Second ring, offset */}
            <span
              className="absolute inset-0 rounded-full animate-float-cta-ring pointer-events-none"
              style={{
                background: "rgba(0,229,160,0.2)",
                animationDelay: "0.7s",
              }}
            />

            <button
              onClick={scrollToPricing}
              className="relative flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "#00E5A0",
                color: "#080808",
                boxShadow: "0 0 24px rgba(0,229,160,0.35), 0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              <Zap className="h-4 w-4 shrink-0" fill="currentColor" strokeWidth={0} />
              <span className="whitespace-nowrap">Locuri limitate — Vezi prețurile</span>
            </button>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setVisible(false)}
            className="flex items-center justify-center w-7 h-7 rounded-full transition-colors shrink-0"
            style={{
              background: "rgba(14,14,16,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#6B6B75",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B75")}
            aria-label="Închide"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
