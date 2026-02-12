import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Radar,
  Building2,
  Globe,
  Target,
  Users,
  Swords,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createScan } from "@/services/scanService";
import { scannerFormSchema, type ScannerFormValues } from "@/lib/scannerSchema";

const steps = [
  {
    id: 1,
    title: "Despre Companie",
    description: "Informații de bază despre afacerea ta",
    fields: ["business_name", "website"] as const,
  },
  {
    id: 2,
    title: "Piața Ta",
    description: "Contextul pieței și domeniul de activitate",
    fields: ["niche", "target_market"] as const,
  },
  {
    id: 3,
    title: "Competiție",
    description: "Clientul ideal și competitorii principali",
    fields: ["ideal_client", "competition"] as const,
  },
];

export default function Scanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<ScannerFormValues>({
    resolver: zodResolver(scannerFormSchema),
    defaultValues: {
      business_name: "",
      website: "",
      niche: "",
      target_market: "",
      ideal_client: "",
      competition: "",
    },
    mode: "onTouched",
  });

  const step = steps[currentStep];

  const canProceed = async () => {
    const result = await form.trigger(step.fields as any);
    return result;
  };

  const handleNext = async () => {
    const valid = await canProceed();
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const onSubmit = async (data: ScannerFormValues) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const { scanId } = await createScan(user.id, data as import("@/services/scanService").ScanRequest);
      toast({
        title: "Scanare inițiată!",
        description: "Procesarea durează 8-22 minute. Te notificăm când este gata.",
      });
      navigate(`/scanner/results/${scanId}`);
    } catch (error) {
      toast({
        title: "Eroare la scanare",
        description: error instanceof Error ? error.message : "A apărut o eroare. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  i < currentStep
                    ? "bg-success text-success-foreground"
                    : i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <Check className="h-4 w-4" /> : s.id}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 ${
                    i < currentStep ? "bg-success" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{step.title}</h2>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Despre Companie */}
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          Numele Companiei
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Restaurant Bella Italia"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          Link Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: https://bellaitalia.ro"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Step 2: Piața Ta */}
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="niche"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          Nișa / Domeniul de Activitate
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ex: Restaurant italian, pizzerie artizanală"
                            className="min-h-[100px] text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="target_market"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          Piața Țintă
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Brașov, România"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Step 3: Competiție */}
              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="ideal_client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          Clientul Ideal
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ex: Familii și cupluri care caută mâncare italiană autentică"
                            className="min-h-[100px] text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="competition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Swords className="h-4 w-4 text-primary" />
                          Competitori Principali
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Pasta Nostra, La Famiglia, Il Giardino"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Înapoi
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    variant="gold"
                    onClick={handleNext}
                    className="gap-2"
                  >
                    Continuă
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="gold"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Începe Analiza
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Estimated Time */}
              {currentStep === steps.length - 1 && (
                <p className="text-center text-xs text-muted-foreground">
                  Timp estimat de procesare: 8-22 minute
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
}
