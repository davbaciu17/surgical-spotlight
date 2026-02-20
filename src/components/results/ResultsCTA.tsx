import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link2, Check, Mail, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

interface ResultsCTAProps {
  shareUrl: string;
}

export function ResultsCTA({ shareUrl }: ResultsCTAProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass rounded-2xl p-8 text-center"
    >
      <h2 className="text-2xl font-bold mb-2">
        Vrei sa-ti cresti vizibilitatea AI?
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Ajutam afaceri din Romania sa apara in recomandarile ChatGPT.
        Programeaza o consultatie gratuita.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <Button variant="gold" size="lg" asChild>
          <a href="mailto:contact@surgical.ai?subject=Consultatie%20Vizibilitate%20AI">
            <Mail className="h-5 w-5 mr-2" />
            Programeaza Consultatie Gratuita
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/analyze">
            <RotateCcw className="h-5 w-5 mr-2" />
            Analiza Noua
          </Link>
        </Button>
      </div>

      <div className="border-t border-border pt-4">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">Link copiat!</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Distribuie Rezultatele
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
