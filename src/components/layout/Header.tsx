import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isDashboard = location.pathname.startsWith("/dashboard") || 
                       location.pathname.startsWith("/scanner") ||
                       location.pathname.startsWith("/companies") ||
                       location.pathname.startsWith("/recommendations") ||
                       location.pathname.startsWith("/settings");

  if (isDashboard) return null;

  const navLinks = [
    { href: "#features", label: "Funcționalități" },
    { href: "#how-it-works", label: "Cum funcționează" },
    { href: "#pricing", label: "Prețuri" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-gold">
            <Target className="h-5 w-5 text-gold-foreground" />
          </div>
          <span className="text-xl font-bold">Surgical.AI</span>
        </Link>

        {!isAuthPage && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/login">Conectare</Link>
              </Button>
              <Button variant="gold" asChild>
                <Link to="/signup">Începe Gratuit</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="ghost" asChild>
                  <Link to="/login">Conectare</Link>
                </Button>
                <Button variant="gold" asChild>
                  <Link to="/signup">Începe Gratuit</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
