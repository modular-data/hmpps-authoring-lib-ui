import { type Dataset, type DatasetReference, type DatasetMetadata } from '../../../types/entities/dataset'
import { type DataProductReference } from '../../../types/entities/data-product'
import { type DomainReference } from '../../../types/entities/domain'
import { type DataSourceReference } from '../../../types/entities/data-source'
import { type TagReference } from '../../../types/entities/tag'

// TODO: Prototype: Fully review this file after first priority tasks

export interface SupabaseDatasetRow {
  id: string
  name: string
  version: string
  domain_id: string
  domain_name: string
  datasource_id: string
  state: string
  description: string | null
  query: string
  is_bookmarked: boolean
  metadata: {
    owner: string
    version: string
    createdAt: string
    updatedAt: string | null
    previewedAt: string | null
  }
  created_at: string
  updated_at: string | null
}

export interface SupabaseDatasetTagRow {
  dataset_id: string
  tag_id: string
}

export interface SupabaseDatasetLinkedDataProductRow {
  dataset_id: string
  data_product_id: string
}

export interface SupabaseDataSourceRow {
  id: string
  name: string
}

export interface SupabaseTagRow {
  id: string
  name: string
}

export interface SupabaseDataProductRow {
  id: string
  name: string
}

export interface DatasetWithRelations {
  dataset: SupabaseDatasetRow
  dataSource?: SupabaseDataSourceRow
  tags?: SupabaseTagRow[]
  linkedDataProducts?: SupabaseDataProductRow[]
}

export const mapSupabaseRowToDataset = (
  datasetRow: SupabaseDatasetRow,
  dataSourceRow?: SupabaseDataSourceRow,
  tags: SupabaseTagRow[] = [],
  linkedDataProducts: SupabaseDataProductRow[] = [],
): Dataset => {
  const dataSource: DataSourceReference = dataSourceRow
    ? { id: dataSourceRow.id, name: dataSourceRow.name }
    : { id: datasetRow.datasource_id, name: '' }

  const domain: DomainReference = {
    id: datasetRow.domain_id,
    name: datasetRow.domain_name,
  }

  const tagReferences: TagReference[] = tags.map(tag => ({
    id: tag.id,
    name: tag.name,
  }))

  const dataProductReferences: DataProductReference[] = linkedDataProducts.map(dp => ({
    id: dp.id,
    name: dp.name,
  }))

  const metadata: DatasetMetadata = {
    owner: datasetRow.metadata.owner,
    version: datasetRow.metadata.version,
    createdAt: datasetRow.metadata.createdAt,
    updatedAt: datasetRow.metadata.updatedAt,
    previewedAt: datasetRow.metadata.previewedAt,
  }

  return {
    id: datasetRow.id,
    name: datasetRow.name,
    domain,
    dataSource,
    state: datasetRow.state as Dataset['state'],
    description: datasetRow.description,
    query: datasetRow.query,
    linkedDataProducts: dataProductReferences,
    tags: tagReferences,
    isBookmarked: datasetRow.is_bookmarked,
    metadata,
  }
}

export const mapSupabaseRowToDatasetReference = (row: SupabaseDatasetRow): DatasetReference => {
  return {
    id: row.id,
    name: row.name,
  }
}

export const mapDatasetToSupabaseInsert = (
  dataset: Omit<Dataset, 'id' | 'tags' | 'linkedDataProducts'>,
): Omit<SupabaseDatasetRow, 'id' | 'created_at' | 'updated_at'> => {
  return {
    name: dataset.name,
    version: dataset.metadata.version,
    domain_id: dataset.domain.id,
    domain_name: dataset.domain.name,
    datasource_id: dataset.dataSource.id,
    state: dataset.state,
    description: dataset.description,
    query: dataset.query,
    is_bookmarked: dataset.isBookmarked,
    metadata: {
      owner: dataset.metadata.owner,
      version: dataset.metadata.version,
      createdAt: dataset.metadata.createdAt,
      updatedAt: dataset.metadata.updatedAt,
      previewedAt: dataset.metadata.previewedAt,
    },
  }
}

export const mapDatasetToSupabaseUpdate = (
  dataset: Partial<Omit<Dataset, 'id' | 'tags' | 'linkedDataProducts'>>,
): Partial<Omit<SupabaseDatasetRow, 'id' | 'created_at' | 'updated_at'>> => {
  const update: Partial<Omit<SupabaseDatasetRow, 'id' | 'created_at' | 'updated_at'>> = {}

  if (dataset.name !== undefined) {
    update.name = dataset.name
  }

  if (dataset.metadata?.version !== undefined) {
    update.version = dataset.metadata.version
  }

  if (dataset.domain !== undefined) {
    update.domain_id = dataset.domain.id
    update.domain_name = dataset.domain.name
  }

  if (dataset.dataSource !== undefined) {
    update.datasource_id = dataset.dataSource.id
  }

  if (dataset.state !== undefined) {
    update.state = dataset.state
  }

  if (dataset.description !== undefined) {
    update.description = dataset.description
  }

  if (dataset.query !== undefined) {
    update.query = dataset.query
  }

  if (dataset.isBookmarked !== undefined) {
    update.is_bookmarked = dataset.isBookmarked
  }

  if (dataset.metadata !== undefined) {
    update.metadata = {
      owner: dataset.metadata.owner,
      version: dataset.metadata.version,
      createdAt: dataset.metadata.createdAt,
      updatedAt: dataset.metadata.updatedAt,
      previewedAt: dataset.metadata.previewedAt,
    }
  }

  return update
}
