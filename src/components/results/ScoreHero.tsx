import { motion } from "framer-motion";
import { SurgicalScore } from "@/components/dashboard/SurgicalScore";
import {
  GRADE_COLORS,
  GRADE_INTERPRETATIONS,
  getGradeFromScore,
} from "@/lib/constants";

interface ScoreHeroProps {
  businessName: string;
  score: number;
  grade: string | null;
  totalMentioned: number;
  totalRecommended: number;
  totalQueries: number;
}

export function ScoreHero({
  businessName,
  score,
  grade,
  totalMentioned,
  totalRecommended,
  totalQueries,
}: ScoreHeroProps) {
  const resolvedGrade = grade || getGradeFromScore(score);
  const colors = GRADE_COLORS[resolvedGrade] || GRADE_COLORS.F;
  const interpretation = GRADE_INTERPRETATIONS[resolvedGrade] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-8 mb-8"
    >
      <div className="flex flex-col items-center text-center">
        {/* Business name */}
        <p className="text-muted-foreground mb-4 text-lg">{businessName}</p>

        {/* Score gauge */}
        <SurgicalScore score={score} size="lg" />

        {/* Grade badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className={`mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border ${colors.border} bg-background`}
        >
          <span className={`text-2xl font-bold ${colors.text}`}>
            Nota {resolvedGrade}
          </span>
        </motion.div>

        {/* Interpretation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 text-muted-foreground max-w-md"
        >
          {interpretation}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap gap-4 justify-center mt-6"
        >
          <div className="px-5 py-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-foreground">
              {totalMentioned}
              <span className="text-sm font-normal text-muted-foreground">
                /{totalQueries}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Mentiuni</p>
          </div>
          <div className="px-5 py-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-foreground">
              {totalRecommended}
              <span className="text-sm font-normal text-muted-foreground">
                /{totalQueries}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Recomandari</p>
          </div>
          <div className="px-5 py-3 rounded-xl bg-card border border-border">
            <p className="text-2xl font-bold text-foreground">
              {totalQueries - totalMentioned}
            </p>
            <p className="text-xs text-muted-foreground">Invizibil</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
