-- Create datasources table
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

-- Create index on name for faster lookups
CREATE INDEX IF NOT EXISTS idx_datasources_name ON public.datasources(name);

-- Enable Row Level Security (RLS)
ALTER TABLE public.datasources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security requirements)
CREATE POLICY "Allow all operations on datasources" ON public.datasources
  FOR ALL
  USING (true)
  WITH CHECK (true);
















