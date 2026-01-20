-- Combined Supabase Migration for Dataset Feature
-- Run this file to create all required tables at once

-- ============================================
-- 1. Create datasources table
-- ============================================
CREATE TABLE IF NOT EXISTS public.datasources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  connection TEXT NOT NULL CHECK (connection IN ('federated', 'awsdatacatalog', 'datawarehouse')),
  dialect TEXT NOT NULL CHECK (dialect IN ('oracle/11g', 'postgres/19', 'redshift/4', 'athena/3')),
  database TEXT NOT NULL,
  catalog TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_datasources_name ON public.datasources(name);

ALTER TABLE public.datasources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on datasources" ON public.datasources
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 2. Create datasets table
-- ============================================
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

ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on datasets" ON public.datasets
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 3. Create dataset_tags junction table
-- ============================================
CREATE TABLE IF NOT EXISTS public.dataset_tags (
  dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL,
  PRIMARY KEY (dataset_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_dataset_tags_dataset_id ON public.dataset_tags(dataset_id);
CREATE INDEX IF NOT EXISTS idx_dataset_tags_tag_id ON public.dataset_tags(tag_id);

ALTER TABLE public.dataset_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on dataset_tags" ON public.dataset_tags
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 4. Create dataset_linked_data_products junction table
-- ============================================
CREATE TABLE IF NOT EXISTS public.dataset_linked_data_products (
  dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
  data_product_id UUID NOT NULL,
  PRIMARY KEY (dataset_id, data_product_id)
);

CREATE INDEX IF NOT EXISTS idx_dataset_linked_data_products_dataset_id ON public.dataset_linked_data_products(dataset_id);
CREATE INDEX IF NOT EXISTS idx_dataset_linked_data_products_data_product_id ON public.dataset_linked_data_products(data_product_id);

ALTER TABLE public.dataset_linked_data_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on dataset_linked_data_products" ON public.dataset_linked_data_products
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 5. Create updated_at trigger function and triggers
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_datasources_updated_at
  BEFORE UPDATE ON public.datasources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_datasets_updated_at
  BEFORE UPDATE ON public.datasets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();















