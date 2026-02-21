import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  QUERY_TYPE_LABELS,
  getPercentageColor,
  isMentioned,
} from "@/lib/constants";

interface Query {
  query_number: number;
  query_type: string;
  query_text: string;
  mentions_business: string | null | boolean;
  sentiment: string | null;
  position_rank: number | null;
}

interface CategoryBreakdownProps {
  queries: Query[];
}

interface CategoryData {
  type: string;
  label: string;
  total: number;
  mentioned: number;
  percentage: number;
  queries: Query[];
}

export function CategoryBreakdown({ queries }: CategoryBreakdownProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Group queries by query_type
  const categoryMap = new Map<string, Query[]>();
  for (const q of queries) {
    const existing = categoryMap.get(q.query_type) || [];
    existing.push(q);
    categoryMap.set(q.query_type, existing);
  }

  const categories: CategoryData[] = Array.from(categoryMap.entries())
    .map(([type, catQueries]) => {
      const mentioned = catQueries.filter((q) =>
        isMentioned(q.mentions_business)
      ).length;
      return {
        type,
        label: QUERY_TYPE_LABELS[type] || type,
        total: catQueries.length,
        mentioned,
        percentage: Math.round((mentioned / catQueries.length) * 100),
        queries: catQueries,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  const toggleCategory = (type: string) => {
    setExpandedCategory((prev) => (prev === type ? null : type));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      <h2 className="text-xl font-bold mb-6">Rezultate pe Categorii</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div key={cat.type} className="rounded-xl border border-border overflow-hidden">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(cat.type)}
              className="w-full p-4 flex items-center gap-3 hover:bg-card/50 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold truncate">
                    {cat.label}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2 shrink-0">
                    {cat.mentioned} din {cat.total}
                  </span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getPercentageColor(
                      cat.percentage
                    )}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                  expandedCategory === cat.type ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded queries */}
            <AnimatePresence>
              {expandedCategory === cat.type && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2">
                    {cat.queries.map((q, i) => {
                      const mentioned = isMentioned(q.mentions_business);
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2 rounded-lg bg-background/50"
                        >
                          <span
                            className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                              mentioned
                                ? "bg-foreground/15 text-foreground"
                                : "bg-foreground/10 text-foreground/30"
                            }`}
                          >
                            {mentioned ? "\u2713" : "\u2717"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{q.query_text}</p>
                            <div className="flex items-center gap-3 mt-1">
                              {q.sentiment && (
                                <span
                                  className={`text-xs ${
                                    q.sentiment === "positive"
                                      ? "text-foreground/70"
                                      : q.sentiment === "negative"
                                      ? "text-foreground/35"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {q.sentiment === "positive"
                                    ? "Pozitiv"
                                    : q.sentiment === "negative"
                                    ? "Negativ"
                                    : "Neutru"}
                                </span>
                              )}
                              {mentioned && q.position_rank && q.position_rank > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  Pozitia #{q.position_rank}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
