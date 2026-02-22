import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Building2,
  Globe,
  Target,
  Users,
  Swords,
  ArrowRight,
  Loader2,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createScan } from "@/services/scanService";
import { scannerFormSchema, type ScannerFormValues } from "@/lib/scannerSchema";

export default function Analyze() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login?redirect=/analyze", { replace: true });
    }
  }, [user, authLoading, navigate]);

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

  const onSubmit = async (data: ScannerFormValues) => {
    if (!user) {
      navigate("/login?redirect=/analyze", { replace: true });
      return;
    }
    setIsSubmitting(true);
    try {
      const { requestId } = await createScan(data as import("@/services/scanService").ScanRequest);
      toast({
        title: "Analiza a fost initiata!",
        description: "Procesarea dureaza 3-5 minute.",
      });
      navigate(`/results/${requestId}`);
    } catch (error) {
      toast({
        title: "Eroare la scanare",
        description:
          error instanceof Error
            ? error.message
            : "A aparut o eroare. Incearca din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-foreground/10 bg-foreground/5 mb-4">
              <Target className="h-7 w-7 text-foreground/70" />
            </div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              Analiza de Vizibilitate AI
            </h1>
            <p className="text-muted-foreground">
              Completeaza datele afacerii tale si afla scorul de vizibilitate in
              ChatGPT
            </p>
          </div>

          {/* Form Card */}
          <div className="glass rounded-2xl p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <Building2 className="h-4 w-4 text-foreground/50" />
                        Numele Afacerii
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Restaurant Bella Italia"
                          className="h-12 text-base bg-background/50 border-border/60 focus:border-foreground/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="niche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <Target className="h-4 w-4 text-foreground/50" />
                        Industrie / Nisa
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Restaurant italian, Cabinet stomatologic, Salon auto"
                          className="h-12 text-base bg-background/50 border-border/60 focus:border-foreground/30"
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
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <Globe className="h-4 w-4 text-foreground/50" />
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: https://bellaitalia.ro"
                          className="h-12 text-base bg-background/50 border-border/60 focus:border-foreground/30"
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
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <MapPin className="h-4 w-4 text-foreground/50" />
                        Piata Tinta / Oras
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Brasov, Romania"
                          className="h-12 text-base bg-background/50 border-border/60 focus:border-foreground/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ideal_client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <Users className="h-4 w-4 text-foreground/50" />
                        Clientul Ideal
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Localnici 25-55 ani care cauta mancare italiana"
                          className="h-12 text-base bg-background/50 border-border/60 focus:border-foreground/30"
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
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <Swords className="h-4 w-4 text-foreground/50" />
                        Competitie (separate prin virgula)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: La Famiglia, Trattoria, Bella Italia"
                          className="h-12 text-base bg-background/50 border-border/60 focus:border-foreground/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        Incepe Analiza Gratuita
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Timp estimat de procesare: 3-5 minute
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
