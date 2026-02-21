import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export type ScanStatus = "pending" | "generating" | "testing" | "completed" | "failed" | "timeout";

export interface ScanRunData {
  id: string;
  request_id: string;
  status: ScanStatus;
  business_name: string;
  surgical_score: number | null;
  grade: string | null;
  created_at: string;
}

const TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export function useAnalysisPolling(requestId: string | undefined) {
  const [timedOut, setTimedOut] = useState(false);

  // 1) Fetch scan_runs row for metadata (business_name, created_at)
  const scanQuery = useQuery({
    queryKey: ["analysis-scan", requestId],
    queryFn: async () => {
      const { data, error } = await db
        .from("scan_runs")
        .select("id, request_id, status, business_name, surgical_score, grade, created_at")
        .eq("request_id", requestId!)
        .maybeSingle();
      if (error) throw error;
      return data as ScanRunData | null;
    },
    enabled: !!requestId,
  });

  // 2) Poll surgical_results every 5s until data appears
  const resultsQuery = useQuery({
    queryKey: ["scan-results-poll", requestId],
    queryFn: async () => {
      const { data, error } = await db
        .from("surgical_results")
        .select("id, request_id, business_name, surgical_score, grade, category_breakdown, top_competitors, total_mentioned, total_recommended")
        .eq("request_id", requestId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!requestId && !timedOut,
    refetchInterval: (query) => {
      if (query.state.data) return false; // stop polling once we have results
      return 5_000;
    },
  });

  // 3) Fetch surgical_queries once results exist
  const queriesQuery = useQuery({
    queryKey: ["scan-queries", requestId],
    queryFn: async () => {
      const { data, error } = await db
        .from("surgical_queries")
        .select("query_number, query_type, query_text, llm_response, mentions_business, sentiment, position_rank, surgical_score_contribution")
        .eq("request_id", requestId!)
        .order("query_number");
      if (error) throw error;
      return data;
    },
    enabled: !!requestId && !!resultsQuery.data,
  });

  // Timeout logic
  useEffect(() => {
    if (!requestId || resultsQuery.data) return;

    const createdAt = scanQuery.data?.created_at;
    if (!createdAt) return;

    const age = Date.now() - new Date(createdAt).getTime();
    if (age > TIMEOUT_MS) {
      setTimedOut(true);
      return;
    }

    const remaining = TIMEOUT_MS - age;
    const timer = setTimeout(() => setTimedOut(true), remaining);
    return () => clearTimeout(timer);
  }, [requestId, scanQuery.data?.created_at, resultsQuery.data]);

  const hasResults = !!resultsQuery.data;
  const isCompleted = hasResults;
  const isFailed = scanQuery.data?.status === "failed";

  return {
    scan: scanQuery.data,
    results: resultsQuery.data,
    queries: queriesQuery.data ?? [],
    isLoading: scanQuery.isLoading,
    isWaiting: !hasResults && !timedOut && !isFailed,
    isCompleted,
    isFailed,
    isTimedOut: timedOut && !hasResults,
    requestId,
  };
}
