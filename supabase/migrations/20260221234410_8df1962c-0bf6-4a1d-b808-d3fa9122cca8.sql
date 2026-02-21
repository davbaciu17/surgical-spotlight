
-- Create surgical_results table for storing analysis results
CREATE TABLE public.surgical_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT NOT NULL,
  business_name TEXT DEFAULT '',
  surgical_score NUMERIC DEFAULT 0,
  grade TEXT,
  category_breakdown JSONB,
  top_competitors JSONB,
  total_mentioned INTEGER DEFAULT 0,
  total_recommended INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_surgical_results_request_id ON public.surgical_results (request_id);

-- Enable RLS
ALTER TABLE public.surgical_results ENABLE ROW LEVEL SECURITY;

-- Users can view results for their own scans
CREATE POLICY "Users can view their own scan results"
  ON public.surgical_results
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM scan_runs
      WHERE scan_runs.request_id = surgical_results.request_id
        AND scan_runs.user_id = auth.uid()
    )
  );

-- No direct inserts from client (n8n writes via service role)
CREATE POLICY "No client inserts"
  ON public.surgical_results
  FOR INSERT
  WITH CHECK (false);
