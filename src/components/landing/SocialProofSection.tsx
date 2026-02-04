import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const companies = [
  "Tech Solutions", "Digital Agency", "E-commerce Pro", "Clinica Plus",
  "Restaurant Chain", "Legal Firm", "Travel Agency", "Auto Service",
  "Fitness Club", "Beauty Salon", "Consulting Group", "IT Services"
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);
  
  return <span ref={ref}>{count}{suffix}</span>;
}

export function SocialProofSection() {
  return (
    <section className="py-12 bg-card/50 border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground mb-2">
            Folosit de afaceri din toată România
          </p>
          <p className="text-2xl font-bold">
            <span className="text-gradient-gold"><Counter target={200} suffix="+" /></span>{" "}
            de branduri românești își monitorizează vizibilitatea AI
          </p>
        </motion.div>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card/50 to-transparent z-10" />
          
          <motion.div 
            className="flex gap-8 py-4"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-6 py-3 glass rounded-lg border border-border/50 text-muted-foreground/60 font-medium whitespace-nowrap hover:text-muted-foreground hover:border-primary/30 transition-colors"
              >
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
