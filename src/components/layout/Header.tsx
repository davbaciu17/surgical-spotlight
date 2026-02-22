import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLanding = location.pathname === "/";

  // Anchor links (smooth scroll) — only used on landing page
  const anchorLinks = isLanding
    ? [
        { href: "#how-it-works", label: "Cum funcționează" },
        { href: "#pricing", label: "Prețuri" },
      ]
    : [];

  // Router links shown on all pages
  const routerLinks = [
    // When not on landing, link back to landing sections
    ...(!isLanding
      ? [
          { to: "/#how-it-works", label: "Cum funcționează" },
          { to: "/#pricing", label: "Prețuri" },
        ]
      : []),
    { to: "/despre-aeo", label: "Despre AEO" },
  ];

  // Anchor/router link for Solutions
  const solutionsLink = isLanding
    ? { type: "anchor" as const, href: "#solutii", label: "Soluții" }
    : { type: "router" as const, to: "/#solutii", label: "Soluții" };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/30"
            style={{ background: "rgba(0,229,160,0.08)" }}
          >
            <span className="text-sm font-bold text-gold font-syne">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight font-syne">Surgical.AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 whitespace-nowrap">
          {anchorLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          {solutionsLink.type === "anchor" ? (
            <a
              href={solutionsLink.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {solutionsLink.label}
            </a>
          ) : (
            <Link
              to={solutionsLink.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {solutionsLink.label}
            </Link>
          )}
          {routerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="goldOutline" size="sm" asChild>
            <Link to="/login">
              Autentificare
            </Link>
          </Button>
          <Link to="/analyze">
            <ShimmerButton
              shimmerColor="#00E5A0"
              background="linear-gradient(135deg, #00E5A0 0%, #00B8D4 100%)"
              borderRadius="8px"
              className="h-9 px-4 text-sm font-bold text-black"
            >
              Analizează-ți Afacerea
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </ShimmerButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Meniu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {anchorLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/20 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {solutionsLink.type === "anchor" ? (
                <a
                  href={solutionsLink.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/20 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {solutionsLink.label}
                </a>
              ) : (
                <Link
                  to={solutionsLink.to}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/20 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {solutionsLink.label}
                </Link>
              )}
              {routerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/20 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button variant="goldOutline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Autentificare
                  </Link>
                </Button>
                <Button variant="gold" className="w-full" asChild>
                  <Link to="/analyze" onClick={() => setMobileMenuOpen(false)}>
                    Analizează-ți Afacerea
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
