import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Atmospheric background — radial hero glow from top */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Very faint grid for texture */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Ambient green light blob — behind headline area */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(0,229,160,0.055) 0%, rgba(0,184,212,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-medium text-gold/80 tracking-wide uppercase font-plex">
                Analiză gratuită de vizibilitate AI
              </span>
            </div>

            <h1 className="font-syne text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Afacerea ta este
              <br />
              vizibilă în{" "}
              <span className="text-foreground/40">ChatGPT</span>?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-plex">
              Află în 5 minute dacă AI-ul te recomandă clienților tăi.
              Testăm 50 de întrebări reale și îți arătăm exact unde stai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/analyze">
                Analizează-ți Afacerea
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <a href="#how-it-works">
                Cum funcționează
              </a>
            </Button>
          </motion.div>

          {/* ChatGPT Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20"
          >
            <div className="relative max-w-3xl mx-auto">
              {/* Outer glow */}
              <div
                className="absolute -inset-8 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(0,229,160,0.06) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Browser chrome — matching ChatGPT's actual dark UI */}
              <div className="rounded-t-xl border border-white/8 bg-[#212121] px-4 py-3 flex items-center gap-3">
                {/* Traffic lights */}
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                {/* URL bar */}
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#2F2F2F] rounded-lg px-4 py-1.5 flex items-center gap-2 min-w-[200px]">
                    <div className="w-3 h-3 rounded-sm bg-[#10A37F] flex-shrink-0" />
                    <span className="text-xs text-[#8E8EA0] font-mono">chatgpt.com</span>
                    <div className="w-2 h-2 rounded-full border border-[#8E8EA0]/40 ml-auto flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* Chat content — dark ChatGPT-like background */}
              <div className="rounded-b-xl border border-t-0 border-white/8 bg-[#212121] p-6 space-y-5">
                {/* User message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="bg-[#2F2F2F] rounded-2xl rounded-br-md px-4 py-2.5 max-w-sm">
                    <p className="text-sm text-[#ECECEC]">
                      Recomandă-mi cel mai bun restaurant italian din Brașov
                    </p>
                  </div>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                  className="flex justify-start items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-[#10A37F] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <div className="flex gap-1 px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E8EA0] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E8EA0] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E8EA0] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>

                {/* AI response */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.4 }}
                  className="flex justify-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-[#10A37F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#ECECEC]/70 leading-relaxed mb-3">
                      În Brașov există câteva restaurante italiene foarte apreciate.
                      Iată câteva recomandări:
                    </p>
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.1, duration: 0.3 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="text-sm font-medium text-[#ECECEC]">1.</span>
                        <div>
                          <span className="text-sm font-semibold text-[#ECECEC]">La Famiglia</span>
                          <span className="text-sm text-[#8E8EA0]"> — restaurant de familie cu specific italian...</span>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.3, duration: 0.3 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="text-sm font-medium text-[#ECECEC]">2.</span>
                        <div>
                          <span className="text-sm font-semibold text-[#ECECEC]">Trattoria del Centro</span>
                          <span className="text-sm text-[#8E8EA0]"> — paste proaspete, specific regional...</span>
                        </div>
                      </motion.div>
                      {/* Third item — YOUR spot */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.6, duration: 0.4 }}
                        className="flex items-start gap-2.5 relative"
                      >
                        <span className="text-sm font-medium text-[#ECECEC]">3.</span>
                        <div
                          className="flex-1 rounded-lg px-3 py-2 -mx-1 border transition-all"
                          style={{
                            background: "rgba(0,229,160,0.06)",
                            borderColor: "rgba(0,229,160,0.3)",
                            animation: "pulse-border 2.5s ease-in-out infinite",
                          }}
                        >
                          <span className="text-sm text-[#ECECEC]/40 italic">Afacerea ta ar putea fi aici...</span>
                          <span className="inline-block ml-2 text-xs px-2 py-0.5 rounded border border-gold/30 text-gold/70 font-plex">
                            ?
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom glow reflection */}
              <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(0,229,160,0.25); background: rgba(0,229,160,0.04); }
          50% { border-color: rgba(0,229,160,0.45); background: rgba(0,229,160,0.09); }
        }
      `}</style>
    </section>
  );
}
