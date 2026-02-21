export interface LLMItem {
  name: string;
  detail: string;
}

export interface LLMConfig {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  titleBarBg: string;
  urlBarBg: string;
  urlText: string;
  subtitle: string;
  userMessage: string;
  intro: string;
  items: LLMItem[];
  responseStyle: "numbered" | "emoji" | "bullet";
  emojiMarkers?: string[];
  sourceNote?: string;
}

export const llms: LLMConfig[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    color: "#10A37F",
    bgColor: "#212121",
    titleBarBg: "#2D2D2D",
    urlBarBg: "#3F3F3F",
    urlText: "chatgpt.com",
    subtitle:
      "Află în 5 minute dacă AI-ul te recomandă clienților tăi. Testăm 50 de întrebări reale și îți arătăm exact unde stai.",
    userMessage: "Recomandă-mi cel mai bun restaurant italian din Brașov",
    intro:
      "În Brașov există câteva restaurante italiene foarte apreciate. Iată câteva recomandări:",
    items: [
      { name: "La Famiglia", detail: "restaurant de familie cu specific italian autentic" },
      { name: "Trattoria del Centro", detail: "paste proaspete, specific regional toscan" },
    ],
    responseStyle: "numbered",
  },
  {
    id: "gemini",
    name: "Gemini",
    color: "#4285F4",
    bgColor: "#1E1F20",
    titleBarBg: "#2A2B2E",
    urlBarBg: "#3A3B3E",
    urlText: "gemini.google.com",
    subtitle:
      "Verifică dacă Google AI te include în recomandările sale. Testăm 50 de căutări reale din piața ta.",
    userMessage: "Care sunt cele mai bune servicii de curățenie din Cluj-Napoca?",
    intro:
      "Am găsit câteva opțiuni populare pentru servicii de curățenie în Cluj-Napoca:",
    items: [
      { name: "CleanPro Cluj", detail: "rating 4.8 ⭐, peste 200 recenzii verificate" },
      { name: "Fresh Home Services", detail: "prețuri de la 150 RON/ședință, disponibilitate imediată" },
    ],
    responseStyle: "emoji",
    emojiMarkers: ["🏠", "✨"],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    color: "#20B8CD",
    bgColor: "#191A1A",
    titleBarBg: "#252626",
    urlBarBg: "#333434",
    urlText: "perplexity.ai",
    subtitle:
      "Vezi dacă motorul de cercetare AI te menționează. Analizăm 50 de interogări din industria ta.",
    userMessage: "Cine oferă cele mai bune cursuri de yoga în Timișoara?",
    intro:
      "Conform mai multor surse, iată studiourile de yoga cele mai apreciate din Timișoara:",
    items: [
      { name: "Yoga Studio Timișoara", detail: "specializat în Hatha și Vinyasa [sursa1]" },
      { name: "ZenFlow Center", detail: "clase pentru începători și avansați [sursa2]" },
    ],
    responseStyle: "numbered",
    sourceNote: "Surse: Google Reviews, Facebook, yoga-romania.ro",
  },
  {
    id: "claude",
    name: "Claude",
    color: "#D97757",
    bgColor: "#2B2A27",
    titleBarBg: "#363530",
    urlBarBg: "#444240",
    urlText: "claude.ai",
    subtitle:
      "Descoperă dacă AI-ul Anthropic cunoaște afacerea ta. Scanăm 50 de întrebări reale din nișa ta.",
    userMessage: "Recomandă-mi un electrician de încredere în București, sector 3",
    intro:
      "Pentru servicii de electrician în București, sector 3, am câteva recomandări:",
    items: [
      { name: "ElectroFix București", detail: "disponibilitate 24/7, lucrări certificate ANRE" },
      { name: "Volt Expert", detail: "specializat în instalații rezidențiale, recenzii excelente" },
    ],
    responseStyle: "bullet",
  },
];
