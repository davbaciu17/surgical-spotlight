import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function Header() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isDashboard = location.pathname.startsWith("/dashboard") || 
                       location.pathname.startsWith("/scanner") ||
                       location.pathname.startsWith("/companies") ||
                       location.pathname.startsWith("/recommendations") ||
                       location.pathname.startsWith("/settings");

  if (isDashboard) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-gold">
            <Zap className="h-5 w-5 text-gold-foreground" />
          </div>
          <span className="text-xl font-bold">Surgical.AI</span>
        </Link>

        {!isAuthPage && (
          <>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="gold" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
