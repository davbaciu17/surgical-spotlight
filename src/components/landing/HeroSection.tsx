import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// AI Platform logos data
const aiPlatforms = [
  { name: "ChatGPT", color: "#10A37F" },
  { name: "Gemini", color: "#4285F4" },
  { name: "Claude", color: "#D97706" },
  { name: "Perplexity", color: "#20B8CD" },
  { name: "Copilot", color: "#00BCF2" },
  { name: "Google AI", color: "#EA4335" },
];

function OrbitingLogos() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute w-48 h-48 bg-gold/10 rounded-full blur-2xl" />
      
      {/* Orbiting logos */}
      {aiPlatforms.map((platform, index) => {
        const angle = (index * 360) / aiPlatforms.length;
        const radius = 140;
        
        return (
          <motion.div
            key={platform.name}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.1 },
              scale: { duration: 0.5, delay: index * 0.1 },
              rotate: { 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear",
              }
            }}
            style={{
              transformOrigin: `0px ${radius}px`,
            }}
          >
            <motion.div
              className="glass-strong rounded-xl p-3 md:p-4 border border-primary/30 shadow-lg shadow-primary/10"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px)`,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold text-xs md:text-sm"
                style={{ 
                  backgroundColor: `${platform.color}20`,
                  color: platform.color,
                  boxShadow: `0 0 20px ${platform.color}30`
                }}
                animate={{
                  rotate: [-angle, -angle], // Counter-rotate to keep text upright
                }}
              >
                {platform.name.substring(0, 2)}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Central Score Circle */}
      <motion.div 
        className="relative z-10 w-32 h-32 md:w-40 md:h-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold-muted/20 rounded-full blur-xl" />
        <div className="relative glass-strong rounded-full w-full h-full flex flex-col items-center justify-center border-2 border-gold/50">
          <motion.span 
            className="text-4xl md:text-5xl font-bold font-mono text-gradient-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            87
          </motion.span>
          <span className="text-xs md:text-sm text-muted-foreground mt-1">Surgical Score™</span>
        </div>
        
        {/* Connecting lines animation */}
        <svg className="absolute inset-0 w-full h-full -z-10" style={{ transform: 'scale(3)' }}>
          {aiPlatforms.map((_, index) => {
            const angle = (index * 360 / aiPlatforms.length) * (Math.PI / 180);
            const x2 = 50 + Math.cos(angle - Math.PI/2) * 35;
            const y2 = 50 + Math.sin(angle - Math.PI/2) * 35;
            
            return (
              <motion.line
                key={index}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
              />
            );
          })}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--gold))" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Side - Text Content */}
          <motion.div 
            className="space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold/30 shadow-lg shadow-gold/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-lg">🇷🇴</span>
              <span className="text-sm font-medium">Prima platformă AEO/GEO din România</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Afacerea ta este vizibilă{" "}
              <span className="text-gradient-gold">în AI?</span>
            </motion.h1>

            {/* English subtitle */}
            <motion.p 
              className="text-lg text-muted-foreground italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Is AI recommending your business to Romanian customers?
            </motion.p>

            {/* Description */}
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Descoperă dacă ChatGPT, Perplexity, Gemini și Google AI recomandă brandul tău pentru căutările din România. Primește un scor de vizibilitate și recomandări precise.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="gold" size="xl" className="group" asChild>
                <Link to="/signup">
                  <Sparkles className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Analizează-ți Brandul - Gratuit
                </Link>
              </Button>
              <Button variant="hero" size="xl">
                Vezi cum funcționează
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="flex items-center gap-1">
                <span className="text-success">✓</span> Nu necesită card
              </span>
              <span className="flex items-center gap-1">
                <span className="text-success">✓</span> 3 scanări gratuite/lună
              </span>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:block"
          >
            <OrbitingLogos />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
