import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AUTO_DISMISS_MS = 5500;

export function ScarcityBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const showCountRef = useRef(0);
  const visibleRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (dismissed || showCountRef.current >= 2 || visibleRef.current) return;
    setVisible(true);
    visibleRef.current = true;
    showCountRef.current += 1;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      visibleRef.current = false;
    }, AUTO_DISMISS_MS);
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    visibleRef.current = false;
    setDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.85;

      // Trigger 1: after scrolling ~85% of viewport height past hero
      if (scrollY > heroHeight && showCountRef.current === 0) {
        show();
        return;
      }

      // Trigger 2: when pricing section is ~1.2 viewports away
      if (showCountRef.current === 1 && !visibleRef.current) {
        const pricingEl = document.getElementById("pricing");
        if (pricingEl) {
          const { top } = pricingEl.getBoundingClientRect();
          if (top < window.innerHeight * 1.2) {
            show();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed, show]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed z-50 left-1/2"
          style={{ top: "50%", x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <div
            className="flex items-center gap-3 px-5 pr-3 rounded-xl"
            style={{
              height: "54px",
              width: "min(700px, calc(100vw - 32px))",
              background: "rgba(14,14,16,0.94)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,229,160,0.18)",
              boxShadow: "0 0 32px rgba(0,229,160,0.09), 0 8px 32px rgba(0,0,0,0.55)",
            }}
          >
            {/* Pulsing icon */}
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-base flex-shrink-0 select-none"
              aria-hidden
            >
              🔒
            </motion.span>

            {/* Message */}
            <p className="text-sm font-plex text-foreground/85 flex-1 min-w-0 truncate">
              Locuri limitate:{" "}
              <span className="font-bold text-foreground">50 de analize gratuite</span>{" "}
              disponibile luna aceasta.
            </p>

            {/* CTA */}
            <Link
              to="/analyze"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold font-plex px-3 py-1.5 rounded-lg flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "rgba(0,229,160,0.12)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}
            >
              Obțin Analiza
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Închide"
              className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 ml-1 transition-colors hover:bg-white/8"
              style={{ color: "#6B6B75" }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
