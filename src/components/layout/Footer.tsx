import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-section-footer border-t border-white/[0.04] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground/20 bg-foreground/5">
                <span className="text-xs font-bold">S</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Surgical.AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Platforma de vizibilitate AI pentru afaceri din Romania
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-medium mb-3 text-sm text-foreground/70">Produs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
                    Analizeaza
                  </Link>
                </li>
                <li>
                  <a href="mailto:contact@surgical.ai" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm text-foreground/70">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Confidentialitate</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Termeni</Link></li>
                <li><Link to="/gdpr" className="text-muted-foreground hover:text-foreground transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/60">&copy; 2026 Surgical.AI</p>
          <p className="text-sm text-muted-foreground/60">Facut in Romania</p>
        </div>
      </div>
    </footer>
  );
}
