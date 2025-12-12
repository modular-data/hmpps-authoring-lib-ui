import { AssetType } from '../types/entities/asset'

export const assetTypeLabelMap: Record<AssetType, string> = {
  [AssetType.Dataset]: 'Dataset',
  [AssetType.DataFeed]: 'Data Feed',
  [AssetType.DataProduct]: 'Data Product',
}
