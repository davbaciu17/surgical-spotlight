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
  updated_at: string;
}

export function useScanStatus(scanId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["scan-status", scanId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("surgical_scans")
        .select(
          "id, request_id, status, business_name, surgical_score, grade, created_at, updated_at"
        )
        .eq("id", scanId!)
        .single();
      if (error) throw error;
      return data as ScanStatusData;
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
          table: "surgical_scans",
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
