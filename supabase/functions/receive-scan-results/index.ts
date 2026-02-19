import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    console.log("Received n8n callback:", JSON.stringify(body));

    const {
      request_id,
      status,
      surgical_score,
      grade,
      queries, // array of query objects
    } = body;

    if (!request_id) {
      return new Response(JSON.stringify({ error: "Missing request_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Accept "failed", "error", or "stopped" from n8n as a failure signal
    const FAILURE_STATUSES = ["failed", "error", "stopped", "cancelled"];
    const isFailed = FAILURE_STATUSES.includes(status?.toLowerCase?.());
    const finalStatus = isFailed ? "failed" : (status ?? "completed");

    // Update scan_runs
    const updatePayload: Record<string, unknown> = {
      status: finalStatus,
      updated_at: new Date().toISOString(),
    };

    // Only set score/grade if not a failure
    if (!isFailed) {
      updatePayload.surgical_score = surgical_score ?? null;
      updatePayload.grade = grade ?? null;
    }

    const { error: updateError } = await supabase
      .from("scan_runs")
      .update(updatePayload)
      .eq("request_id", request_id);

    if (updateError) {
      console.error("Error updating scan_runs:", updateError);
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert queries if provided
    if (Array.isArray(queries) && queries.length > 0) {
      // Try to insert into surgical_queries (table created by n8n or pre-existing)
      const rows = queries.map((q: any, i: number) => ({
        request_id,
        query_number: q.query_number ?? i + 1,
        query_type: q.query_type ?? "service_search",
        query_text: q.query_text ?? "",
        mentions_business: q.mentions_business ?? "none",
        sentiment: q.sentiment ?? null,
        position_rank: q.position_rank ?? 0,
        surgical_score_contribution: q.surgical_score_contribution ?? 0,
      }));

      const { error: queriesError } = await supabase
        .from("surgical_queries")
        .upsert(rows, { onConflict: "request_id,query_number" });

      if (queriesError) {
        console.warn("Could not insert surgical_queries:", queriesError.message);
        // Non-fatal — the main score is already saved
      }
    }

    console.log(`Scan ${request_id} updated to status=${finalStatus}, score=${surgical_score}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
