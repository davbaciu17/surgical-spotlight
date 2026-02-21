import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Ce este AEO/GEO și de ce contează?",
    answer: "AEO (Answer Engine Optimization) și GEO (Generative Engine Optimization) reprezintă optimizarea prezenței brandului tău în răspunsurile generate de inteligența artificială - ChatGPT, Perplexity, Google AI Overview, Gemini etc. Pe măsură ce tot mai mulți utilizatori folosesc AI pentru căutări, este esențial ca afacerea ta să apară în aceste răspunsuri."
  },
  {
    question: "Cum funcționează scanarea?",
    answer: "Surgical.AI trimite interogări reale către platformele AI, exact așa cum ar face un potențial client din România. De exemplu, întrebăm 'care este cel mai bun [serviciu] din [orașul tău]?' și analizăm dacă brandul tău apare în răspuns, cu ce sentiment și în ce context."
  },
  {
    question: "De ce doar pentru România?",
    answer: "Ne concentrăm pe piața românească pentru a oferi rezultate ultra-relevante. Toate interogările sunt în limba română, cu referințe la orașe și regiuni din România. Astfel, rezultatele reflectă exact ce văd clienții tăi reali."
  },
  {
    question: "Cât de precisă este analiza?",
    answer: "Folosim API-urile oficiale ale platformelor AI pentru a obține răspunsuri reale. Analiza de mențiuni are o acuratețe de peste 90%. Totuși, răspunsurile AI pot varia - de aceea recomandăm scanări periodice."
  },
  {
    question: "Ce pot face dacă nu sunt menționat?",
    answer: "Surgical.AI generează recomandări personalizate: optimizarea structurii conținutului, adăugarea de schema markup, crearea de FAQ-uri, îmbunătățirea prezenței pe surse autoritare. Fiecare recomandare vine cu pași concreți."
  },
  {
    question: "Pot testa gratuit?",
    answer: "Da! Planul gratuit include 3 scanări pe lună pentru o companie, fără a fi necesar un card de credit. Poți vedea exact ce oferă Surgical.AI înainte de a face upgrade."
  },
  {
    question: "Cum se calculează Surgical Score™?",
    answer: "Scorul de la 0 la 100 ia în considerare: prezența brandului pe fiecare platformă (40%), sentimentul mențiunilor (20%), acuratețea informațiilor (20%), proeminența în răspuns (10%) și consistența cross-platform (10%)."
  },
  {
    question: "Funcționează pentru orice industrie?",
    answer: "Da. Surgical.AI este relevant pentru orice afacere care dorește să fie vizibilă online: restaurante, clinici medicale, agenții, firme de IT, magazine online, consultanți și multe altele. Interogările sunt personalizate pe industria ta."
  },
  {
    question: "Cum plătesc?",
    answer: "Acceptăm plăți cu cardul în lei (RON) prin Stripe. Factura este emisă automat. Poți anula oricând din setări."
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 relative bg-section-minimal">
      {/* Faint white scalpel top */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Întrebări <span className="text-gradient-gold">Frecvente</span>
          </h2>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass rounded-xl border border-border/50 px-6 data-[state=open]:border-gold/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
