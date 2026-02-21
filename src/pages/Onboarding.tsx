import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createScan } from "@/services/scanService";
import { toast } from "sonner";

const schema = z.object({
  business_name: z.string().min(2, "Minim 2 caractere"),
  niche: z.string().min(2, "Minim 2 caractere"),
  website: z
    .string()
    .optional()
    .refine(
      (v) => !v || v === "" || /^https?:\/\/.+/.test(v),
      "URL-ul trebuie să înceapă cu http:// sau https://"
    ),
  target_market: z.string().min(2, "Minim 2 caractere"),
  ideal_client: z.string().optional(),
  competition: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Onboarding() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0B" }}>
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#00E5A0" }} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await createScan({
        business_name: values.business_name,
        niche: values.niche,
        website: values.website || "",
        target_market: values.target_market,
        ideal_client: values.ideal_client || "",
        competition: values.competition || "",
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Eroare la pornirea analizei. Încearcă din nou."
      );
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "#0A0A0B" }}
    >
      {/* Background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at top, rgba(0,229,160,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md"
            style={{
              background: "rgba(0,229,160,0.10)",
              border: "1px solid rgba(0,229,160,0.25)",
            }}
          >
            <span className="text-base font-bold font-syne" style={{ color: "#00E5A0" }}>S</span>
          </div>
          <span className="text-xl font-bold font-syne">Surgical.AI</span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#111113",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold font-syne mb-2">
              Bine ai venit în Surgical! 👋
            </h1>
            <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
              Completează datele afacerii tale pentru a începe prima analiză de
              vizibilitate AI.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Business name */}
            <div className="space-y-1.5">
              <Label htmlFor="business_name" className="font-plex text-sm">
                Numele afacerii <span style={{ color: "#FF3B5C" }}>*</span>
              </Label>
              <Input
                id="business_name"
                placeholder="Restaurant Bella Italia"
                {...register("business_name")}
                className="font-plex"
                style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
              />
              {errors.business_name && (
                <p className="text-xs font-plex" style={{ color: "#FF3B5C" }}>
                  {errors.business_name.message}
                </p>
              )}
            </div>

            {/* Niche */}
            <div className="space-y-1.5">
              <Label htmlFor="niche" className="font-plex text-sm">
                Nișa / Industria <span style={{ color: "#FF3B5C" }}>*</span>
              </Label>
              <Input
                id="niche"
                placeholder="Restaurant italian"
                {...register("niche")}
                className="font-plex"
                style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
              />
              {errors.niche && (
                <p className="text-xs font-plex" style={{ color: "#FF3B5C" }}>
                  {errors.niche.message}
                </p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-1.5">
              <Label htmlFor="website" className="font-plex text-sm">
                Website{" "}
                <span className="text-xs font-normal" style={{ color: "#6B6B75" }}>
                  (opțional — îmbunătățește rezultatele)
                </span>
              </Label>
              <Input
                id="website"
                placeholder="https://bellaitalia.ro"
                {...register("website")}
                className="font-plex"
                style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
              />
              {errors.website && (
                <p className="text-xs font-plex" style={{ color: "#FF3B5C" }}>
                  {errors.website.message}
                </p>
              )}
            </div>

            {/* Target market */}
            <div className="space-y-1.5">
              <Label htmlFor="target_market" className="font-plex text-sm">
                Piața țintă <span style={{ color: "#FF3B5C" }}>*</span>
              </Label>
              <Input
                id="target_market"
                placeholder="Brașov, România"
                {...register("target_market")}
                className="font-plex"
                style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
              />
              {errors.target_market && (
                <p className="text-xs font-plex" style={{ color: "#FF3B5C" }}>
                  {errors.target_market.message}
                </p>
              )}
            </div>

            {/* Ideal client */}
            <div className="space-y-1.5">
              <Label htmlFor="ideal_client" className="font-plex text-sm">
                Clientul ideal{" "}
                <span className="text-xs font-normal" style={{ color: "#6B6B75" }}>
                  (opțional)
                </span>
              </Label>
              <Textarea
                id="ideal_client"
                placeholder="Familii și cupluri care caută o experiență culinară italiană autentică..."
                rows={2}
                {...register("ideal_client")}
                className="font-plex resize-none"
                style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Competitors */}
            <div className="space-y-1.5">
              <Label htmlFor="competition" className="font-plex text-sm">
                Competitori principali{" "}
                <span className="text-xs font-normal" style={{ color: "#6B6B75" }}>
                  (opțional — separă cu virgulă)
                </span>
              </Label>
              <Textarea
                id="competition"
                placeholder="La Famiglia, Trattoria del Centro, Casa Romanească"
                rows={2}
                {...register("competition")}
                className="font-plex resize-none"
                style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full font-plex mt-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Se pornește analiza...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Începe Analiza Chirurgicală
                </>
              )}
            </Button>

            <p className="text-xs text-center font-plex" style={{ color: "#6B6B75" }}>
              Analiza durează aproximativ 3–5 minute. Te vom notifica când este gata.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
