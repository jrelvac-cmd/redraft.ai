-- Table: feedbacks
CREATE TABLE IF NOT EXISTS public.feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_feedbacks_user_id ON public.feedbacks(user_id);
CREATE INDEX idx_feedbacks_project_id ON public.feedbacks(project_id);
CREATE INDEX idx_feedbacks_rating ON public.feedbacks(rating);
CREATE INDEX idx_feedbacks_created_at ON public.feedbacks(created_at);

-- RLS Policies
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own feedbacks"
  ON public.feedbacks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own feedbacks"
  ON public.feedbacks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Comments
COMMENT ON TABLE public.feedbacks IS 'User feedback and ratings for projects';
COMMENT ON COLUMN public.feedbacks.rating IS 'Rating from 1 to 5 stars';
