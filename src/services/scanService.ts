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
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  // Include auth token if user is logged in (optional)
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: anonKey,
  };

  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData?.session?.access_token) {
    headers.Authorization = `Bearer ${sessionData.session.access_token}`;
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/start-scan`, {
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
