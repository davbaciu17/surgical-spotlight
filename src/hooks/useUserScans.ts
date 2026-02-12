import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ScanStatus } from "./useScanStatus";

// Map DB statuses to UI statuses
function mapDbStatus(dbStatus: string | null): ScanStatus {
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

export interface UserScan {
  id: string;
  request_id: string;
  business_name: string;
  status: ScanStatus;
  surgical_score: number | null;
  grade: string | null;
  created_at: string;
}

export function useUserScans(userId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user-scans", userId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("scan_runs")
        .select(
          "id, request_id, business_name, status, surgical_score, grade, created_at"
        )
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((row) => ({
        ...row,
        business_name: row.business_name ?? "Scanare",
        status: mapDbStatus(row.status),
      })) as UserScan[];
    },
    enabled: !!userId,
  });

  // Subscribe to changes for live dashboard updates
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`user-scans-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scan_runs",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["user-scans", userId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return {
    scans: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
