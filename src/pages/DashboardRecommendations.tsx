import { Link } from "react-router-dom";
import { Lock, ArrowRight, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/dashboard/AppLayout";

// Teaser recommendations (visible)
const TEASER: {
  priority: "Ridicată" | "Medie";
  priorityColor: string;
  title: string;
  description: string;
  impact: string;
  steps: string[];
}[] = [
  {
    priority: "Ridicată",
    priorityColor: "#FF3B5C",
    title: "Optimizează Profilul Google Business",
    description:
      "Afacerea ta nu apare în 70% din interogările locale. Un profil Google Business optimizat cu cuvinte cheie relevante poate crește vizibilitatea cu 15–25%.",
    impact: "+8–12 puncte",
    steps: [
      "Verifică profilul Google Business (proprietar confirmat)",
      "Adaugă descriere cu cuvintele cheie țintă",
      "Adaugă minimum 20 de fotografii recente",
      "Solicită 10+ recenzii noi de la clienți",
    ],
  },
  {
    priority: "Ridicată",
    priorityColor: "#FF3B5C",
    title: "Creează o Pagină FAQ pe Website",
    description:
      "AI-ul folosește conținut structurat tip întrebări-răspunsuri. O pagină FAQ cu 20+ întrebări relevante crește șansele de menționare cu ~30%.",
    impact: "+5–9 puncte",
    steps: [
      "Identifică top 20 întrebări din analiza ta",
      "Scrie răspunsuri clare de 50–100 cuvinte",
      "Adaugă markup Schema.org FAQ pe pagină",
      "Publică pagina și trimite sitemap actualizat",
    ],
  },
  {
    priority: "Medie",
    priorityColor: "#FFB020",
    title: "Îmbunătățește Prezența pe Directoare Online",
    description:
      "Listările coerente pe directoare (TripAdvisor, Yelp, etc.) cresc credibilitatea în ochii AI-ului și îmbunătățesc sentimentul menționărilor.",
    impact: "+3–6 puncte",
    steps: [
      "Listează afacerea pe TripAdvisor și Google Maps",
      "Asigură consistența NAP (Nume, Adresă, Telefon)",
      "Răspunde la toate recenziile existente",
    ],
  },
];

// Locked recommendations (blurred)
const LOCKED_COUNT = 6;

function RecommendationCard({
  priority,
  priorityColor,
  title,
  description,
  impact,
  steps,
  blurred = false,
}: (typeof TEASER)[0] & { blurred?: boolean }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#141416",
        border: `1px solid rgba(255,255,255,0.06)`,
        filter: blurred ? "blur(4px)" : "none",
        userSelect: blurred ? "none" : "auto",
        pointerEvents: blurred ? "none" : "auto",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-plex font-bold px-2 py-0.5 rounded-full"
            style={{
              background: `${priorityColor}18`,
              color: priorityColor,
              border: `1px solid ${priorityColor}30`,
            }}
          >
            🔴 Prioritate {priority}
          </span>
        </div>
        <span
          className="text-xs font-plex font-semibold flex-shrink-0"
          style={{ color: "#00E5A0" }}
        >
          Impact: {impact}
        </span>
      </div>

      <h3 className="text-base font-semibold font-plex mb-2">{title}</h3>
      <p className="text-sm font-plex mb-4 leading-relaxed" style={{ color: "#6B6B75" }}>
        {description}
      </p>

      <p className="text-xs font-plex font-semibold uppercase tracking-wide mb-2" style={{ color: "#6B6B75" }}>
        Pași concreți:
      </p>
      <ul className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2">
            <Square className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#6B6B75" }} />
            <span className="text-sm font-plex" style={{ color: "rgba(255,255,255,0.7)" }}>
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardRecommendations() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[900px] space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-syne">Recomandări</h1>
          <p className="text-sm font-plex mt-1" style={{ color: "#6B6B75" }}>
            Plan de acțiune personalizat pentru îmbunătățirea vizibilității AI.
          </p>
        </div>

        {/* Teaser cards (visible) */}
        <div className="space-y-4">
          {TEASER.map((rec, i) => (
            <RecommendationCard key={i} {...rec} />
          ))}
        </div>

        {/* Locked section */}
        <div className="relative">
          {/* Blurred locked cards */}
          <div className="space-y-4">
            {Array.from({ length: LOCKED_COUNT }).map((_, i) => (
              <RecommendationCard
                key={i}
                blurred
                priority="Medie"
                priorityColor="#FFB020"
                title="Recomandare blocată"
                description="Upgrade pentru a vedea toate recomandările personalizate bazate pe analiza ta."
                impact="+2–5 puncte"
                steps={["Pas 1", "Pas 2", "Pas 3"]}
              />
            ))}
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(10,10,11,0.97) 40%)",
            }}
          >
            <div
              className="rounded-2xl p-8 text-center max-w-sm w-full mx-4"
              style={{
                background: "rgba(14,14,16,0.98)",
                border: "1px solid rgba(0,229,160,0.18)",
                boxShadow: "0 0 40px rgba(0,229,160,0.06), 0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "rgba(0,229,160,0.1)",
                  border: "1px solid rgba(0,229,160,0.25)",
                }}
              >
                <Lock className="h-5 w-5" style={{ color: "#00E5A0" }} />
              </div>

              <h3 className="text-lg font-bold font-syne mb-2">
                {LOCKED_COUNT} Recomandări Suplimentare
              </h3>
              <p className="text-sm font-plex mb-4" style={{ color: "#6B6B75" }}>
                Deblochează toate recomandările, planul de implementare complet și urmărirea
                progresului cu planul Tratament.
              </p>

              <div
                className="rounded-lg px-4 py-3 mb-5 text-left"
                style={{
                  background: "rgba(0,229,160,0.06)",
                  border: "1px solid rgba(0,229,160,0.15)",
                }}
              >
                <p className="text-xs font-plex font-semibold mb-1" style={{ color: "#00E5A0" }}>
                  Cu planul Tratament obții:
                </p>
                <ul className="space-y-1">
                  {[
                    "Toate recomandările (9 total)",
                    "Tracking progres per pas",
                    "Impact estimat per recomandare",
                    "Recomandări actualizate după fiecare scanare",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckSquare className="h-3 w-3 flex-shrink-0" style={{ color: "#00E5A0" }} />
                      <span className="text-xs font-plex" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="gold" size="sm" className="w-full font-plex" asChild>
                <Link to="/dashboard/settings">
                  Upgrade la Tratament
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
