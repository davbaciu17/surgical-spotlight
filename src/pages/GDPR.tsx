import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, UserCheck, Mail } from "lucide-react";

export default function GDPR() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Conformitate GDPR</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Regulamentul General privind Protecția Datelor</h1>
            <p className="text-muted-foreground text-lg">
              Ultima actualizare: 4 Februarie 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-12">
            {/* Introduction */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Introducere
              </h2>
              <p className="text-muted-foreground">
                Surgical.AI S.R.L. („noi", „compania noastră") respectă Regulamentul (UE) 2016/679 al Parlamentului European și al Consiliului din 27 aprilie 2016 privind protecția persoanelor fizice în ceea ce privește prelucrarea datelor cu caracter personal și privind libera circulație a acestor date (GDPR), precum și legislația română în domeniu, inclusiv Legea nr. 190/2018.
              </p>
              <p className="text-muted-foreground mt-4">
                Acest document explică modul în care colectăm, utilizăm, stocăm și protejăm datele dvs. personale în conformitate cu cerințele GDPR.
              </p>
            </section>

            {/* Data Controller */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-primary" />
                Operator de Date
              </h2>
              <p className="text-muted-foreground mb-4">
                Operatorul de date cu caracter personal este:
              </p>
              <div className="bg-background/50 rounded-lg p-4 text-sm">
                <p className="font-semibold">Surgical.AI S.R.L.</p>
                <p className="text-muted-foreground">Adresa: București, România</p>
                <p className="text-muted-foreground">Email: privacy@surgical.ai</p>
                <p className="text-muted-foreground">CUI: RO12345678</p>
              </div>
            </section>

            {/* Types of Data */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                Categorii de Date Colectate
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Date de identificare</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Nume și prenume</li>
                    <li>• Adresă de email</li>
                    <li>• Număr de telefon (opțional)</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Date tehnice</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Adresa IP</li>
                    <li>• Tipul browserului</li>
                    <li>• Date de conectare</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Date despre companie</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Denumirea companiei</li>
                    <li>• Domeniul de activitate</li>
                    <li>• Website-ul companiei</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Date de utilizare</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Istoricul scanărilor</li>
                    <li>• Preferințe de utilizare</li>
                    <li>• Rapoarte generate</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                Temeiurile Legale ale Prelucrării
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold">Consimțământul (Art. 6(1)(a) GDPR)</h3>
                  <p className="text-sm text-muted-foreground">Pentru comunicări de marketing și newsletter.</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold">Executarea contractului (Art. 6(1)(b) GDPR)</h3>
                  <p className="text-sm text-muted-foreground">Pentru furnizarea serviciilor noastre de analiză AI.</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold">Obligații legale (Art. 6(1)(c) GDPR)</h3>
                  <p className="text-sm text-muted-foreground">Pentru conformitatea cu legislația fiscală și contabilă.</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold">Interes legitim (Art. 6(1)(f) GDPR)</h3>
                  <p className="text-sm text-muted-foreground">Pentru îmbunătățirea serviciilor și securitatea platformei.</p>
                </div>
              </div>
            </section>

            {/* Rights */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Drepturile Dvs. conform GDPR</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dreptul de acces</h3>
                    <p className="text-sm text-muted-foreground">Puteți solicita o copie a datelor dvs. personale.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dreptul la rectificare</h3>
                    <p className="text-sm text-muted-foreground">Puteți corecta datele inexacte sau incomplete.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dreptul la ștergere</h3>
                    <p className="text-sm text-muted-foreground">Puteți solicita ștergerea datelor ("dreptul de a fi uitat").</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dreptul la restricționare</h3>
                    <p className="text-sm text-muted-foreground">Puteți limita prelucrarea datelor în anumite situații.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dreptul la portabilitate</h3>
                    <p className="text-sm text-muted-foreground">Puteți primi datele într-un format structurat, utilizat în mod curent.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dreptul de opoziție</h3>
                    <p className="text-sm text-muted-foreground">Vă puteți opune prelucrării în anumite circumstanțe.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                Contact și Reclamații
              </h2>
              <p className="text-muted-foreground mb-4">
                Pentru exercitarea drepturilor dvs. sau pentru orice întrebări legate de prelucrarea datelor personale, ne puteți contacta la:
              </p>
              <div className="bg-background/50 rounded-lg p-4 text-sm mb-4">
                <p className="text-muted-foreground">Email: <span className="text-foreground">privacy@surgical.ai</span></p>
              </div>
              <p className="text-muted-foreground">
                De asemenea, aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) - <a href="https://www.dataprotection.ro" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
