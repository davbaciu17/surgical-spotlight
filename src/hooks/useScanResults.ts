import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useScanResults(requestId: string | undefined) {
  const resultsQuery = useQuery({
    queryKey: ["scan-results", requestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("surgical_results")
        .select("*")
        .eq("request_id", requestId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!requestId,
  });

  const queriesQuery = useQuery({
    queryKey: ["scan-queries", requestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("surgical_queries")
        .select(
          "query_number, category, query_text, mentions_business, sentiment, position_rank, surgical_score_contribution"
        )
        .eq("request_id", requestId!)
        .order("query_number");
      if (error) throw error;
      return data;
    },
    enabled: !!requestId,
  });

  return {
    results: resultsQuery.data,
    queries: queriesQuery.data ?? [],
    isLoading: resultsQuery.isLoading || queriesQuery.isLoading,
    error: resultsQuery.error || queriesQuery.error,
  };
}
