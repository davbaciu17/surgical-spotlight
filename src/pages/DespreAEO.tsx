import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, EyeOff, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatBlock } from "@/components/ui/StatBlock";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const problems = [
  {
    icon: TrendingUp,
    title: "40% din căutări folosesc acum AI",
    description:
      "ChatGPT, Perplexity și Google AI Overview sunt noile motoare de căutare. Clienții tăi le folosesc deja — și iau decizii de cumpărare pe baza răspunsurilor primite.",
  },
  {
    icon: EyeOff,
    title: "Instrumentele SEO clasice nu văd asta",
    description:
      "Ahrefs, SEMrush și alte tool-uri SEO nu îți arată dacă AI-ul te recomandă. Surgical.AI umple acest gol — primul instrument dedicat vizibilității în AI pentru piața românească.",
  },
  {
    icon: Users,
    title: "Competiția ta ar putea fi recomandată în locul tău",
    description:
      "Când cineva întreabă ChatGPT care este cel mai bun serviciu din România, apare numele tău? Dacă nu ești prezent în răspunsuri, ești invizibil pentru o categorie importantă de clienți.",
  },
];

const faqs = [
  {
    question: "Ce este AEO/GEO și de ce contează?",
    answer:
      "AEO (Answer Engine Optimization) și GEO (Generative Engine Optimization) reprezintă optimizarea prezenței brandului tău în răspunsurile generate de inteligența artificială — ChatGPT, Perplexity, Google AI Overview, Gemini etc. Pe măsură ce tot mai mulți utilizatori folosesc AI pentru căutări, este esențial ca afacerea ta să apară în aceste răspunsuri.",
  },
  {
    question: "Cum funcționează scanarea?",
    answer:
      "Surgical.AI trimite interogări reale către platformele AI, exact așa cum ar face un potențial client din România. De exemplu, întrebăm care este cel mai bun serviciu din orașul tău și analizăm dacă brandul tău apare în răspuns, cu ce sentiment și în ce context.",
  },
  {
    question: "De ce doar pentru România?",
    answer:
      "Ne concentrăm pe piața românească pentru a oferi rezultate ultra-relevante. Toate interogările sunt în limba română, cu referințe la orașe și regiuni din România. Astfel, rezultatele reflectă exact ce văd clienții tăi reali.",
  },
  {
    question: "Cât de precisă este analiza?",
    answer:
      "Folosim API-urile oficiale ale platformelor AI pentru a obține răspunsuri reale. Analiza de mențiuni are o acuratețe de peste 90%. Totuși, răspunsurile AI pot varia — de aceea recomandăm scanări periodice.",
  },
  {
    question: "Ce pot face dacă nu sunt menționat?",
    answer:
      "Surgical.AI generează recomandări personalizate: optimizarea structurii conținutului, adăugarea de schema markup, crearea de FAQ-uri, îmbunătățirea prezenței pe surse autoritare. Fiecare recomandare vine cu pași concreți.",
  },
  {
    question: "Pot testa gratuit?",
    answer:
      "Da! Planul gratuit include 3 scanări pe lună pentru o companie, fără a fi necesar un card de credit. Poți vedea exact ce oferă Surgical.AI înainte de a face upgrade.",
  },
  {
    question: "Cum se calculează Surgical Score™?",
    answer:
      "Scorul de la 0 la 100 este calculat din 4 dimensiuni ponderate: Rata de Menționare (50%) — ce % din cele 50 de interogări au menționat afacerea ta; Poziție (20%) — locul median când ești menționat (1st=100pts, 2nd=89pts etc.); Sentiment (15%) — Pozitiv=1pt, Neutru=0.5pt, Negativ=0pt; Competiție (15%) — menționările tale vs. competitorul principal. Note: Poziția și Sentimentul sunt scalate de un factor de confidență = min(1, totalMentioned / 5), deci cu cât ești menționat mai des, cu atât scorul e mai precis. Grade: A>=75, B>=55, C>=35, D>=15, F<15.",
  },
  {
    question: "Funcționează pentru orice industrie?",
    answer:
      "Da. Surgical.AI este relevant pentru orice afacere care dorește să fie vizibilă online: restaurante, clinici medicale, agenții, firme de IT, magazine online, consultanți și multe altele. Interogările sunt personalizate pe industria ta.",
  },
];

function ArticleSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-16 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function DespreAEO() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero — article title */}
        <div className="relative overflow-hidden bg-section-dots py-20 border-b border-white/[0.05]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,229,160,0.035) 0%, transparent 70%)",
            }}
          />
          <div className="container mx-auto px-4 relative z-10 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8 font-plex">
              <Link to="/" className="hover:text-foreground transition-colors">
                Acasă
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span>Resurse</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground/60">De ce AEO contează</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-xs font-medium text-gold/80 tracking-wide uppercase font-plex">
                Ghid introductiv
              </span>
            </div>

            <h1 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              De ce AI-ul este{" "}
              <span className="text-gradient-gold">noul Google</span>
              {" "}— și cum îți măsori vizibilitatea
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-plex leading-relaxed max-w-2xl">
              SEO-ul tradițional nu mai este suficient. Descoperă cum funcționează AEO și GEO și
              de ce vizibilitatea în AI devine o prioritate pentru orice afacere din România.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section 1: Stats */}
          <ArticleSection>
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-3">
              AI-ul a schimbat căutarea.{" "}
              <span className="text-gradient-gold">Te-ai adaptat?</span>
            </h2>
            <p className="text-muted-foreground font-plex mb-12 text-lg leading-relaxed">
              SEO-ul tradițional nu mai este suficient. Iată cum arată realitatea căutărilor în 2026:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <StatBlock
                value={40}
                suffix="%"
                label="din căutări trec prin AI"
                description="ChatGPT, Perplexity, Google AI Overview"
                delay={0}
              />
              <StatBlock
                value={33}
                suffix="%"
                label="nu mai deschid Google"
                description="Răspunsul AI înlocuiește căutarea clasică"
                delay={0.1}
              />
              <StatBlock
                value={0}
                suffix="%"
                label="din afaceri își măsoară vizibilitatea AI"
                description="Golul pe care Surgical îl umple"
                delay={0.2}
              />
            </div>
            <p className="text-center text-base font-semibold text-foreground/60 font-plex mt-8">
              Competitorii tăi sunt recomandați de AI.{" "}
              <span className="text-foreground">Tu?</span>
            </p>
          </ArticleSection>

          <div className="h-px bg-white/[0.05]" />

          {/* Section 2: What is AEO/GEO */}
          <ArticleSection>
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-6">
              Ce este AEO și GEO?
            </h2>
            <div className="prose-like space-y-4 font-plex text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">AEO — Answer Engine Optimization</strong> este
                practica de a optimiza prezența unui brand pentru a apărea în răspunsurile generate
                de motoarele de răspuns (ChatGPT, Perplexity, Google SGE). Spre deosebire de SEO
                tradițional, unde obiectivul este să apari pe pagina 1 Google, în AEO obiectivul
                este să fii menționat direct în răspunsul dat utilizatorului.
              </p>
              <p>
                <strong className="text-foreground">GEO — Generative Engine Optimization</strong>{" "}
                merge un pas mai departe: optimizarea conținutului astfel încât modelele generative
                (LLM-uri) să îl citeze, să îl parafrazeze și să îl includă în răspunsurile generate.
                GEO implică structura conținutului, autoritatea sursei și relevanța contextuală.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div
                  className="glass rounded-xl p-5 border border-white/6"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)" }}
                  >
                    <span className="font-syne font-bold text-gold text-sm">AEO</span>
                  </div>
                  <h3 className="font-syne font-semibold text-foreground mb-2">Answer Engine Optimization</h3>
                  <p className="text-sm text-muted-foreground font-plex">
                    Optimizare pentru a fi menționat în răspunsurile directe ale AI-ului la întrebările
                    utilizatorilor.
                  </p>
                </div>
                <div
                  className="glass rounded-xl p-5 border border-white/6"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,184,212,0.08)", border: "1px solid rgba(0,184,212,0.2)" }}
                  >
                    <span className="font-syne font-bold text-sm" style={{ color: "#00B8D4" }}>GEO</span>
                  </div>
                  <h3 className="font-syne font-semibold text-foreground mb-2">Generative Engine Optimization</h3>
                  <p className="text-sm text-muted-foreground font-plex">
                    Structurarea conținutului pentru a fi citat și inclus în răspunsurile generate de
                    modelele AI.
                  </p>
                </div>
              </div>

              <p>
                Ambele discipline sunt relativ noi (2023–2024) și reprezintă o frontieră neexplorată
                pentru marea majoritate a afacerilor din România. Cei care acționează acum au un
                avantaj competitiv semnificativ față de cei care vor descoperi această tendință peste
                2-3 ani.
              </p>
            </div>
          </ArticleSection>

          <div className="h-px bg-white/[0.05]" />

          {/* Section 3: Why old tools fail */}
          <ArticleSection>
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-6">
              De ce instrumentele clasice nu ajung
            </h2>
            <p className="text-muted-foreground font-plex mb-10 text-lg leading-relaxed">
              Ahrefs, SEMrush, Google Search Console — toate îți arată clasamentele pe Google. Dar
              nu îți arată nimic despre ce spune ChatGPT despre tine.
            </p>
            <div className="grid grid-cols-1 gap-5">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 border border-border/50 hover:border-[#FF3B5C]/20 transition-all duration-300 flex gap-5"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,59,92,0.08)", border: "1px solid rgba(255,59,92,0.15)" }}
                  >
                    <problem.icon className="h-6 w-6 text-[#FF3B5C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5 font-plex text-foreground">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground font-plex leading-relaxed">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ArticleSection>

          <div className="h-px bg-white/[0.05]" />

          {/* Section 4: How Surgical fills the gap */}
          <ArticleSection>
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-6">
              Cum rezolvă Surgical.AI această problemă
            </h2>
            <div className="space-y-4 font-plex text-muted-foreground leading-relaxed">
              <p>
                Surgical.AI este primul instrument din România dedicat exclusiv măsurării vizibilității
                AI. Spre deosebire de instrumentele SEO existente care monitorizează clasamentele
                Google, Surgical.AI testează direct platformele de inteligență artificială.
              </p>
              <p>
                Procesul este simplu: introduci datele afacerii tale (nume, nișă, oraș, competitori),
                iar Surgical.AI trimite{" "}
                <strong className="text-foreground">50 de interogări reale</strong> către ChatGPT,
                Perplexity și alte platforme AI — exact genul de întrebări pe care le-ar pune clienții
                tăi. Rezultatul este un{" "}
                <strong className="text-foreground">Surgical Score™</strong> de la 0 la 100, cu
                detalii despre:
              </p>
              <ul className="list-none space-y-2 pl-0">
                {[
                  "Rata de Menționare (50%) — din 50 de interogări, câte % au menționat afacerea ta",
                  "Poziție (20%) — poziția medie când ești menționat (1st = 100pts, 2nd = 89pts…)",
                  "Sentiment (15%) — Pozitiv=1pt, Neutru=0.5pt, Negativ=0pt, mediat pe toate mențiunile",
                  "Competiție (15%) — menționările tale vs. menționările competitorului principal (max 100%)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#00E5A0" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Pe baza acestor date, primești recomandări concrete pentru a îmbunătăți vizibilitatea
                AI a afacerii tale — nu sfaturi generice, ci acțiuni specifice pentru nișa și piața ta.
              </p>
            </div>
          </ArticleSection>

          <div className="h-px bg-white/[0.05]" />

          {/* FAQ */}
          <ArticleSection>
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-10">
              Întrebări frecvente
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass rounded-xl border border-border/50 px-6 data-[state=open]:border-gold/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold pr-4 font-plex">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 font-plex leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ArticleSection>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-16 text-center"
          >
            <div
              className="glass rounded-2xl p-10 border border-gold/15"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.04) 0%, rgba(0,184,212,0.02) 100%)",
              }}
            >
              <h2 className="font-syne text-2xl md:text-3xl font-bold mb-3">
                Află cum ești perceput de AI
              </h2>
              <p className="text-muted-foreground font-plex mb-8 max-w-md mx-auto">
                Prima analiză este gratuită. Fără card necesar. Rezultate în 3–5 minute.
              </p>
              <Button variant="gold" size="xl" asChild>
                <Link to="/analyze">
                  Analizează-ți Afacerea Gratuit
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
