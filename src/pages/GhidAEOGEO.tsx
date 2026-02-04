import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Brain, Search, Sparkles, Target, TrendingUp, Zap, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function GhidAEOGEO() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <BookOpen className="h-5 w-5 text-gold" />
              <span className="text-sm font-medium text-gold">Ghid Complet</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ghid AEO/GEO pentru{" "}
              <span className="text-gradient-gold">Vizibilitate AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Învață cum să optimizezi prezența brandului tău în răspunsurile generate de ChatGPT, Gemini, Perplexity și alte motoare AI.
            </p>
          </motion.div>
        </section>

        {/* What is AEO/GEO */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="glass-strong rounded-2xl p-8 border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Ce este AEO?</h2>
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Answer Engine Optimization</strong> (AEO) este practica de optimizare a conținutului pentru a fi citat și recomandat de motoarele de răspunsuri AI.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Focalizare pe răspunsuri directe la întrebări
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Structurare clară a informațiilor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Autoritate și credibilitate în domeniu
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="glass-strong rounded-2xl p-8 border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-gold" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Ce este GEO?</h2>
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Generative Engine Optimization</strong> (GEO) se referă la optimizarea pentru motoarele generative care creează răspunsuri noi bazate pe multiple surse.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  Prezență în baze de date de antrenament
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  Menționări consistente în surse credibile
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  Asocieri pozitive cu termeni cheie
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <motion.div 
            className="glass-strong rounded-2xl p-8 md:p-12 border-2 border-primary/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">De Ce Contează AEO/GEO?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-gold mb-2">40%</div>
                <p className="text-muted-foreground text-sm">
                  din căutările online vor fi conversaționale până în 2027
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-gold mb-2">3x</div>
                <p className="text-muted-foreground text-sm">
                  mai mult încredere în recomandările AI față de reclame
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-gold mb-2">80%</div>
                <p className="text-muted-foreground text-sm">
                  din utilizatori acceptă prima recomandare AI
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Strategies */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Strategii de Optimizare</h2>
          <div className="space-y-6">
            <motion.div 
              className="glass-strong rounded-2xl p-6 border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">1. Definește-ți Entitatea Clară</h3>
                  <p className="text-muted-foreground">
                    Asigură-te că brandul tău are o prezență online consistentă și clară. Folosește Schema.org markup, menține profiluri actualizate pe directoare și asigură-te că informațiile despre companie sunt identice peste tot.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="glass-strong rounded-2xl p-6 border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">2. Creează Conținut de Autoritate</h3>
                  <p className="text-muted-foreground">
                    Publică conținut detaliat, bine documentat și unic. AI-ul preferă surse care demonstrează expertiză. Include statistici, studii de caz și informații practice care pot fi citate.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="glass-strong rounded-2xl p-6 border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">3. Construiește Menționări și Recenzii</h3>
                  <p className="text-muted-foreground">
                    AI-ul învață din milioane de surse. Cu cât ești menționat mai des în contexte pozitive, cu atât ești mai probabil să fii recomandat. Încurajează recenzii, participă la interviuri și colaborează cu publicații din industrie.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="glass-strong rounded-2xl p-6 border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">4. Monitorizează și Adaptează</h3>
                  <p className="text-muted-foreground">
                    Folosește instrumente precum Surgical.AI pentru a urmări cum te percepe AI-ul. Răspunsurile se schimbă în timp, iar monitorizarea constantă îți permite să reacționezi rapid la orice problemă.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platforms */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Platforme AI Principale</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-strong rounded-2xl p-6 border border-border/50 text-center">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">ChatGPT</h3>
              <p className="text-sm text-muted-foreground">
                Cel mai utilizat asistent AI, folosit pentru recomandări de produse și servicii.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-6 border border-border/50 text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-bold mb-2">Gemini</h3>
              <p className="text-sm text-muted-foreground">
                Integrat în ecosistemul Google, influențează recomandările din Search.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-6 border border-border/50 text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">Perplexity</h3>
              <p className="text-sm text-muted-foreground">
                Motor de căutare AI cu răspunsuri bazate pe surse actualizate.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            className="glass-strong rounded-3xl p-8 md:p-12 border-2 border-gold/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Verifică-ți Vizibilitatea AI Acum
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Folosește Surgical.AI pentru a afla cum te percepe AI-ul și ce poți face pentru a-ți îmbunătăți prezența.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/signup">
                <Sparkles className="h-5 w-5 mr-2" />
                Începe Scanarea Gratuită
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
