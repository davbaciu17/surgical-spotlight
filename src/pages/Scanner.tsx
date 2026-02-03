import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Radar,
  Building2,
  Settings2,
  PlayCircle,
  Check,
  Loader2,
  Zap,
} from "lucide-react";

const platforms = [
  { id: "chatgpt", name: "ChatGPT", icon: "🤖", description: "OpenAI's GPT-4" },
  { id: "perplexity", name: "Perplexity", icon: "🔮", description: "AI-powered search" },
  { id: "google", name: "Google AI Overview", icon: "🔍", description: "Search generative experience" },
  { id: "bing", name: "Bing Copilot", icon: "💬", description: "Microsoft's AI assistant" },
];

const mockCompanies = [
  { id: "1", name: "Acme Corp", website: "acme.com" },
  { id: "2", name: "TechStart Inc", website: "techstart.io" },
];

export default function Scanner() {
  const [step, setStep] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["chatgpt", "perplexity", "google"]);
  const [additionalKeywords, setAdditionalKeywords] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<Record<string, "queued" | "scanning" | "complete" | "failed">>({});
  const navigate = useNavigate();

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const startScan = () => {
    setIsScanning(true);
    const initialProgress: Record<string, "queued" | "scanning" | "complete" | "failed"> = {};
    selectedPlatforms.forEach((p) => (initialProgress[p] = "queued"));
    setScanProgress(initialProgress);

    // Simulate scan progress
    selectedPlatforms.forEach((platform, index) => {
      setTimeout(() => {
        setScanProgress((prev) => ({ ...prev, [platform]: "scanning" }));
      }, index * 2000);

      setTimeout(() => {
        setScanProgress((prev) => ({ ...prev, [platform]: "complete" }));
      }, (index + 1) * 2000 + 1000);
    });

    // Navigate to results after all complete
    setTimeout(() => {
      navigate("/scanner/results/1");
    }, selectedPlatforms.length * 2000 + 2000);
  };

  const selectedCompanyData = mockCompanies.find((c) => c.id === selectedCompany);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Visibility Scanner</h1>
          <p className="text-muted-foreground">
            Discover how your brand appears across AI platforms
          </p>
        </div>

        {/* Progress Steps */}
        {!isScanning && (
          <div className="flex items-center justify-between mb-8">
            {[
              { num: 1, label: "Select Company", icon: Building2 },
              { num: 2, label: "Configure Scan", icon: Settings2 },
              { num: 3, label: "Review & Launch", icon: PlayCircle },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`flex items-center gap-3 ${
                    step >= s.num ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step === s.num
                        ? "bg-gradient-gold text-gold-foreground"
                        : step > s.num
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                  </div>
                  <span className="hidden md:inline font-medium">{s.label}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 md:w-24 h-0.5 mx-4 ${
                      step > s.num ? "bg-success" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div className="glass rounded-2xl p-8">
          {!isScanning ? (
            <>
              {/* Step 1: Select Company */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select a company to scan</Label>
                    <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose a company..." />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCompanies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            <span className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              {company.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCompanyData && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <p className="font-semibold">{selectedCompanyData.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCompanyData.website}</p>
                    </div>
                  )}

                  <button className="text-sm text-primary hover:underline">
                    + Add new company
                  </button>
                </div>
              )}

              {/* Step 2: Configure Scan */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-4 block">Select platforms to scan</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {platforms.map((platform) => (
                        <label
                          key={platform.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedPlatforms.includes(platform.id)
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            checked={selectedPlatforms.includes(platform.id)}
                            onCheckedChange={() => togglePlatform(platform.id)}
                          />
                          <span className="text-2xl">{platform.icon}</span>
                          <div>
                            <p className="font-medium">{platform.name}</p>
                            <p className="text-xs text-muted-foreground">{platform.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Additional keywords (optional)</Label>
                    <Input
                      id="keywords"
                      placeholder="e.g., best CRM software, project management"
                      value={additionalKeywords}
                      onChange={(e) => setAdditionalKeywords(e.target.value)}
                      className="h-12"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add extra keywords to test alongside your brand
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Launch */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold mb-4">Scan Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company</span>
                        <span className="font-medium">{selectedCompanyData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platforms</span>
                        <span className="font-medium">{selectedPlatforms.length} selected</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {selectedPlatforms.map((p) => {
                          const platform = platforms.find((pl) => pl.id === p);
                          return (
                            <span
                              key={p}
                              className="px-3 py-1 rounded-full bg-primary/10 text-sm"
                            >
                              {platform?.icon} {platform?.name}
                            </span>
                          );
                        })}
                      </div>
                      {additionalKeywords && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Keywords</span>
                          <span className="font-medium">{additionalKeywords}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gold/10 border border-gold/30 text-center">
                    <p className="text-sm font-medium text-gold">
                      Estimated time: 30-60 seconds
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                {step < 3 ? (
                  <Button
                    variant="gold"
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && !selectedCompany}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="gold" onClick={startScan}>
                    <Radar className="h-4 w-4 mr-2" />
                    Start Surgical Scan
                  </Button>
                )}
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
                <h2 className="text-2xl font-bold mb-2">Scanning in Progress</h2>
                <p className="text-muted-foreground">
                  Querying AI platforms for your brand mentions...
                </p>
              </div>

              {/* Platform Progress */}
              <div className="space-y-4 max-w-md mx-auto">
                {selectedPlatforms.map((platformId) => {
                  const platform = platforms.find((p) => p.id === platformId);
                  const status = scanProgress[platformId];

                  return (
                    <div
                      key={platformId}
                      className="flex items-center justify-between p-4 rounded-lg bg-card border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{platform?.icon}</span>
                        <span className="font-medium">{platform?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {status === "queued" && (
                          <span className="text-sm text-muted-foreground">Queued</span>
                        )}
                        {status === "scanning" && (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-sm text-primary">Scanning...</span>
                          </>
                        )}
                        {status === "complete" && (
                          <>
                            <Check className="h-4 w-4 text-success" />
                            <span className="text-sm text-success">Complete</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel Scan
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
