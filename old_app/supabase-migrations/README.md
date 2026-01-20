# Supabase Migrations for Dataset Feature

This directory contains SQL migration scripts to set up the required Supabase tables for the Dataset and Datasource entities.

## Tables Created

1. **datasources** - Stores datasource information
2. **datasets** - Stores dataset information
3. **dataset_tags** - Junction table linking datasets to tags
4. **dataset_linked_data_products** - Junction table linking datasets to data products

## How to Apply Migrations

### Option 1: Using Supabase CLI (Recommended)

If you're using Supabase locally:

```bash
# Navigate to your project root
cd /path/to/hmpps-project

# Apply migrations
supabase db reset  # This will apply all migrations in supabase/migrations/
# OR
supabase migration up
```

### Option 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste each migration file in order (001, 002, 003, 004, 005)
4. Execute each script

### Option 3: Using psql or Database Client

If you have direct database access:

```bash
psql -h your-db-host -U postgres -d postgres -f supabase-migrations/001_create_datasources_table.sql
psql -h your-db-host -U postgres -d postgres -f supabase-migrations/002_create_datasets_table.sql
psql -h your-db-host -U postgres -d postgres -f supabase-migrations/003_create_dataset_tags_junction_table.sql
psql -h your-db-host -U postgres -d postgres -f supabase-migrations/004_create_dataset_linked_data_products_junction_table.sql
psql -h your-db-host -U postgres -d postgres -f supabase-migrations/005_create_updated_at_trigger.sql
```

## Migration Order

Execute migrations in this order:

1. `001_create_datasources_table.sql` - Creates datasources table (required by datasets)
2. `002_create_datasets_table.sql` - Creates datasets table
3. `003_create_dataset_tags_junction_table.sql` - Creates junction table for tags
4. `004_create_dataset_linked_data_products_junction_table.sql` - Creates junction table for linked data products
5. `005_create_updated_at_trigger.sql` - Creates triggers for automatic updated_at timestamps

## Notes

- All tables have Row Level Security (RLS) enabled with permissive policies. Adjust these based on your security requirements.
- The `datasets.metadata` field is a JSONB column that stores: `{ owner, version, createdAt, updatedAt, previewedAt }`
- Foreign key constraints ensure data integrity
- Indexes are created for common query patterns
