
-- Drop the overly permissive ALL policy and replace with specific INSERT/UPDATE for service role
DROP POLICY IF EXISTS "Service role can manage surgical_queries" ON public.surgical_queries;

-- Service role bypasses RLS automatically, so no policy needed for it.
-- We only need to allow authenticated users to insert their own data directly (not needed here since edge fn uses service key).
-- Just ensure the SELECT policy exists (already created). No changes needed for INSERT/UPDATE from edge functions.
