import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface Feature {
  text: string;
  included: boolean;
}

const plans = [
  {
    id: "diagnostic",
    name: "Diagnostic",
    subtitle: "Vezi unde stai.",
    price: "0",
    currency: "lei/lună",
    ctaText: "Începe Diagnostic",
    ctaSubtext: "Nu necesită card",
    ctaLink: "/signup",
    popular: false,
    features: [
      { text: "1 scanare (o singură dată)", included: true },
      { text: "1 companie", included: true },
      { text: "Scor Chirurgical complet", included: true },
      { text: "Sumar rezultate + grade", included: true },
      { text: "Plan de implementare AEO", included: false },
      { text: "Raport detaliat per interogare", included: false },
      { text: "Analiză competitori", included: false },
    ] as Feature[],
  },
  {
    id: "tratament",
    name: "Tratament",
    subtitle: "Scor + plan de acțiune concret.",
    price: "199",
    originalPrice: "399",
    currency: "lei/lună",
    eurPrice: "~€40/lună",
    ctaText: "Alege Tratament",
    ctaSubtext: "Anulezi oricând",
    ctaLink: "/signup",
    popular: true,
    badge: "Cel mai popular",
    features: [
      { text: "5 scanări pe lună", included: true },
      { text: "Până la 3 companii", included: true },
      { text: "Scor Chirurgical complet", included: true },
      { text: "Raport detaliat cu 50 de interogări", included: true },
      { text: "Analiză competitori completă", included: true },
      { text: "Plan implementare AEO personalizat", included: true },
      { text: "Recomandări de conținut", included: true },
      { text: "Rapoarte PDF exportabile", included: true },
      { text: "Istoric scanări", included: true },
      { text: "Suport prioritar", included: true },
    ] as Feature[],
  },
  {
    id: "chirurg",
    name: "Chirurg",
    subtitle: "Noi operăm. Tu crești.",
    price: "499",
    currency: "lei/lună",
    eurPrice: "~€100/lună",
    ctaText: "Contactează-ne",
    ctaSubtext: "Facturare în lei",
    ctaLink: "/contact",
    popular: false,
    features: [
      { text: "Scanări nelimitate", included: true },
      { text: "Companii nelimitate", included: true },
      { text: "Tot din Tratament", included: true },
      { text: "Implementare automată AEO", included: true },
      { text: "Plan conținut lunar generat auto", included: true },
      { text: "Monitorizare continuă cu alerte", included: true },
      { text: "Rapoarte white-label", included: true },
      { text: "Acces API", included: true },
      { text: "Manager dedicat", included: true },
    ] as Feature[],
  },
];

// Comparison table data — booleans render ✓/— , strings render as-is
type CellValue = boolean | string;
const tableRows: { label: string; values: CellValue[] }[] = [
  { label: "Scanări/lună", values: ["1 (o dată)", "5", "Nelimitate"] },
  { label: "Companii", values: ["1", "3", "Nelimitate"] },
  { label: "Scor Chirurgical", values: [true, true, true] },
  { label: "Raport detaliat (50 interogări)", values: [false, true, true] },
  { label: "Analiză competitori", values: [false, true, true] },
  { label: "Plan implementare AEO", values: [false, true, true] },
  { label: "Recomandări conținut", values: [false, true, true] },
  { label: "Rapoarte PDF", values: [false, true, true] },
  { label: "Istoric scanări", values: [false, true, true] },
  { label: "Implementare automată AEO", values: [false, false, true] },
  { label: "Plan conținut lunar auto", values: [false, false, true] },
  { label: "Monitorizare + alerte", values: [false, false, true] },
  { label: "Rapoarte white-label", values: [false, false, true] },
  { label: "Acces API", values: [false, false, true] },
  { label: "Manager dedicat", values: [false, false, true] },
  { label: "Suport", values: ["Standard", "Prioritar", "Dedicat"] },
];

function TableCell({ value, colIdx }: { value: CellValue; colIdx: number }) {
  const isHighlighted = colIdx === 1; // Tratament column

  if (typeof value === "boolean") {
    return (
      <td className="py-2.5 px-4 text-center" style={isHighlighted ? { background: "rgba(0,229,160,0.03)" } : {}}>
        {value ? (
          <Check className="h-4 w-4 mx-auto" style={{ color: "#00E5A0" }} />
        ) : (
          <span className="text-muted-foreground/40 font-mono text-sm">—</span>
        )}
      </td>
    );
  }

  return (
    <td
      className="py-2.5 px-4 text-center text-sm font-plex"
      style={{
        color: isHighlighted ? "#00E5A0" : "rgba(255,255,255,0.55)",
        background: isHighlighted ? "rgba(0,229,160,0.03)" : undefined,
      }}
    >
      {value}
    </td>
  );
}

