import { type Id } from './base'
import { type DomainReference } from './domain'
import { type TagReferences } from './tag'
import { type Paginated } from './pagination'
import { type DataProductReferences } from './data-product'
import { type DataSourceReference } from './data-source'

export type DatasetId = Id

export enum DatasetState {
  Draft = 'draft',
  Published = 'published',
  Launched = 'launched',
}

export type DatasetStates = DatasetState[]

export interface DatasetMetadata {
  owner: string
  version: string
  createdAt: string
  updatedAt: string | null
  previewedAt: string | null
}

export interface Dataset {
  id: DatasetId
  name: string
  description: string
  domain: DomainReference
  state: DatasetState
  metadata: DatasetMetadata
  dataSource: DataSourceReference
  query: string
  linkedDataProducts: DataProductReferences
  tags: TagReferences
  isBookmarked: boolean
}

export type DatasetReference = Pick<Dataset, 'id' | 'name'>

export type DatasetReferences = DatasetReference[]

export type Datasets = Dataset[]

export type PaginatedDatasets = Paginated<Dataset>

export interface DatasetsFiltersMetadata {
  tags: TagReferences
  states: DatasetState[]
}

export enum DatasetAction {
  Preview = 'preview',
  ApproveAndPublish = 'approve-and-publish',
  Promote = 'promote',
}
