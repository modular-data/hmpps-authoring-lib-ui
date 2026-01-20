import { type Id } from './base'
import { type DomainReference } from './domain'
import { type AssetReferencesByType } from './asset'
import { type OutputReferencesByType } from './output'
import { type PolicyReferences } from './policy'
import { type TagReferences } from './tag'
import { type Paginated } from './pagination'

export type DataProductId = Id

export enum DataProductState {
  Draft = 'draft',
  Published = 'published',
  Launched = 'launched',
}

export type DataProductStates = DataProductState[]

interface DataProductMetadata {
  owner: string
  author: string
  version: string
  createdAt: string
  updatedAt: string | null
  lastPreviewedAt: string | null
}

export interface DataProductQualityMetrics {
  accuracy: number | null
  consistency: number | null
}

export interface DataProduct {
  id: DataProductId
  name: string
  description: string
  isBookmarked: boolean
  domain: DomainReference
  state: DataProductState
  metadata: DataProductMetadata
  qualityMetrics: DataProductQualityMetrics
  assets: AssetReferencesByType
  outputs: OutputReferencesByType
  policies: PolicyReferences
  tags: TagReferences
  collaborators: null
}

export type DataProducts = DataProduct[]

export type PaginatedDataProducts = Paginated<DataProduct>

export interface DataProductsFiltersMetadata {
  tags: TagReferences
  states: DataProductStates
}

export enum DataProductAction {
  Preview = 'preview',
  ApproveAndPublish = 'approve-and-publish',
  Promote = 'promote',
}

export type DataProductReference = Pick<DataProduct, 'id' | 'name'>

export type DataProductReferences = DataProductReference[]
