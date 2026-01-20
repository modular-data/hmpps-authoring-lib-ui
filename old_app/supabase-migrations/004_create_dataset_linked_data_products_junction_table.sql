-- Create dataset_linked_data_products junction table
CREATE TABLE IF NOT EXISTS public.dataset_linked_data_products (
  dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
  data_product_id UUID NOT NULL,
  PRIMARY KEY (dataset_id, data_product_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_dataset_linked_data_products_dataset_id ON public.dataset_linked_data_products(dataset_id);
CREATE INDEX IF NOT EXISTS idx_dataset_linked_data_products_data_product_id ON public.dataset_linked_data_products(data_product_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.dataset_linked_data_products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security requirements)
CREATE POLICY "Allow all operations on dataset_linked_data_products" ON public.dataset_linked_data_products
  FOR ALL
  USING (true)
  WITH CHECK (true);
















