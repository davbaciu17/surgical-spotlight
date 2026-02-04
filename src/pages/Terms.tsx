import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Scale, AlertTriangle, CreditCard, Ban, RefreshCw } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Scale className="h-5 w-5 text-gold" />
              <span className="text-sm font-medium text-gold">Document Legal</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Termeni și Condiții</h1>
            <p className="text-muted-foreground text-lg">
              Ultima actualizare: 4 Februarie 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                1. Dispoziții Generale
              </h2>
              <p className="text-muted-foreground">
                Acești Termeni și Condiții guvernează utilizarea platformei Surgical.AI, operată de Surgical.AI S.R.L., o societate înregistrată în România. Prin accesarea sau utilizarea serviciilor noastre, sunteți de acord cu acești termeni în integralitatea lor.
              </p>
              <p className="text-muted-foreground mt-4">
                Dacă nu sunteți de acord cu oricare dintre aceste prevederi, vă rugăm să nu utilizați platforma noastră.
              </p>
            </section>

            {/* Services */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">2. Descrierea Serviciilor</h2>
              <p className="text-muted-foreground mb-4">
                Surgical.AI oferă o platformă de analiză a vizibilității AI care include:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Scanarea și analiza prezenței brandurilor în răspunsurile AI
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Rapoarte detaliate despre vizibilitatea AI
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Recomandări pentru optimizarea prezenței în motoarele AI
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Monitorizarea continuă a performanței
                </li>
              </ul>
            </section>

            {/* Account */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">3. Contul de Utilizator</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">3.1 Înregistrare:</strong> Pentru a utiliza serviciile noastre, trebuie să vă creați un cont furnizând informații corecte și complete.
                </p>
                <p>
                  <strong className="text-foreground">3.2 Securitate:</strong> Sunteți responsabil pentru menținerea confidențialității datelor de autentificare și pentru toate activitățile desfășurate din contul dvs.
                </p>
                <p>
                  <strong className="text-foreground">3.3 Un singur cont:</strong> Fiecare utilizator poate deține un singur cont. Crearea de conturi multiple poate duce la suspendarea accesului.
                </p>
              </div>
            </section>

            {/* Payments */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-primary" />
                4. Plăți și Abonamente
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">4.1 Planuri:</strong> Oferim planuri gratuite și cu plată. Detaliile sunt disponibile pe pagina de prețuri.
                </p>
                <p>
                  <strong className="text-foreground">4.2 Facturare:</strong> Abonamentele sunt facturate lunar sau anual, în avans. Toate prețurile sunt exprimate în EUR și includ TVA unde este aplicabil.
                </p>
                <p>
                  <strong className="text-foreground">4.3 Rambursări:</strong> Oferim garanție de rambursare în primele 14 zile pentru abonamentele anuale, conform legislației române.
                </p>
              </div>
            </section>

            {/* Restrictions */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Ban className="h-6 w-6 text-error" />
                5. Restricții de Utilizare
              </h2>
              <p className="text-muted-foreground mb-4">
                Nu este permisă utilizarea platformei pentru:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-error mt-1">✕</span>
                  Activități ilegale sau frauduloase
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error mt-1">✕</span>
                  Încercări de a accesa neautorizat sistemele noastre
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error mt-1">✕</span>
                  Revânzarea sau redistribuirea serviciilor fără acord scris
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error mt-1">✕</span>
                  Automatizarea accesului fără permisiune explicită
                </li>
              </ul>
            </section>

            {/* Liability */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-warning" />
                6. Limitarea Răspunderii
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Serviciile sunt furnizate "așa cum sunt". Nu garantăm rezultate specifice din utilizarea platformei noastre.
                </p>
                <p>
                  În măsura permisă de lege, răspunderea noastră totală nu va depăși suma plătită de dvs. în ultimele 12 luni.
                </p>
                <p>
                  Nu suntem răspunzători pentru pierderi indirecte, incidentale sau consecutive.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-primary" />
                7. Modificări ale Termenilor
              </h2>
              <p className="text-muted-foreground">
                Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi comunicate prin email și/sau prin afișare pe platformă cu cel puțin 30 de zile înainte de intrarea în vigoare. Continuarea utilizării serviciilor după această perioadă constituie acceptarea noilor termeni.
              </p>
            </section>

            {/* Jurisdiction */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">8. Jurisdicție și Legislație Aplicabilă</h2>
              <p className="text-muted-foreground">
                Acești termeni sunt guvernați de legislația română. Orice dispută va fi soluționată de instanțele competente din București, România, cu excepția cazurilor în care legislația UE privind protecția consumatorilor prevede altfel.
              </p>
            </section>

            {/* Contact */}
            <section className="glass-strong rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
              <p className="text-muted-foreground mb-4">
                Pentru întrebări legate de acești termeni, ne puteți contacta la:
              </p>
              <div className="bg-background/50 rounded-lg p-4 text-sm">
                <p className="text-muted-foreground">Email: <span className="text-foreground">legal@surgical.ai</span></p>
                <p className="text-muted-foreground">Adresa: București, România</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
