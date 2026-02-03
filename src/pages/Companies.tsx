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
    industry: "Technology",
    lastScore: 78,
    lastScan: "Feb 12, 2024",
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
  "Technology",
  "SaaS",
  "E-commerce",
  "Finance",
  "Healthcare",
  "Marketing",
  "Consulting",
  "Other",
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
            <h1 className="text-3xl font-bold">Your Companies</h1>
            <p className="text-muted-foreground mt-1">
              Manage the brands you're tracking
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gold">
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogDescription>
                  Add a company to start tracking its AI visibility
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input id="name" placeholder="Acme Corp" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL *</Label>
                  <Input id="website" placeholder="acme.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
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
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="project management, team collaboration"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated keywords to test
                  </p>
                </div>
              </form>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="gold" onClick={() => setIsDialogOpen(false)}>
                  Add Company
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Limit Indicator */}
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Using <span className="font-semibold text-foreground">2 of 5</span> company
            slots
          </span>
          <Button variant="link" className="text-gold h-auto p-0">
            Upgrade for unlimited
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
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
                  <span className="text-muted-foreground">Industry</span>
                  <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                    {company.industry}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Score</span>
                  {company.lastScore ? (
                    <span className="font-bold font-mono text-gradient-gold">
                      {company.lastScore}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Not scanned</span>
                  )}
                </div>
                {company.lastScan && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Scan</span>
                    <span>{company.lastScan}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="gold" size="sm" className="flex-1" asChild>
                  <Link to="/scanner">
                    <Radar className="h-4 w-4 mr-1" />
                    Scan
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
            <p className="font-semibold">Add New Company</p>
            <p className="text-sm text-muted-foreground">Track another brand</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
