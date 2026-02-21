import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, ChevronDown, AlertTriangle, CheckCircle2 } from "lucide-react";
import { isMentioned } from "@/lib/constants";

interface Query {
  query_number: number;
  query_type: string;
  query_text: string;
  llm_response: string | null;
  mentions_business: string | null | boolean;
  sentiment: string | null;
  position_rank: number | null;
}

interface ExampleResponsesProps {
  queries: Query[];
  businessName: string;
}

function ResponseBubble({
  query,
  businessName,
}: {
  query: Query;
  businessName: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const mentioned = isMentioned(query.mentions_business);
  const response = query.llm_response || "";
  const truncated = response.length > 300;
  const displayText = expanded ? response : response.slice(0, 300);

  // Highlight business name and common competitor patterns
  const highlightText = (text: string) => {
    if (!text) return null;
    const regex = new RegExp(`(${escapeRegex(businessName)})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-foreground/15 text-foreground rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        mentioned
          ? "border-foreground/20 bg-foreground/5"
          : "border-border bg-background/50"
      }`}
    >
      {/* Status badge */}
      <div className="flex items-center gap-2 mb-3">
        {mentioned ? (
          <div className="flex items-center gap-1.5 text-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-medium">
              Mentionat{query.position_rank ? ` pe pozitia #${query.position_rank}` : ""}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-foreground/40">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">
              Nu apari in acest raspuns
            </span>
          </div>
        )}
      </div>

      {/* Query */}
      <div className="flex items-start gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xs">?</span>
        </div>
        <p className="text-sm font-medium">{query.query_text}</p>
      </div>

      {/* AI Response */}
      {response && (
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {highlightText(displayText)}
              {truncated && !expanded && "..."}
            </p>
            {truncated && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
              >
                {expanded ? "Arata mai putin" : "Arata mai mult"}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function ExampleResponses({
  queries,
  businessName,
}: ExampleResponsesProps) {
  const queriesWithResponse = queries.filter((q) => q.llm_response);
  if (queriesWithResponse.length === 0) return null;

  // Pick 2 NOT mentioned + 2 mentioned
  const notMentioned = queriesWithResponse
    .filter((q) => !isMentioned(q.mentions_business))
    .slice(0, 2);
  const mentioned = queriesWithResponse
    .filter((q) => isMentioned(q.mentions_business))
    .slice(0, 2);

  const examples = [...notMentioned, ...mentioned];
  if (examples.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      <h2 className="text-xl font-bold mb-2">Exemple de Raspunsuri AI</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Asa raspunde ChatGPT cand clientii tai pun intrebari relevante
      </p>
      <div className="space-y-4">
        {examples.map((q) => (
          <ResponseBubble
            key={q.query_number}
            query={q}
            businessName={businessName}
          />
        ))}
      </div>
    </motion.div>
  );
}
