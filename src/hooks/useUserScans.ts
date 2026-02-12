import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ScanStatus } from "./useScanStatus";

export interface UserScan {
  id: string;
  request_id: string;
  business_name: string;
  status: ScanStatus;
  surgical_score: number | null;
  grade: string | null;
  created_at: string;
  updated_at: string;
}

export function useUserScans(userId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user-scans", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("surgical_scans")
        .select(
          "id, request_id, business_name, status, surgical_score, grade, created_at, updated_at"
        )
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as UserScan[];
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
          table: "surgical_scans",
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
