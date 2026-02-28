import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";

type ContentPlan = Tables<"content_plans">;
type ContentPiece = Tables<"content_pieces">;

export function useContentPlan() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<ContentPlan | null>(null);
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // Get latest content plan for the user's businesses
      const { data: planData, error: planError } = await supabase
        .from("content_plans")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (planError) throw planError;

      if (planData) {
        setPlan(planData);
        setIsGenerating(planData.status === "generating");

        // Fetch pieces for this plan
        const { data: piecesData, error: piecesError } = await supabase
          .from("content_pieces")
          .select("*")
          .eq("plan_id", planData.id)
          .order("day_number", { ascending: true });

        if (piecesError) throw piecesError;
        setPieces(piecesData || []);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  // Poll while generating
  useEffect(() => {
    if (!isGenerating || !plan) return;
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from("content_plans")
        .select("status")
        .eq("id", plan.id)
        .single();

      if (data && data.status !== "generating") {
        setIsGenerating(false);
        fetchPlan();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isGenerating, plan, fetchPlan]);

  const generatePlan = useCallback(
    async (businessId: string, scanRunId: string) => {
      setIsGenerating(true);
      setError(null);
      try {
        const webhookUrl = import.meta.env.VITE_N8N_CONTENT_PLAN_WEBHOOK_URL;
        if (!webhookUrl) throw new Error("Content plan webhook URL not configured");

        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;

        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ business_id: businessId, scan_run_id: scanRunId }),
        });

        if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);

        // Start polling for the plan
        setTimeout(fetchPlan, 3000);
      } catch (e: any) {
        setError(e.message);
        setIsGenerating(false);
      }
    },
    [fetchPlan]
  );

  const markPublished = useCallback(
    async (pieceId: string, url: string) => {
      const { error: updateError } = await supabase
        .from("content_pieces")
        .update({
          status: "published",
          published_url: url,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", pieceId);

      if (updateError) throw updateError;

      // Update local state
      setPieces((prev) =>
        prev.map((p) =>
          p.id === pieceId
            ? { ...p, status: "published", published_url: url, published_at: new Date().toISOString() }
            : p
        )
      );

      // Update published count on plan
      if (plan) {
        const newCount = (plan.posts_published || 0) + 1;
        await supabase
          .from("content_plans")
          .update({ posts_published: newCount, updated_at: new Date().toISOString() })
          .eq("id", plan.id);
        setPlan((prev) => (prev ? { ...prev, posts_published: newCount } : prev));
      }
    },
    [plan]
  );

  const publishedCount = pieces.filter((p) => p.status === "published").length;
  const faqPiece = pieces.find((p) => p.content_type === "faq_page");
  const articlePieces = pieces.filter((p) => p.content_type !== "faq_page");

  return {
    plan,
    pieces,
    articlePieces,
    faqPiece,
    isLoading,
    isGenerating,
    error,
    generatePlan,
    markPublished,
    publishedCount,
    refetch: fetchPlan,
  };
}
