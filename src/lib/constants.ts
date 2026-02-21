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

// Score color classes by grade (monochrome)
export const GRADE_COLORS: Record<string, { text: string; bg: string; border: string; ring: string }> = {
  F: { text: "text-foreground/30", bg: "bg-foreground/20", border: "border-foreground/10", ring: "text-foreground/30" },
  D: { text: "text-foreground/40", bg: "bg-foreground/25", border: "border-foreground/15", ring: "text-foreground/40" },
  C: { text: "text-foreground/55", bg: "bg-foreground/35", border: "border-foreground/20", ring: "text-foreground/55" },
  B: { text: "text-foreground/75", bg: "bg-foreground/55", border: "border-foreground/30", ring: "text-foreground/75" },
  A: { text: "text-foreground", bg: "bg-foreground", border: "border-foreground/40", ring: "text-foreground" },
};

// Get grade from score
export function getGradeFromScore(score: number): string {
  if (score >= 76) return "A";
  if (score >= 56) return "B";
  if (score >= 36) return "C";
  if (score >= 16) return "D";
  return "F";
}

// Get color for a percentage (progress bars — monochrome)
export function getPercentageColor(pct: number): string {
  if (pct >= 80) return "bg-foreground";
  if (pct >= 60) return "bg-foreground/70";
  if (pct >= 20) return "bg-foreground/45";
  return "bg-foreground/25";
}

// Check if business is mentioned
export function isMentioned(mentions: string | null | boolean): boolean {
  if (typeof mentions === "boolean") return mentions;
  if (!mentions) return false;
  return mentions !== "none";
}
