import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ScanStatus =
  | "pending"
  | "generating"
  | "testing"
  | "scoring"
  | "completed"
  | "failed";

export interface ScanStatusData {
  id: string;
  request_id: string;
  status: ScanStatus;
  business_name: string;
  surgical_score: number | null;
  grade: string | null;
  created_at: string;
}

// Map DB statuses to UI statuses
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

export function useScanStatus(scanId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["scan-status", scanId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scan_runs")
        .select(
          "id, request_id, status, business_name, surgical_score, grade, created_at"
        )
        .eq("id", scanId!)
        .single();
      if (error) throw error;
      return {
        ...data,
        business_name: data.business_name ?? "Scanare",
        status: mapDbStatus(data.status ?? "pending"),
      } as ScanStatusData;
    },
    enabled: !!scanId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "completed" || status === "failed") return false;
      return 15_000; // Poll every 15s while in progress
    },
  });

  // Supabase Realtime subscription for instant updates
  useEffect(() => {
    if (!scanId) return;

    const channel = supabase
      .channel(`scan-${scanId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "scan_runs",
          filter: `id=eq.${scanId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["scan-status", scanId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [scanId, queryClient]);

  return {
    scan: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isInProgress:
      query.data?.status !== "completed" && query.data?.status !== "failed",
  };
}
