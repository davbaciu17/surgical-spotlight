import { useState, useEffect } from "react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, CreditCard, Building2, Check, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SettingsSection = "cont" | "afacere" | "notificari" | "facturare";

const NAV_ITEMS: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
  { id: "cont", label: "Cont", icon: User },
  { id: "afacere", label: "Date Afacere", icon: Building2 },
  { id: "notificari", label: "Notificări", icon: Bell },
  { id: "facturare", label: "Facturare", icon: CreditCard },
];

const NOTIF_KEYS = [
  { key: "notif_scan_done", title: "Scanare Completă", description: "Notificare când o scanare se termină", defaultOn: true },
  { key: "notif_score_change", title: "Modificări Scor", description: "Alerte când scorul crește sau scade semnificativ", defaultOn: true },
  { key: "notif_weekly", title: "Sumar Săptămânal", description: "Email săptămânal cu statisticile de vizibilitate", defaultOn: false },
  { key: "notif_recommendations", title: "Recomandări Noi", description: "Când sunt disponibile recomandări noi", defaultOn: true },
  { key: "notif_updates", title: "Actualizări Produs", description: "Noutăți despre funcții și îmbunătățiri noi", defaultOn: false },
];

function getNotifState(key: string, defaultOn: boolean): boolean {
  const stored = localStorage.getItem(key);
  return stored !== null ? stored === "true" : defaultOn;
}

