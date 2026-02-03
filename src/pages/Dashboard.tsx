import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SurgicalScore } from "@/components/dashboard/SurgicalScore";
import { PlatformStatusCard } from "@/components/dashboard/PlatformStatusCard";
import { Button } from "@/components/ui/button";
import {
  Radar,
  Plus,
  Lightbulb,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data - will be replaced with real data from Supabase
const mockScoreData = [
  { date: "Jan 1", score: 45 },
  { date: "Jan 8", score: 52 },
  { date: "Jan 15", score: 48 },
  { date: "Jan 22", score: 58 },
  { date: "Jan 29", score: 65 },
  { date: "Feb 5", score: 72 },
  { date: "Feb 12", score: 78 },
];

const mockRecentScans = [
  { id: 1, date: "Feb 12, 2024", score: 78, platforms: 4, status: "completed" },
  { id: 2, date: "Feb 5, 2024", score: 72, platforms: 4, status: "completed" },
  { id: 3, date: "Jan 29, 2024", score: 65, platforms: 3, status: "completed" },
];

export default function Dashboard() {
  const currentScore = 78;
  const previousScore = 72;
  const scoreChange = currentScore - previousScore;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground mt-1">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last scan: Feb 12, 2024
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/companies">
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Link>
            </Button>
            <Button variant="gold" asChild>
              <Link to="/scanner">
                <Radar className="h-4 w-4 mr-2" />
                Run New Scan
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Surgical Score Card */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-6">Your Surgical Score™</h3>
              <SurgicalScore score={currentScore} size="lg" />
              <div className="mt-6 flex items-center gap-2">
                {scoreChange > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success font-medium">+{scoreChange} from last scan</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 text-error rotate-180" />
                    <span className="text-error font-medium">{scoreChange} from last scan</span>
                  </>
                )}
              </div>
              <Button variant="gold" className="mt-6 w-full" asChild>
                <Link to="/scanner">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve Your Score
                </Link>
              </Button>
            </div>
          </div>

          {/* Platform Status Grid */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Platform Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <PlatformStatusCard
                  name="ChatGPT"
                  icon={<span className="text-lg">🤖</span>}
                  status="mentioned"
                  score={82}
                />
                <PlatformStatusCard
                  name="Perplexity"
                  icon={<span className="text-lg">🔮</span>}
                  status="mentioned"
                  score={75}
                />
                <PlatformStatusCard
                  name="Google AI"
                  icon={<span className="text-lg">🔍</span>}
                  status="not-found"
                />
                <PlatformStatusCard
                  name="Bing Copilot"
                  icon={<span className="text-lg">💬</span>}
                  status="mentioned"
                  score={78}
                />
              </div>
            </div>
          </div>

          {/* Score Trend Chart */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Score Trend</h3>
                <span className="text-sm text-muted-foreground">Last 30 days</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--gold))", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8, fill: "hsl(var(--gold))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Scans */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/scanner"
                  className="flex items-center justify-between p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <Radar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Run Full Scan</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
                <Link
                  to="/recommendations"
                  className="flex items-center justify-between p-3 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-gold" />
                    <span className="font-medium">View Recommendations</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </div>
            </div>

            {/* Recent Scans */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
              <div className="space-y-3">
                {mockRecentScans.map((scan) => (
                  <Link
                    key={scan.id}
                    to={`/scanner/results/${scan.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-card/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{scan.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {scan.platforms} platforms
                      </p>
                    </div>
                    <span className="text-lg font-bold font-mono text-gradient-gold">
                      {scan.score}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Banner (for free users) */}
        <div className="mt-8 glass-strong rounded-2xl p-6 md:p-8 border-2 border-gold/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-3">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Pro Feature</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Unlock Unlimited Scans</h3>
              <p className="text-muted-foreground">
                Get unlimited scans, historical tracking, and PDF reports with Pro.
              </p>
            </div>
            <Button variant="gold" size="lg">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
