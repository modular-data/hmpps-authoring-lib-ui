-- Create dataset_tags junction table
CREATE TABLE IF NOT EXISTS public.dataset_tags (
  dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL,
  PRIMARY KEY (dataset_id, tag_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_dataset_tags_dataset_id ON public.dataset_tags(dataset_id);
CREATE INDEX IF NOT EXISTS idx_dataset_tags_tag_id ON public.dataset_tags(tag_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.dataset_tags ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security requirements)
CREATE POLICY "Allow all operations on dataset_tags" ON public.dataset_tags
  FOR ALL
  USING (true)
  WITH CHECK (true);
















