import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserScan } from "@/hooks/useUserScans";

const statusLabels: Record<string, string> = {
  pending: "În așteptare",
  generating: "Se generează întrebările AI",
  testing: "Se testează pe platforme",
  scoring: "Se calculează scorul",
};

const statusProgress: Record<string, number> = {
  pending: 10,
  generating: 30,
  testing: 60,
  scoring: 85,
};

interface ScanProgressBannerProps {
  scan: UserScan;
}

export function ScanProgressBanner({ scan }: ScanProgressBannerProps) {
  const label = statusLabels[scan.status] || scan.status;
  const progress = statusProgress[scan.status] || 0;

  return (
    <div className="glass-strong rounded-2xl p-6 border-2 border-gold/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl" style={{ background: "rgba(0,229,160,0.05)" }} />
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Loader2 className="h-6 w-6 animate-spin text-gold shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">
              Scanare în progres — {scan.business_name}
            </p>
            <p className="text-sm text-muted-foreground">{label}...</p>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00E5A0, #00B8D4)" }}
              />
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/scanner/results/${scan.id}`}>
            Detalii
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
