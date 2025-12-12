import { type AssetReferencesByType } from '../../entities/asset'
import { type OutputReferencesByType } from '../../entities/output'
import { type PolicyReferences } from '../../entities/policy'
import { type TagReferences } from '../../entities/tag'

export interface DataProductFormMetadata {
  assetReferencesByType: AssetReferencesByType
  outputReferencesByType: OutputReferencesByType
  policies: PolicyReferences
  tags: TagReferences
}
