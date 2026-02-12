import { supabase } from "@/integrations/supabase/client";

interface ScanRequest {
  business_name: string;
  niche: string;
  website: string;
  target_market: string;
  ideal_client: string;
  competition: string;
}

export async function createScan(
  userId: string,
  data: ScanRequest
): Promise<{ scanId: string; requestId: string }> {
  const requestId = `scan-${userId.slice(0, 8)}-${Date.now()}`;

  // Step 1: Insert scan record into surgical_scans
  const { data: scan, error: insertError } = await supabase
    .from("surgical_scans")
    .insert({
      user_id: userId,
      request_id: requestId,
      business_name: data.business_name,
      niche: data.niche,
      website: data.website,
      target_market: data.target_market,
      ideal_client: data.ideal_client,
      competition: data.competition,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertError) {
    throw new Error(`Eroare la crearea scanării: ${insertError.message}`);
  }

  // Step 2: Call n8n webhook
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Webhook URL nu este configurat");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      request_id: requestId,
      user_id: userId,
      business_name: data.business_name,
      niche: data.niche,
      website: data.website,
      target_market: data.target_market,
      ideal_client: data.ideal_client,
      competition: data.competition,
      callback_url: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/surgical_scans?request_id=eq.${requestId}`,
    }),
  });

  if (!response.ok) {
    // Mark scan as failed
    await supabase
      .from("surgical_scans")
      .update({ status: "failed" })
      .eq("id", scan.id);
    throw new Error(`Eroare la trimiterea către n8n: ${response.status}`);
  }

  return { scanId: scan.id, requestId };
}
