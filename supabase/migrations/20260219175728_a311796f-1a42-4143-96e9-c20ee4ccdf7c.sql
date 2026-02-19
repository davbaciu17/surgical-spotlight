
-- Create surgical_queries table for storing per-query AI results
CREATE TABLE IF NOT EXISTS public.surgical_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT NOT NULL,
  query_number INTEGER NOT NULL,
  query_type TEXT NOT NULL DEFAULT 'service_search',
  query_text TEXT NOT NULL DEFAULT '',
  mentions_business TEXT NOT NULL DEFAULT 'none',
  sentiment TEXT,
  position_rank INTEGER NOT NULL DEFAULT 0,
  surgical_score_contribution NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (request_id, query_number)
);

-- RLS for surgical_queries: users can read their own via join with scan_runs
ALTER TABLE public.surgical_queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own scan queries"
  ON public.surgical_queries
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.scan_runs
      WHERE scan_runs.request_id = surgical_queries.request_id
        AND scan_runs.user_id = auth.uid()
    )
  );

-- Service role can insert/update (used by the callback edge function)
CREATE POLICY "Service role can manage surgical_queries"
  ON public.surgical_queries
  FOR ALL
  USING (true)
  WITH CHECK (true);
