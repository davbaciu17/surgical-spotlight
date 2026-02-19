import { supabase } from "@/integrations/supabase/client";

export interface ScanRequest {
  business_name: string;
  niche: string;
  website: string;
  target_market: string;
  ideal_client: string;
  competition: string;
}

export async function createScan(userId: string, data: ScanRequest): Promise<{ scanId: string; requestId: string }> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;

  if (!token) {
    throw new Error("Nu ești autentificat");
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const response = await fetch(`${supabaseUrl}/functions/v1/trigger-scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
