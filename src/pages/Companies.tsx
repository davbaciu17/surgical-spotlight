import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Building2, Globe, Radar, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const mockCompanies = [
  {
    id: "1",
    name: "Acme Corp",
    website: "acme.com",
    industry: "Tehnologie",
    lastScore: 78,
    lastScan: "12 Feb 2024",
  },
  {
    id: "2",
    name: "TechStart Inc",
    website: "techstart.io",
    industry: "SaaS",
    lastScore: null,
    lastScan: null,
  },
];

const industries = [
  "Tehnologie",
  "SaaS",
  "E-commerce",
  "Finanțe",
  "Sănătate",
  "Marketing",
  "Consultanță",
  "Altele",
];

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCompanies = mockCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Companiile Tale</h1>
            <p className="text-muted-foreground mt-1">
              Gestionează brandurile pe care le urmărești
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gold">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă Companie
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adaugă Companie Nouă</DialogTitle>
                <DialogDescription>
                  Adaugă o companie pentru a-i urmări vizibilitatea AI
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Numele Companiei *</Label>
                  <Input id="name" placeholder="Acme Corp" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">URL Website *</Label>
                  <Input id="website" placeholder="acme.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industrie</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează industria" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry.toLowerCase()}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Cuvinte Cheie</Label>
                  <Input
                    id="keywords"
                    placeholder="management proiecte, colaborare echipă"
                  />
                  <p className="text-xs text-muted-foreground">
                    Cuvinte cheie separate prin virgulă
                  </p>
                </div>
              </form>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anulează
                </Button>
                <Button variant="gold" onClick={() => setIsDialogOpen(false)}>
                  Adaugă Companie
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Limit Indicator */}
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Folosești <span className="font-semibold text-foreground">2 din 5</span> sloturi
            de companii
          </span>
          <Button variant="link" className="text-gold h-auto p-0">
            Treci la nelimitat
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Caută companii..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      {company.website}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Industrie</span>
                  <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                    {company.industry}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ultimul Scor</span>
                  {company.lastScore ? (
                    <span className="font-bold font-mono text-gradient-gold">
                      {company.lastScore}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Nescanat</span>
                  )}
                </div>
                {company.lastScan && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ultima Scanare</span>
                    <span>{company.lastScan}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="gold" size="sm" className="flex-1" asChild>
                  <Link to="/scanner">
                    <Radar className="h-4 w-4 mr-1" />
                    Scanează
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-error hover:text-error">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Add Company Card */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="glass rounded-2xl p-6 border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[240px] group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <p className="font-semibold">Adaugă Companie Nouă</p>
            <p className="text-sm text-muted-foreground">Urmărește alt brand</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
