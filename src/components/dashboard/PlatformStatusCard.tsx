import { Check, X, Minus } from "lucide-react";

interface PlatformStatusCardProps {
  name: string;
  icon: React.ReactNode;
  status: "mentioned" | "not-found" | "not-scanned";
  score?: number;
}

export function PlatformStatusCard({ name, icon, status, score }: PlatformStatusCardProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case "mentioned":
        return {
          icon: <Check className="h-4 w-4" />,
          text: "Mentioned",
          color: "text-success",
          bg: "bg-success/10",
        };
      case "not-found":
        return {
          icon: <X className="h-4 w-4" />,
          text: "Not Found",
          color: "text-error",
          bg: "bg-error/10",
        };
      case "not-scanned":
        return {
          icon: <Minus className="h-4 w-4" />,
          text: "Not Scanned",
          color: "text-muted-foreground",
          bg: "bg-muted",
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="glass rounded-xl p-5 hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <span className="font-semibold">{name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 ${statusDisplay.color}`}>
          <div className={`w-6 h-6 rounded-full ${statusDisplay.bg} flex items-center justify-center`}>
            {statusDisplay.icon}
          </div>
          <span className="text-sm font-medium">{statusDisplay.text}</span>
        </div>
        
        {score !== undefined && status === "mentioned" && (
          <span className="text-lg font-bold font-mono text-gradient-gold">{score}</span>
        )}
      </div>
    </div>
  );
}
