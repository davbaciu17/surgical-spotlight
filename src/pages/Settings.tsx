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
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="glass p-1">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
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
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

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
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john@example.com" disabled />
                    <p className="text-xs text-muted-foreground">
                      Contact support to change email
                    </p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" defaultValue="Acme Corp" />
                  </div>
                </div>

                <Button variant="gold" className="mt-6">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="glass rounded-2xl p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "Scan Complete",
                      description: "Get notified when a scan finishes",
                      defaultOn: true,
                    },
                    {
                      title: "Score Changes",
                      description: "Alerts when your score increases or decreases significantly",
                      defaultOn: true,
                    },
                    {
                      title: "Weekly Summary",
                      description: "Weekly email with your visibility stats",
                      defaultOn: false,
                    },
                    {
                      title: "New Recommendations",
                      description: "When new recommendations are available",
                      defaultOn: true,
                    },
                    {
                      title: "Product Updates",
                      description: "News about new features and improvements",
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
                  <h2 className="text-xl font-semibold">Current Plan</h2>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Free
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Scans Used</p>
                    <p className="text-2xl font-bold">2 / 3</p>
                    <p className="text-xs text-muted-foreground">Resets monthly</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Companies</p>
                    <p className="text-2xl font-bold">2 / 1</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Next Billing</p>
                    <p className="text-2xl font-bold">—</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                    <h3 className="font-semibold">Upgrade to Pro</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get unlimited scans, 5 companies, historical tracking, and PDF reports.
                  </p>
                  <Button variant="gold">
                    Upgrade for $49/month
                  </Button>
                </div>
              </div>

              {/* Billing History */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Billing History</h3>
                <p className="text-sm text-muted-foreground">
                  No billing history available on the free plan.
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
                  API access requires Pro or Agency plan
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-6">API Keys</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your API Key</Label>
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
                      Upgrade to access your API key
                    </p>
                  </div>

                  <Button variant="outline" disabled>
                    Regenerate Key
                  </Button>
                </div>
              </div>

              {/* Usage Stats */}
              <div>
                <h3 className="font-semibold mb-4">API Usage</h3>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-muted-foreground text-sm">
                    Upgrade to view API usage statistics
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
