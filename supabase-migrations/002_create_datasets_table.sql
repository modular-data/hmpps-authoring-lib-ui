-- Create datasets table
CREATE TABLE IF NOT EXISTS public.datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  domain_id UUID NOT NULL,
  domain_name TEXT NOT NULL,
  datasource_id UUID NOT NULL REFERENCES public.datasources(id) ON DELETE RESTRICT,
  state TEXT NOT NULL CHECK (state IN ('draft', 'published', 'launched')),
  description TEXT,
  query TEXT NOT NULL,
  is_bookmarked BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_datasets_name ON public.datasets(name);
CREATE INDEX IF NOT EXISTS idx_datasets_datasource_id ON public.datasets(datasource_id);
CREATE INDEX IF NOT EXISTS idx_datasets_state ON public.datasets(state);
CREATE INDEX IF NOT EXISTS idx_datasets_domain_id ON public.datasets(domain_id);
CREATE INDEX IF NOT EXISTS idx_datasets_created_at ON public.datasets(created_at DESC);
-- B-tree indexes for JSONB metadata fields (more appropriate than GIN for extracted text values)
CREATE INDEX IF NOT EXISTS idx_datasets_metadata_owner ON public.datasets ((metadata->>'owner'));
CREATE INDEX IF NOT EXISTS idx_datasets_metadata_created_at ON public.datasets ((metadata->>'createdAt'));
CREATE INDEX IF NOT EXISTS idx_datasets_metadata_updated_at ON public.datasets ((metadata->>'updatedAt'));
CREATE INDEX IF NOT EXISTS idx_datasets_metadata_previewed_at ON public.datasets ((metadata->>'previewedAt'));
-- GIN index on entire metadata JSONB column for efficient JSONB queries
CREATE INDEX IF NOT EXISTS idx_datasets_metadata_gin ON public.datasets USING GIN (metadata);

-- Enable Row Level Security (RLS)
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security requirements)
CREATE POLICY "Allow all operations on datasets" ON public.datasets
  FOR ALL
  USING (true)
  WITH CHECK (true);















