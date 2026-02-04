import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Radar,
  Building2,
  Globe,
  Zap,
  Loader2,
  Check,
  Sparkles,
} from "lucide-react";

const platforms = [
  { id: "chatgpt", name: "ChatGPT", icon: "🤖", description: "OpenAI GPT-4" },
  { id: "perplexity", name: "Perplexity", icon: "🔮", description: "Căutare AI" },
  { id: "gemini", name: "Gemini", icon: "✨", description: "Google AI" },
  { id: "claude", name: "Claude", icon: "🧠", description: "Anthropic AI" },
];

export default function Scanner() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<Record<string, "queued" | "scanning" | "complete" | "failed">>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isFormValid = companyName.trim().length > 0 && websiteUrl.trim().length > 0;

  const startSurgery = async () => {
    if (!isFormValid) return;
    
    setError(null);
    setIsScanning(true);
    
    // Initialize progress for all platforms
    const initialProgress: Record<string, "queued" | "scanning" | "complete" | "failed"> = {};
    platforms.forEach((p) => (initialProgress[p.id] = "queued"));
    setScanProgress(initialProgress);

    try {
      // TODO: Execute n8n workflow "Surgical.AI - Execute Scan"
      // The workflow is not yet configured in n8n
      // When available, use: mcp_01kgmhnsytfqkv6hac72eywa3t--execute_workflow
      
      // For now, simulate the scan process
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        
        // Set to scanning
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setScanProgress((prev) => ({ ...prev, [platform.id]: "scanning" }));
        
        // Set to complete
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setScanProgress((prev) => ({ ...prev, [platform.id]: "complete" }));
      }

      // Navigate to results after all complete
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/scanner/results/1");
    } catch (err) {
      setError("A apărut o eroare la scanare. Vă rugăm să încercați din nou.");
      setIsScanning(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {!isScanning ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold mb-4">
                <Radar className="h-8 w-8 text-gold-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Scanner de Vizibilitate AI</h1>
              <p className="text-muted-foreground">
                Descoperă cum apare brandul tău în platformele AI
              </p>
            </div>

            {/* Form Card */}
            <div className="glass rounded-2xl p-8">
              <div className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Numele Companiei *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="ex: Surgical.AI"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-12 text-base"
                    disabled={isScanning}
                  />
                </div>

                {/* Website URL */}
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    Link Website *
                  </Label>
                  <Input
                    id="websiteUrl"
                    placeholder="ex: https://surgical.ai"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="h-12 text-base"
                    disabled={isScanning}
                  />
                </div>

                {/* Platforms Preview */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Platforme scanate:</p>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20"
                      >
                        <span className="text-lg">{platform.icon}</span>
                        <span className="text-sm font-medium">{platform.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-error/10 border border-error/30">
                    <p className="text-sm text-error">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full h-14 text-lg font-semibold"
                  onClick={startSurgery}
                  disabled={!isFormValid || isScanning}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Începe
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Timp estimat: 30-60 secunde
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Scanning Progress */
          <div className="text-center py-8 space-y-8">
            {/* Animated Logo */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-20 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-gradient-gold flex items-center justify-center">
                <Zap className="h-12 w-12 text-gold-foreground animate-pulse" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Chirurgie în Progres</h2>
              <p className="text-muted-foreground">
                Analizăm vizibilitatea pentru <span className="font-semibold text-foreground">{companyName}</span>
              </p>
            </div>

            {/* Platform Progress */}
            <div className="space-y-4 max-w-md mx-auto">
              {platforms.map((platform) => {
                const status = scanProgress[platform.id];

                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{platform.icon}</span>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {status === "queued" && (
                        <span className="text-sm text-muted-foreground">În așteptare</span>
                      )}
                      {status === "scanning" && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm text-primary">Se scanează...</span>
                        </>
                      )}
                      {status === "complete" && (
                        <>
                          <Check className="h-4 w-4 text-success" />
                          <span className="text-sm text-success">Complet</span>
                        </>
                      )}
                      {status === "failed" && (
                        <span className="text-sm text-error">Eroare</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Anulează Scanarea
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