export default function Settings() {
  const { user, profile } = useAuth();
  const [active, setActive] = useState<SettingsSection>("cont");

  // Account form state
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Notification state
  const [notifState, setNotifState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIF_KEYS.map((n) => [n.key, getNotifState(n.key, n.defaultOn)]))
  );

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setCompanyName(profile.company_name || "");
    }
  }, [profile]);

  const handleSaveAccount = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from("profiles")
        .update({ full_name: fullName, company_name: companyName })
        .eq("id", user.id);

      if (error) throw error;
      setSaved(true);
      toast.success("Datele au fost salvate.");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      toast.error("Eroare la salvare. Încearcă din nou.");
    } finally {
      setSaving(false);
    }
  };

  const handleNotifToggle = (key: string, value: boolean) => {
    localStorage.setItem(key, String(value));
    setNotifState((prev) => ({ ...prev, [key]: value }));
  };

  const displayEmail = user?.email || "";
  const initials = (profile?.full_name || displayEmail || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <AppLayout>
      <div className="p-6 max-w-[860px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-syne">Setări</h1>
          <p className="text-sm font-plex mt-1" style={{ color: "#6B6B75" }}>
            Gestionează contul și preferințele tale.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Left nav */}
          <aside className="hidden sm:flex flex-col gap-1 w-44 flex-shrink-0">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-plex text-left transition-colors"
                  style={{
                    background: isActive ? "rgba(0,229,160,0.08)" : "transparent",
                    color: isActive ? "#00E5A0" : "#A0A0AB",
                    borderLeft: isActive ? "2px solid #00E5A0" : "2px solid transparent",
                  }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </aside>

          {/* Mobile nav */}
          <div className="flex sm:hidden gap-2 mb-4 flex-wrap">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-plex"
                  style={{
                    background: isActive ? "rgba(0,229,160,0.08)" : "rgba(255,255,255,0.04)",
                    color: isActive ? "#00E5A0" : "#A0A0AB",
                    border: isActive ? "1px solid rgba(0,229,160,0.2)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right content */}
          <div className="flex-1 min-w-0">

            {/* ── Cont ── */}
            {active === "cont" && (
              <div
                className="rounded-2xl p-6"
                style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="text-base font-semibold font-plex mb-6">Informații Cont</h2>

                {/* Avatar row */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)" }}
                  >
                    <span className="text-lg font-bold font-syne" style={{ color: "#00E5A0" }}>
                      {initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-plex font-medium">{profile?.full_name || "—"}</p>
                    <p className="text-xs font-plex" style={{ color: "#6B6B75" }}>{displayEmail}</p>
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="full_name" className="font-plex text-sm">Nume Complet</Label>
                    <Input
                      id="full_name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="font-plex"
                      style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email_display" className="font-plex text-sm">Email</Label>
                    <Input
                      id="email_display"
                      value={displayEmail}
                      disabled
                      className="font-plex"
                      style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.06)", opacity: 0.6 }}
                    />
                    <p className="text-xs font-plex" style={{ color: "#6B6B75" }}>
                      Contactează suportul pentru schimbarea emailului.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company_name" className="font-plex text-sm">Companie</Label>
                    <Input
                      id="company_name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="font-plex"
                      style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.1)" }}
                    />
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="sm"
                  className="mt-6 font-plex"
                  onClick={handleSaveAccount}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Se salvează...
                    </>
                  ) : saved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Salvat!
                    </>
                  ) : (
                    "Salvează Modificările"
                  )}
                </Button>
              </div>
            )}

            {/* ── Afacere ── */}
            {active === "afacere" && (
              <div
                className="rounded-2xl p-6"
                style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="text-base font-semibold font-plex mb-2">Date Afacere</h2>
                <p className="text-sm font-plex mb-6" style={{ color: "#6B6B75" }}>
                  Aceste date sunt folosite pentru analiza ta de vizibilitate AI. Pentru a le actualiza, rulează o scanare nouă cu datele revizuite.
                </p>

                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(0,229,160,0.04)", border: "1px solid rgba(0,229,160,0.12)" }}
                >
                  <p className="text-xs font-plex font-semibold mb-1" style={{ color: "#00E5A0" }}>
                    Cum actualizezi datele afacerii?
                  </p>
                  <p className="text-sm font-plex" style={{ color: "#A0A0AB" }}>
                    Apasă „Scanare Nouă" din panoul principal și completează formularul cu informațiile actualizate. Fiecare scanare pornește cu datele pe care le introduci atunci.
                  </p>
                </div>
              </div>
            )}

            {/* ── Notificări ── */}
            {active === "notificari" && (
              <div
                className="rounded-2xl p-6"
                style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="text-base font-semibold font-plex mb-6">Preferințe Notificări</h2>

                <div className="space-y-1">
                  {NOTIF_KEYS.map((item, i) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-4"
                      style={{
                        borderBottom: i < NOTIF_KEYS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}
                    >
                      <div>
                        <p className="text-sm font-plex font-medium">{item.title}</p>
                        <p className="text-xs font-plex mt-0.5" style={{ color: "#6B6B75" }}>
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        checked={notifState[item.key]}
                        onCheckedChange={(v) => handleNotifToggle(item.key, v)}
                        className="ml-4 flex-shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Facturare ── */}
            {active === "facturare" && (
              <div className="space-y-4">
                {/* Current plan */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold font-plex">Planul Curent</h2>
                    <span
                      className="text-xs font-plex font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(0,229,160,0.1)",
                        color: "#00E5A0",
                        border: "1px solid rgba(0,229,160,0.2)",
                      }}
                    >
                      Diagnostic (Gratuit)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Scanări Incluse", value: "1 / lună" },
                      { label: "Afaceri Active", value: "1" },
                      { label: "Următoarea Facturare", value: "—" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl p-3"
                        style={{ background: "#0A0A0B", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <p className="text-xs font-plex" style={{ color: "#6B6B75" }}>{stat.label}</p>
                        <p className="text-lg font-bold font-syne mt-1">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Upgrade card */}
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(0,229,160,0.04)",
                      border: "1px solid rgba(0,229,160,0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4" style={{ color: "#00E5A0" }} />
                      <p className="text-sm font-plex font-semibold">Treci la Tratament</p>
                    </div>
                    <p className="text-sm font-plex mb-4" style={{ color: "#6B6B75" }}>
                      Scanări nelimitate, toate recomandările, plan de conținut lunar și urmărirea progresului.
                    </p>
                    <Button variant="gold" size="sm" className="font-plex">
                      Upgrade la Tratament — 49€/lună
                    </Button>
                  </div>
                </div>

                {/* Billing history */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <h3 className="text-sm font-plex font-semibold mb-3">Istoric Facturare</h3>
                  <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
                    Nu există facturi pentru planul gratuit.
                  </p>
                </div>

                {/* Contact */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
                    Întrebări despre facturare?{" "}
                    <a
                      href="mailto:contact@surgical.ai"
                      className="font-semibold hover:underline"
                      style={{ color: "#00E5A0" }}
                    >
                      Contactează-ne
                    </a>
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
