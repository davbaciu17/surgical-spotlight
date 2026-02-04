import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Bell,
  CreditCard,
  Key,
  Upload,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const mockApiKey = "sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Setări</h1>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="glass p-1">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificări
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Facturare
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Key className="h-4 w-4" />
              API
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="glass rounded-2xl p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Setări Profil</h2>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Încarcă Foto
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG sau GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nume Complet</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john@example.com" disabled />
                    <p className="text-xs text-muted-foreground">
                      Contactează suportul pentru schimbarea emailului
                    </p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="company">Numele Companiei</Label>
                    <Input id="company" defaultValue="Acme Corp" />
                  </div>
                </div>

                <Button variant="gold" className="mt-6">
                  Salvează Modificările
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="glass rounded-2xl p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Preferințe Notificări</h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "Scanare Completă",
                      description: "Primește notificare când o scanare se termină",
                      defaultOn: true,
                    },
                    {
                      title: "Modificări Scor",
                      description: "Alerte când scorul tău crește sau scade semnificativ",
                      defaultOn: true,
                    },
                    {
                      title: "Sumar Săptămânal",
                      description: "Email săptămânal cu statisticile tale de vizibilitate",
                      defaultOn: false,
                    },
                    {
                      title: "Recomandări Noi",
                      description: "Când sunt disponibile recomandări noi",
                      defaultOn: true,
                    },
                    {
                      title: "Actualizări Produs",
                      description: "Noutăți despre funcții și îmbunătățiri noi",
                      defaultOn: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-card transition-colors"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.defaultOn} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Planul Curent</h2>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Gratuit
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Scanări Folosite</p>
                    <p className="text-2xl font-bold">2 / 3</p>
                    <p className="text-xs text-muted-foreground">Se resetează lunar</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Companii</p>
                    <p className="text-2xl font-bold">2 / 1</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Următoarea Facturare</p>
                    <p className="text-2xl font-bold">—</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                    <h3 className="font-semibold">Treci la Pro</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Obține scanări nelimitate, 5 companii, istoric și rapoarte PDF.
                  </p>
                  <Button variant="gold">
                    Upgrade pentru 49€/lună
                  </Button>
                </div>
              </div>

              {/* Billing History */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Istoric Facturare</h3>
                <p className="text-sm text-muted-foreground">
                  Nu există istoric de facturare pentru planul gratuit.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api">
            <div className="glass rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 p-4 rounded-lg bg-gold/10 border border-gold/30">
                <Sparkles className="h-5 w-5 text-gold" />
                <p className="text-sm font-medium">
                  Accesul API necesită planul Pro sau Agency
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-6">Chei API</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cheia Ta API</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value={mockApiKey}
                          readOnly
                          className="pr-10 font-mono"
                          disabled
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                          disabled
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Button variant="outline" disabled>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Fă upgrade pentru a accesa cheia API
                    </p>
                  </div>

                  <Button variant="outline" disabled>
                    Regenerează Cheia
                  </Button>
                </div>
              </div>

              {/* Usage Stats */}
              <div>
                <h3 className="font-semibold mb-4">Utilizare API</h3>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-muted-foreground text-sm">
                    Fă upgrade pentru a vedea statisticile de utilizare API
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
