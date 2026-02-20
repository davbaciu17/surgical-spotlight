import { Link } from "react-router-dom";
import { Target } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Target className="h-5 w-5 text-gold-foreground" />
              </div>
              <span className="text-xl font-bold">Surgical.AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Platforma de vizibilitate AI pentru afaceri din Romania
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold mb-3 text-sm">Produs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/analyze"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Analizeaza
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contact@surgical.ai"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Confidentialitate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Termeni
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gdpr"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Surgical.AI. Toate drepturile rezervate.
          </p>
          <p className="text-sm text-muted-foreground">
            Facut in Romania
          </p>
        </div>
      </div>
    </footer>
  );
}
