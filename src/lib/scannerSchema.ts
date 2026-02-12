import { z } from "zod";

export const scannerFormSchema = z.object({
  business_name: z
    .string()
    .min(2, "Numele companiei trebuie să aibă cel puțin 2 caractere"),
  website: z
    .string()
    .url("Introdu un URL valid (ex: https://exemplu.ro)"),
  niche: z
    .string()
    .min(3, "Descrie nișa afacerii tale"),
  target_market: z
    .string()
    .min(3, "Descrie piața țintă"),
  ideal_client: z
    .string()
    .min(3, "Descrie clientul ideal"),
  competition: z
    .string()
    .min(3, "Enumeră competitorii principali"),
});

export type ScannerFormValues = z.infer<typeof scannerFormSchema>;
