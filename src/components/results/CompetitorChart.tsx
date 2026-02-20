import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CompetitorChartProps {
  businessName: string;
  businessMentions: number;
  topCompetitors: { name: string; mentions: number }[];
}

export function CompetitorChart({
  businessName,
  businessMentions,
  topCompetitors,
}: CompetitorChartProps) {
  if (topCompetitors.length === 0) return null;

  const chartData = [
    { name: businessName, mentions: businessMentions, isBusiness: true },
    ...topCompetitors
      .slice(0, 5)
      .map((c) => ({ name: c.name, mentions: c.mentions, isBusiness: false })),
  ].sort((a, b) => b.mentions - a.mentions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      <h2 className="text-xl font-bold mb-6">Tu vs. Competitie</h2>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              itemStyle={{ color: "hsl(var(--muted-foreground))" }}
              formatter={(value: number) => [`${value} mentiuni`, ""]}
            />
            <Bar dataKey="mentions" radius={[0, 6, 6, 0]} barSize={28}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.isBusiness
                      ? "hsl(217, 100%, 55%)"
                      : "hsl(var(--muted-foreground) / 0.3)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[hsl(217,100%,55%)]" />
          <span>Afacerea ta</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-muted-foreground/30" />
          <span>Competitori</span>
        </div>
      </div>
    </motion.div>
  );
}
