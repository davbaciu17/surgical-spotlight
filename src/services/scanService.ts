import { supabase } from "@/integrations/supabase/client";

export interface ScanRequest {
  business_name: string;
  niche: string;
  website: string;
  target_market: string;
  ideal_client: string;
  competition: string;
}

export async function createScan(data: ScanRequest): Promise<{ scanId: string; requestId: string }> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hyavwkytezwjipyeggzf.supabase.co";
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YXZ3a3l0ZXp3amlweWVnZ3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDc1MDgsImV4cCI6MjA4NTc4MzUwOH0.jgv0Ys_o5Y40BGS_uLdZQ93rJh7VzZuYOgp1lml0I4Q";

  // Include auth token if user is logged in (optional)
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: anonKey,
  };

  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData?.session?.access_token) {
    headers.Authorization = `Bearer ${sessionData.session.access_token}`;
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/trigger-scan`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      business_name: data.business_name,
      niche: data.niche,
      website: data.website,
      target_market: data.target_market,
      ideal_client: data.ideal_client,
      competition: data.competition,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Eroare la scanare: ${response.status}`);
  }

  const result = await response.json();
  return { scanId: result.scanId, requestId: result.requestId };
}
