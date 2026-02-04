import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// AI Platform logos data - only 4 platforms for atom-style orbit
const aiPlatforms = [
  { 
    name: "ChatGPT", 
    color: "#10A37F",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4006-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    )
  },
  { 
    name: "Gemini", 
    color: "#4285F4",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.638 0 8.4 3.762 8.4 8.4 0 4.638-3.762 8.4-8.4 8.4-4.638 0-8.4-3.762-8.4-8.4 0-4.638 3.762-8.4 8.4-8.4zm0 2.4a6 6 0 100 12 6 6 0 000-12z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  { 
    name: "Claude", 
    color: "#D97706",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  { 
    name: "Perplexity", 
    color: "#20B8CD",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    )
  },
];

function OrbitingLogos() {
  const radius = 120;
  const orbitDuration = 4; // seconds for one full orbit
  const [logoIndices, setLogoIndices] = useState([0, 2]); // Start with ChatGPT and Claude
  
  // Shuffle to next logo when particle goes behind
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndices(prev => {
        const nextIndices = [...prev];
        // Alternate which particle changes
        const particleToChange = Math.random() > 0.5 ? 0 : 1;
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * aiPlatforms.length);
        } while (newIndex === prev[0] || newIndex === prev[1]);
        nextIndices[particleToChange] = newIndex;
        return nextIndices;
      });
    }, orbitDuration * 500); // Change halfway through orbit (when behind)
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center" style={{ perspective: '800px' }}>
      {/* Background glow */}
      <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-48 h-48 bg-gold/10 rounded-full blur-2xl" />
      
      {/* Orbit path indicator */}
      <div 
        className="absolute border border-primary/10 rounded-full"
        style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}
      />
      
      {/* Orbiting particles - 2 electrons */}
      {[0, 1].map((particleIndex) => {
        const platform = aiPlatforms[logoIndices[particleIndex]];
        const startAngle = particleIndex * 180; // Opposite sides
        
        return (
          <motion.div
            key={particleIndex}
            className="absolute"
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateY: [startAngle, startAngle + 360],
            }}
            transition={{
              duration: orbitDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              style={{
                transform: `translateZ(${radius}px)`,
              }}
            >
              <motion.div
                className="glass-strong rounded-xl p-3 md:p-4 border border-primary/30 shadow-lg"
                style={{
                  boxShadow: `0 0 20px ${platform.color}30, 0 0 40px ${platform.color}15`
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${platform.color}15`,
                    color: platform.color,
                  }}
                >
                  {platform.icon}
                </div>
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
