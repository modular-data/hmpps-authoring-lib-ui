-- Rename testedAt to previewedAt in datasets metadata

-- Drop the old index
DROP INDEX IF EXISTS public.idx_datasets_metadata_tested_at;

-- Create the new index
CREATE INDEX IF NOT EXISTS idx_datasets_metadata_previewed_at ON public.datasets ((metadata->>'previewedAt'));

-- Update existing rows to rename the JSONB key from testedAt to previewedAt
UPDATE public.datasets
SET metadata = jsonb_set(
  metadata - 'testedAt',
  '{previewedAt}',
  metadata->'testedAt'
)
WHERE metadata ? 'testedAt';
