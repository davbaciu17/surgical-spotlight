import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Lock, Eye, Database, Share2, Clock, Shield, Mail } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-6">
              <Lock className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">Confidențialitate</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Politica de Confidențialitate</h1>
            <p className="text-muted-foreground text-lg">
              Ultima actualizare: 4 Februarie 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Introducere</h2>
              <p className="text-muted-foreground">
                La Surgical.AI, respectăm și protejăm confidențialitatea datelor dvs. personale. Această politică descrie modul în care colectăm, utilizăm și protejăm informațiile dvs. atunci când utilizați platforma noastră.
              </p>
              <p className="text-muted-foreground mt-4">
                Prin utilizarea serviciilor noastre, confirmați că ați citit și înțeles această politică de confidențialitate.
              </p>
            </section>

            {/* Data Collection */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                Ce Date Colectăm
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Informații furnizate direct de dvs.:</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Nume și prenume la crearea contului</li>
                    <li>• Adresa de email pentru autentificare și comunicare</li>
                    <li>• Informații despre compania dvs. (denumire, website, industrie)</li>
                    <li>• Date de plată procesate de furnizorul nostru de plăți</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Informații colectate automat:</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Adresa IP și date despre dispozitiv</li>
                    <li>• Date de utilizare a platformei (pagini vizitate, acțiuni efectuate)</li>
                    <li>• Cookie-uri și tehnologii similare</li>
                    <li>• Date despre performanța și erorile aplicației</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                Cum Utilizăm Datele
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-sm">Furnizarea serviciilor</h3>
                  <p className="text-muted-foreground text-sm">
                    Pentru a vă oferi analizele AI și rapoartele solicitate.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-sm">Comunicare</h3>
                  <p className="text-muted-foreground text-sm">
                    Pentru a vă trimite notificări, actualizări și informații importante.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-sm">Îmbunătățirea serviciilor</h3>
                  <p className="text-muted-foreground text-sm">
                    Pentru a analiza utilizarea și a îmbunătăți platforma.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-sm">Securitate</h3>
                  <p className="text-muted-foreground text-sm">
                    Pentru a detecta și preveni activitățile frauduloase.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Share2 className="h-6 w-6 text-primary" />
                Partajarea Datelor
              </h2>
              <p className="text-muted-foreground mb-4">
                Nu vindem datele dvs. personale. Putem partaja informații doar în următoarele situații:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Furnizori de servicii:</strong> Cu parteneri care ne ajută să operăm platforma (hosting, plăți, email)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Obligații legale:</strong> Când suntem obligați prin lege sau ordin judecătoresc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Cu acordul dvs.:</strong> În orice altă situație, doar cu permisiunea dvs. explicită</span>
                </li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                Păstrarea Datelor
              </h2>
              <p className="text-muted-foreground mb-4">
                Păstrăm datele dvs. personale atât timp cât este necesar pentru scopurile descrise în această politică:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 bg-background/50 rounded-lg p-3">
                  <span className="text-sm font-medium w-32">Date cont:</span>
                  <span className="text-sm text-muted-foreground">Pe durata existenței contului + 30 zile după ștergere</span>
                </div>
                <div className="flex items-center gap-4 bg-background/50 rounded-lg p-3">
                  <span className="text-sm font-medium w-32">Date scanări:</span>
                  <span className="text-sm text-muted-foreground">12 luni de la generare</span>
                </div>
                <div className="flex items-center gap-4 bg-background/50 rounded-lg p-3">
                  <span className="text-sm font-medium w-32">Date facturare:</span>
                  <span className="text-sm text-muted-foreground">10 ani (conform legislației fiscale)</span>
                </div>
                <div className="flex items-center gap-4 bg-background/50 rounded-lg p-3">
                  <span className="text-sm font-medium w-32">Loguri tehnice:</span>
                  <span className="text-sm text-muted-foreground">90 zile</span>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6 text-success" />
                Securitatea Datelor
              </h2>
              <p className="text-muted-foreground mb-4">
                Implementăm măsuri tehnice și organizatorice pentru a proteja datele dvs.:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-muted-foreground">Criptare SSL/TLS în tranzit</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-muted-foreground">Criptare AES-256 la stocare</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-muted-foreground">Autentificare în doi pași</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-muted-foreground">Backup-uri zilnice</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-muted-foreground">Monitorizare continuă</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-muted-foreground">Acces restricționat la date</span>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Cookie-uri</h2>
              <p className="text-muted-foreground mb-4">
                Utilizăm cookie-uri pentru a îmbunătăți experiența dvs. pe platformă:
              </p>
              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-sm">Cookie-uri esențiale</h3>
                  <p className="text-muted-foreground text-sm">Necesare pentru funcționarea platformei (autentificare, securitate)</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-sm">Cookie-uri de performanță</h3>
                  <p className="text-muted-foreground text-sm">Ne ajută să înțelegem cum utilizați platforma</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-sm">Cookie-uri funcționale</h3>
                  <p className="text-muted-foreground text-sm">Memorează preferințele dvs. (limbă, setări)</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                Contact
              </h2>
              <p className="text-muted-foreground mb-4">
                Pentru orice întrebări legate de această politică de confidențialitate sau pentru exercitarea drepturilor dvs., ne puteți contacta:
              </p>
              <div className="bg-background/50 rounded-lg p-4 text-sm">
                <p className="text-muted-foreground">Email: <span className="text-foreground">privacy@surgical.ai</span></p>
                <p className="text-muted-foreground">Adresa: București, România</p>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                Vom răspunde la solicitările dvs. în termen de 30 de zile.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
