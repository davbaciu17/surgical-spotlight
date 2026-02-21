import { motion } from "framer-motion";
import { Hash, BarChart3, MessageCircle, Users } from "lucide-react";
import { isMentioned } from "@/lib/constants";

interface Query {
  query_number: number;
  query_type: string;
  query_text: string;
  mentions_business: string | null | boolean;
  sentiment: string | null;
  position_rank: number | null;
}

interface MetricsGridProps {
  queries: Query[];
  topCompetitors: { name: string; mentions: number }[];
}

export function MetricsGrid({ queries, topCompetitors }: MetricsGridProps) {
  const totalQueries = queries.length;
  const mentionedQueries = queries.filter((q) => isMentioned(q.mentions_business));
  const mentionRate = totalQueries > 0 ? Math.round((mentionedQueries.length / totalQueries) * 100) : 0;

  // Average position when mentioned
  const positionedQueries = mentionedQueries.filter(
    (q) => q.position_rank && q.position_rank > 0
  );
  const avgPosition =
    positionedQueries.length > 0
      ? (
          positionedQueries.reduce((sum, q) => sum + (q.position_rank || 0), 0) /
          positionedQueries.length
        ).toFixed(1)
      : "—";

  // Sentiment breakdown
  const positiveCount = mentionedQueries.filter(
    (q) => q.sentiment === "positive"
  ).length;
  const negativeCount = mentionedQueries.filter(
    (q) => q.sentiment === "negative"
  ).length;
  const neutralCount = mentionedQueries.length - positiveCount - negativeCount;

  // Top competitor
  const topCompetitor = topCompetitors.length > 0 ? topCompetitors[0] : null;

  const metrics = [
    {
      icon: Hash,
      label: "Rata de Mentionare",
      value: `${mentionRate}%`,
      detail: `${mentionedQueries.length} din ${totalQueries} intrebari`,
      color: "text-foreground",
      bgColor: "bg-foreground/10",
    },
    {
      icon: BarChart3,
      label: "Pozitia Medie",
      value: avgPosition === "—" ? "—" : `#${avgPosition}`,
      detail:
        avgPosition === "—"
          ? "Nicio mentiune cu pozitie"
          : `Din ${positionedQueries.length} mentiuni`,
      color: "text-foreground/70",
      bgColor: "bg-foreground/10",
    },
    {
      icon: MessageCircle,
      label: "Sentiment",
      value:
        mentionedQueries.length > 0
          ? positiveCount >= negativeCount
            ? "Pozitiv"
            : "Negativ"
          : "—",
      detail:
        mentionedQueries.length > 0
          ? `${positiveCount} pozitive, ${neutralCount} neutre, ${negativeCount} negative`
          : "Nicio mentiune analizata",
      color:
        positiveCount >= negativeCount ? "text-foreground" : "text-foreground/40",
      bgColor: "bg-foreground/10",
    },
    {
      icon: Users,
      label: "Competitor Principal",
      value: topCompetitor ? topCompetitor.name : "—",
      detail: topCompetitor
        ? `${topCompetitor.mentions} mentiuni detectate`
        : "Niciun competitor detectat",
      color: "text-foreground/60",
      bgColor: "bg-foreground/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center shrink-0`}
            >
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-1">
                {metric.label}
              </p>
              <p className="text-xl font-bold truncate">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {metric.detail}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
