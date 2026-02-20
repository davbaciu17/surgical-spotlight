// Query type labels (Romanian)
export const QUERY_TYPE_LABELS: Record<string, string> = {
  local_search: "Cautari Locale",
  product_specific: "Produse Specifice",
  service_search: "Cautare Servicii",
  comparison: "Comparatii",
  recommendation: "Recomandari",
  problem_solution: "Solutii la Probleme",
  quality_focused: "Focalizat pe Calitate",
  price_focused: "Focalizat pe Pret",
  delivery_focused: "Focalizat pe Livrare",
  review_based: "Bazat pe Recenzii",
};

// Score grade interpretations (Romanian)
export const GRADE_INTERPRETATIONS: Record<string, string> = {
  F: "Afacerea ta este practic invizibila pentru AI",
  D: "Vizibilitate foarte scazuta — competitorii tai sunt favorizati",
  C: "Vizibilitate moderata — exista mult loc de imbunatatire",
  B: "Vizibilitate buna — cateva optimizari te pot duce in top",
  A: "Vizibilitate excelenta — AI-ul te recomanda activ",
};

// Score color classes by grade
export const GRADE_COLORS: Record<string, { text: string; bg: string; border: string; ring: string }> = {
  F: { text: "text-red-500", bg: "bg-red-500", border: "border-red-500/30", ring: "text-red-500" },
  D: { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500/30", ring: "text-orange-500" },
  C: { text: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500/30", ring: "text-yellow-500" },
  B: { text: "text-blue-500", bg: "bg-blue-500", border: "border-blue-500/30", ring: "text-blue-500" },
  A: { text: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500/30", ring: "text-emerald-500" },
};

// Get grade from score
export function getGradeFromScore(score: number): string {
  if (score >= 76) return "A";
  if (score >= 56) return "B";
  if (score >= 36) return "C";
  if (score >= 16) return "D";
  return "F";
}

// Get color for a percentage (progress bars)
export function getPercentageColor(pct: number): string {
  if (pct >= 80) return "bg-emerald-500";
  if (pct >= 60) return "bg-yellow-500";
  if (pct >= 20) return "bg-orange-500";
  return "bg-red-500";
}

// Check if business is mentioned
export function isMentioned(mentions: string | null | boolean): boolean {
  if (typeof mentions === "boolean") return mentions;
  if (!mentions) return false;
  return mentions !== "none";
}
