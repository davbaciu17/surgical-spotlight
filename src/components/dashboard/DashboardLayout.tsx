import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Zap,
  LayoutDashboard,
  Radar,
  Building2,
  Lightbulb,
  Settings,
  LogOut,
  ChevronDown,
  User,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const navigation = [
    { name: "Panou", href: "/dashboard", icon: LayoutDashboard },
    { name: "Scanner", href: "/scanner", icon: Radar },
    { name: "Companii", href: "/companies", icon: Building2 },
    { name: "Recomandări", href: "/recommendations", icon: Lightbulb },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Utilizator";
  const displayEmail = user?.email || "";
  const initials = (profile?.full_name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-gold">
              <Zap className="h-5 w-5 text-gold-foreground" />
            </div>
            <span className="text-xl font-bold hidden sm:inline">Surgical.AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  size="sm"
                  className={isActive(item.href) ? "bg-primary/10 text-primary" : ""}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">{initials}</span>
                </div>
                <span className="hidden sm:inline">{displayName}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayEmail}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Setări
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/billing" className="cursor-pointer">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Facturare
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-error">
                <LogOut className="h-4 w-4 mr-2" />
                Deconectare
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-card/95 backdrop-blur-xl">
        <nav className="flex items-center justify-around h-16">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col h-auto py-2 px-4 ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
