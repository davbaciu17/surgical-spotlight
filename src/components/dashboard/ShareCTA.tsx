import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";

const SESSION_KEY = "surgical_share_cta_dismissed";

export function ShareCTA() {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setDismissed(true);
  };

  const handleShare = (platform: "instagram" | "linkedin") => {
    const text =
      "Am descoperit Surgical.AI — platforma care îți arată cât de vizibilă este afacerea ta în ChatGPT, Gemini și Perplexity. Verifică-ți scorul gratuit 👉 surgical.ai";
    if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=https://surgical.ai&title=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      // Instagram: copy to clipboard + open instagram
      navigator.clipboard.writeText(text).catch(() => {});
      window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
    }
  };

  if (dismissed) return null;

  return (
    <div
      className="mx-3 mb-3 rounded-xl p-3 relative"
      style={{
        background: "linear-gradient(135deg, #141416 0%, #1A1A1E 100%)",
        border: "1px solid rgba(0,229,160,0.12)",
      }}
    >
      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        aria-label="Închide"
        className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full transition-colors hover:bg-white/8"
        style={{ color: "#6B6B75" }}
      >
        <X className="w-3 h-3" />
      </button>

      {/* Heading */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-base">📣</span>
        <span className="text-xs font-semibold font-plex text-foreground/90">
          Distribuie & Economisești
        </span>
      </div>

      {/* Description */}
      <p className="text-xs font-plex mb-2.5" style={{ color: "#6B6B75" }}>
        Postează pe rețele sociale și primești{" "}
        <span className="font-bold" style={{ color: "#00E5A0" }}>
          50% REDUCERE
        </span>{" "}
        luna viitoare.
      </p>

      {/* Share buttons */}
      <div className="flex flex-col gap-1.5">
        <button
          onClick={() => handleShare("instagram")}
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-plex font-medium transition-colors hover:opacity-80"
          style={{
            background: "linear-gradient(135deg, rgba(225,48,108,0.15) 0%, rgba(253,121,36,0.15) 100%)",
            border: "1px solid rgba(225,48,108,0.25)",
            color: "#F5F5F7",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span>📸</span> Instagram Story
          </span>
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-plex font-medium transition-colors hover:opacity-80"
          style={{
            background: "rgba(10,102,194,0.15)",
            border: "1px solid rgba(10,102,194,0.25)",
            color: "#F5F5F7",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span>💼</span> LinkedIn Post
          </span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Social proof */}
      <p className="text-[10px] font-plex mt-2.5" style={{ color: "#6B6B75" }}>
        12 utilizatori au distribuit azi
      </p>
    </div>
  );
}
