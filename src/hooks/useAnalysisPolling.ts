import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useScanResults } from "./useScanResults";

export type ScanStatus =
  | "pending"
  | "generating"
  | "testing"
  | "completed"
  | "failed";

export interface ScanRunData {
  id: string;
  request_id: string;
  status: ScanStatus;
  business_name: string;
  surgical_score: number | null;
  grade: string | null;
  created_at: string;
}

function mapDbStatus(dbStatus: string): ScanStatus {
  switch (dbStatus) {
    case "pending":
      return "pending";
    case "running":
    case "generating_queries":
      return "generating";
    case "testing":
      return "testing";
    case "completed":
      return "completed";
    case "failed":
      return "failed";
    default:
      return "pending";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export function useAnalysisPolling(requestId: string | undefined) {
  const queryClient = useQueryClient();

  // Poll scan_runs by request_id
  const statusQuery = useQuery({
    queryKey: ["analysis-status", requestId],
    queryFn: async () => {
      const { data, error } = await db
        .from("scan_runs")
        .select(
          "id, request_id, status, business_name, surgical_score, grade, created_at"
        )
        .eq("request_id", requestId!)
        .single();
      if (error) throw error;

      let status = mapDbStatus(data.status ?? "pending");

      // Timeout after 10 minutes
      const TIMEOUT_MS = 10 * 60 * 1000;
      const inProgress = status !== "completed" && status !== "failed";
      if (inProgress) {
        const age = Date.now() - new Date(data.created_at).getTime();
        if (age > TIMEOUT_MS) {
          status = "failed";
        }
      }

      return {
        ...data,
        business_name: data.business_name ?? "Analiza",
        status,
      } as ScanRunData;
    },
    enabled: !!requestId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "completed" || status === "failed") return false;
      return 5_000; // Poll every 5s while in progress
    },
  });

  // Supabase Realtime for instant updates
  useEffect(() => {
    if (!requestId) return;
    const scanId = statusQuery.data?.id;
    if (!scanId) return;

    const channel = supabase
      .channel(`analysis-${scanId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "scan_runs",
          filter: `id=eq.${scanId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["analysis-status", requestId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId, statusQuery.data?.id, queryClient]);

  const isCompleted = statusQuery.data?.status === "completed";
  const isFailed = statusQuery.data?.status === "failed";

  // Fetch results only when scan is completed
  const { results, queries, isLoading: resultsLoading } = useScanResults(
    isCompleted ? requestId : undefined
  );

  return {
    scan: statusQuery.data,
    results,
    queries,
    isLoading: statusQuery.isLoading,
    isResultsLoading: resultsLoading && isCompleted,
    isWaiting: !isCompleted && !isFailed,
    isCompleted,
    isFailed,
  };
}
