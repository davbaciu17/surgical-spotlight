// Query type labels (Romanian)
export const QUERY_TYPE_LABELS: Record<string, string> = {
  local_search: "Căutări Locale",
  product_specific: "Produse Specifice",
  service_search: "Căutare Servicii",
  comparison: "Comparații",
  recommendation: "Recomandări",
  problem_solution: "Soluții la Probleme",
  quality_focused: "Focalizat pe Calitate",
  price_focused: "Focalizat pe Preț",
  delivery_focused: "Focalizat pe Livrare",
  review_based: "Bazat pe Recenzii",
};

// Score grade interpretations (Romanian)
export const GRADE_INTERPRETATIONS: Record<string, string> = {
  F: "Afacerea ta este practic invizibilă pentru AI — acțiune urgentă necesară",
  D: "Vizibilitate foarte scăzută — competitorii tăi sunt favorizați de AI",
  C: "Vizibilitate moderată — există mult loc de îmbunătățire",
  B: "Vizibilitate bună — câteva optimizări te pot duce în top",
  A: "Vizibilitate excelentă — AI-ul te recomandă activ clienților",
};

// Clinical color hex values by grade
export const GRADE_HEX_COLORS: Record<string, string> = {
  A: "#00E5A0",
  B: "#00B8D4",
  C: "#FFB020",
  D: "#FF3B5C",
  F: "#FF3B5C",
};

// Tailwind class tokens by grade — clinical color system
export const GRADE_COLORS: Record<string, { text: string; bg: string; border: string; ring: string }> = {
  A: {
    text: "text-[#00E5A0]",
    bg: "bg-[#00E5A0]/10",
    border: "border-[#00E5A0]/30",
    ring: "text-[#00E5A0]",
  },
  B: {
    text: "text-[#00B8D4]",
    bg: "bg-[#00B8D4]/10",
    border: "border-[#00B8D4]/30",
    ring: "text-[#00B8D4]",
  },
  C: {
    text: "text-[#FFB020]",
    bg: "bg-[#FFB020]/10",
    border: "border-[#FFB020]/30",
    ring: "text-[#FFB020]",
  },
  D: {
    text: "text-[#FF3B5C]",
    bg: "bg-[#FF3B5C]/10",
    border: "border-[#FF3B5C]/30",
    ring: "text-[#FF3B5C]",
  },
  F: {
    text: "text-[#FF3B5C]",
    bg: "bg-[#FF3B5C]/10",
    border: "border-[#FF3B5C]/30",
    ring: "text-[#FF3B5C]",
  },
};

// Get grade from score (aligned with clinical thresholds)
export function getGradeFromScore(score: number): string {
  if (score >= 75) return "A";
  if (score >= 55) return "B";
  if (score >= 35) return "C";
  if (score >= 18) return "D";
  return "F";
}

// Get hex color for a score value
export function getScoreHexColor(score: number): string {
  if (score >= 75) return "#00E5A0";
  if (score >= 55) return "#00B8D4";
  if (score >= 35) return "#FFB020";
  return "#FF3B5C";
}

// Get color class for a percentage (progress bars)
export function getPercentageColor(pct: number): string {
  if (pct >= 75) return "bg-[#00E5A0]";
  if (pct >= 55) return "bg-[#00B8D4]";
  if (pct >= 35) return "bg-[#FFB020]";
  return "bg-[#FF3B5C]";
}

// Check if business is mentioned
export function isMentioned(mentions: string | null | boolean): boolean {
  if (typeof mentions === "boolean") return mentions;
  if (!mentions) return false;
  return mentions !== "none";
}