export function PricingSection() {
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-section-commercial scalpel-top">
      {/* Large decorative circle — bottom decoration */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.012)",
          filter: "blur(40px)",
        }}
      />
      {/* Green gradient sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,229,160,0.02) 0%, transparent 70%)",
        }}
      />
      {/* Top scalpel */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.15), transparent)" }} />
      {/* Bottom scalpel */}
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.07), transparent)" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Alege planul <span className="text-gradient-gold">potrivit</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-plex">
            Începe gratuit. Fără card necesar.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isTratament = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col rounded-2xl ${
                  isTratament ? "md:-my-4" : ""
                }`}
                style={{
                  background: isTratament ? "#1A1A1E" : "rgba(14,14,16,0.98)",
                  border: isTratament
                    ? "1px solid rgba(0,229,160,0.22)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isTratament
                    ? "0 0 40px rgba(0,229,160,0.07), 0 8px 32px rgba(0,0,0,0.5)"
                    : "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="text-xs font-bold px-4 py-1 rounded-full font-plex whitespace-nowrap"
                      style={{
                        background: "#00E5A0",
                        color: "#080808",
                        boxShadow: "0 2px 12px rgba(0,229,160,0.35)",
                      }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col flex-1 p-7 ${isTratament ? "md:px-8 md:py-10" : ""}`}>
                  {/* Plan name + subtitle */}
                  <div className="mb-6">
                    <h3 className="font-syne text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm font-plex" style={{ color: "#6B6B75" }}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      {plan.originalPrice && (
                        <span className="text-base line-through" style={{ color: "#6B6B75" }}>
                          {plan.originalPrice}
                        </span>
                      )}
                      <span
                        className="font-syne text-5xl font-bold"
                        style={{ color: isTratament ? "#00E5A0" : "#F5F5F7" }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-sm font-plex" style={{ color: "#6B6B75" }}>
                        {plan.currency}
                      </span>
                    </div>
                    {plan.eurPrice && (
                      <p className="text-xs mt-1 font-plex" style={{ color: "#6B6B75" }}>
                        {plan.eurPrice}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check
                            className="h-4 w-4 flex-shrink-0 mt-0.5"
                            style={{ color: isTratament ? "#00E5A0" : "#6B6B75" }}
                          />
                        ) : (
                          <X
                            className="h-4 w-4 flex-shrink-0 mt-0.5"
                            style={{ color: "rgba(255,59,92,0.45)" }}
                          />
                        )}
                        <span
                          className="text-sm font-plex leading-snug"
                          style={{
                            color: feature.included
                              ? (isTratament ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)")
                              : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div>
                    <Button
                      variant={isTratament ? "gold" : "outline"}
                      size="lg"
                      className="w-full font-plex"
                      asChild
                    >
                      <Link to={plan.ctaLink}>
                        {isTratament && <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />}
                        {plan.ctaText}
                      </Link>
                    </Button>
                    <p className="text-xs text-center mt-3 font-plex" style={{ color: "#6B6B75" }}>
                      {plan.ctaSubtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Toggle button */}
        <div className="max-w-5xl mx-auto mt-10 text-center">
          <button
            onClick={() => setTableOpen(!tableOpen)}
            className="inline-flex items-center gap-2 text-sm font-plex text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>{tableOpen ? "Ascunde comparația" : "Vezi comparația detaliată"}</span>
            <motion.span
              animate={{ rotate: tableOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
        </div>

        {/* Comparison table — collapsible */}
        <AnimatePresence>
          {tableOpen && (
            <motion.div
              className="max-w-5xl mx-auto mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ background: "#1A1A1E" }}>
                      <th className="py-3 px-4 text-left text-xs font-semibold font-plex text-muted-foreground w-[40%]">
                        Funcționalitate
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.id}
                          className="py-3 px-4 text-center text-xs font-bold font-syne"
                          style={{
                            color: plan.popular ? "#00E5A0" : "rgba(255,255,255,0.6)",
                            background: plan.popular ? "rgba(0,229,160,0.06)" : undefined,
                          }}
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, ri) => (
                      <tr
                        key={ri}
                        style={{
                          background: ri % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                          borderTop: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <td className="py-2.5 px-4 text-sm font-plex" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {row.label}
                        </td>
                        {row.values.map((val, ci) => (
                          <TableCell key={ci} value={val} colIdx={ci} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked comparison */}
              <div className="md:hidden space-y-3">
                {tableRows.map((row, ri) => (
                  <div
                    key={ri}
                    className="rounded-lg p-3"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <p className="text-xs font-plex font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {row.label}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {plans.map((plan, ci) => {
                        const val = row.values[ci];
                        return (
                          <div key={plan.id} className="text-center">
                            <p className="text-[10px] font-syne font-bold mb-1" style={{ color: plan.popular ? "#00E5A0" : "rgba(255,255,255,0.4)" }}>
                              {plan.name}
                            </p>
                            {typeof val === "boolean" ? (
                              val ? (
                                <Check className="h-3.5 w-3.5 mx-auto" style={{ color: "#00E5A0" }} />
                              ) : (
                                <span className="text-muted-foreground/40 font-mono text-xs">—</span>
                              )
                            ) : (
                              <span className="text-xs font-plex" style={{ color: plan.popular ? "#00E5A0" : "rgba(255,255,255,0.55)" }}>
                                {val}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
