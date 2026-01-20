import { type Id } from './base'
import { type RatingData } from './rating'
import { type PolicyReferences } from './policy'

export type AssetId = Id

export enum AssetType {
  Dataset = 'dataset',
  DataFeed = 'dataFeed',
  DataProduct = 'dataProduct',
}

export interface DataQualityMetrics {
  accuracy: number
  completeness: number
  consistency: number
  precision: number
}

export interface CommonAssetData extends RatingData {
  id: AssetId
  type?: AssetType
  name: string
  description: string
  dataQualityMetrics: DataQualityMetrics
  updateFrequency: string
}

export interface DataSetAsset extends CommonAssetData {
  type: AssetType.Dataset
  dataVolume: number
  dataVolumeUnit: string
  columnCount: number
  rowCount: number
}

export interface DataFeedAsset extends CommonAssetData {
  type: AssetType.DataFeed
  format: string
  endpoint: string
  dataSource: string
  dataSourceDescription: string
  latencyInMs: number
  policies: PolicyReferences
}

export interface DataProductAsset extends CommonAssetData {
  type: AssetType.DataProduct
  dataProductName: string
  dataProductDomain: string
  version: string
  updatedAt: string
  assets: Asset[]
  policies: PolicyReferences
}

export type Asset = DataSetAsset | DataFeedAsset | DataProductAsset

export type Assets = Asset[]

export type AssetReference = Pick<Asset, 'id' | 'name' | 'type'>

export type AssetReferences = AssetReference[]

export type AssetsByType = Partial<Record<AssetType, Assets>>

export type AssetReferencesByType = Partial<Record<AssetType, AssetReferences>>
