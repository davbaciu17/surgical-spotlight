import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const N8N_WEBHOOK_URL = (Deno.env.get("VITE_N8N_WEBHOOK_URL") || "https://cnick.app.n8n.cloud/webhook/surgical-aeo-analysis-v3").replace("/webhook-test/", "/webhook/");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;
    const body = await req.json();

    // Input validation
    const { business_name, niche, website, target_market, ideal_client, competition } = body;

    if (!business_name || typeof business_name !== "string" || business_name.trim().length === 0) {
      return new Response(JSON.stringify({ error: "business_name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sanitize = (val: unknown, maxLen: number): string | null => {
      if (val == null) return null;
      if (typeof val !== "string") return null;
      return val.slice(0, maxLen).trim() || null;
    };

    const validatedData = {
      business_name: business_name.slice(0, 200).trim(),
      niche: sanitize(niche, 500),
      website: sanitize(website, 500),
      target_market: sanitize(target_market, 1000),
      ideal_client: sanitize(ideal_client, 1000),
      competition: sanitize(competition, 1000),
    };

    // Create scan record
    const requestId = `scan-${userId.slice(0, 8)}-${Date.now()}`;
    const { data: scan, error: insertError } = await supabase
      .from("scan_runs")
      .insert({
        user_id: userId,
        request_id: requestId,
        ...validatedData,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError) {
      return new Response(JSON.stringify({ error: "Failed to create scan" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Call n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_id: requestId,
        user_id: userId,
        ...validatedData,
        callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/receive-scan-results`,
      }),
    });

    if (!n8nResponse.ok) {
      await supabase.from("scan_runs").update({ status: "failed" }).eq("id", scan.id);
      return new Response(
        JSON.stringify({ error: "Scan workflow failed to start" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Scan triggered successfully:", requestId);

    return new Response(
      JSON.stringify({ scanId: scan.id, requestId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error in trigger-scan");
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
