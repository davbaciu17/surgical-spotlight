import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

    const { request_id, status, surgical_score, grade, queries } = body;

    // Validate request_id
    if (!request_id || typeof request_id !== "string" || request_id.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid request_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify request_id exists
    const { data: existingScan } = await supabase
      .from("scan_runs")
      .select("id")
      .eq("request_id", request_id)
      .single();

    if (!existingScan) {
      return new Response(JSON.stringify({ error: "Unknown request_id" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Received callback for request_id:", request_id, "status:", status);

    const FAILURE_STATUSES = ["failed", "error", "stopped", "cancelled"];
    const isFailed = FAILURE_STATUSES.includes(status?.toLowerCase?.());
    const finalStatus = isFailed ? "failed" : (status ?? "completed");

    const updatePayload: Record<string, unknown> = {
      status: finalStatus,
      updated_at: new Date().toISOString(),
    };

    if (!isFailed) {
      // Validate surgical_score range
      const score = typeof surgical_score === "number" ? Math.min(100, Math.max(0, surgical_score)) : null;
      updatePayload.surgical_score = score;

      // Validate grade
      const validGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
      updatePayload.grade = (typeof grade === "string" && validGrades.includes(grade)) ? grade : null;
    }

    const { error: updateError } = await supabase
      .from("scan_runs")
      .update(updatePayload)
      .eq("request_id", request_id);

    if (updateError) {
      console.error("Error updating scan_runs for request_id:", request_id);
      return new Response(JSON.stringify({ error: "Update failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert queries if provided (with validation)
    if (Array.isArray(queries) && queries.length > 0) {
      const maxQueries = 50;
      const limitedQueries = queries.slice(0, maxQueries);

      const rows = limitedQueries.map((q: Record<string, unknown>, i: number) => ({
        request_id,
        query_number: typeof q.query_number === "number" ? q.query_number : i + 1,
        query_type: typeof q.query_type === "string" ? q.query_type.slice(0, 100) : "service_search",
        query_text: typeof q.query_text === "string" ? q.query_text.slice(0, 2000) : "",
        mentions_business: typeof q.mentions_business === "string" ? q.mentions_business.slice(0, 50) : "none",
        sentiment: typeof q.sentiment === "string" ? q.sentiment.slice(0, 50) : null,
        position_rank: typeof q.position_rank === "number" ? Math.max(0, q.position_rank) : 0,
        surgical_score_contribution: typeof q.surgical_score_contribution === "number"
          ? Math.min(100, Math.max(0, q.surgical_score_contribution)) : 0,
      }));

      const { error: queriesError } = await supabase
        .from("surgical_queries")
        .upsert(rows, { onConflict: "request_id,query_number" });

      if (queriesError) {
        console.warn("Could not insert queries for request_id:", request_id);
      }
    }

    console.log("Scan", request_id, "updated to status:", finalStatus);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error in receive-scan-results");
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
