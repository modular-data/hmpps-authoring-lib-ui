import { faker } from '@faker-js/faker'
import { assertNever } from '../types/utils/assert-never'
import { createMockedItems } from './utils/createMockedItems'
import { createMockedRatingData } from './rating'
import {
  type Asset,
  type DataQualityMetrics,
  type Assets,
  type CommonAssetData,
  type DataFeedAsset,
  type DataProductAsset,
  type DataSetAsset,
  type AssetReferences,
  AssetType,
} from '../types/entities/asset'
import { createMockedPolicyReferences } from './policies'

const possibleUpdateFrequency = ['Real-time', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually']
const possibleDataVolumeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const createMockedDataQualityMetrics = (): DataQualityMetrics => ({
  accuracy: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
  completeness: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
  consistency: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
  precision: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
})

const createMockedCommonAssetData = (): CommonAssetData => ({
  ...createMockedRatingData(),
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  dataQualityMetrics: createMockedDataQualityMetrics(),
  updateFrequency: faker.helpers.arrayElement(possibleUpdateFrequency),
})

const createMockedDatasetAsset = (): DataSetAsset => ({
  ...createMockedCommonAssetData(),
  type: AssetType.Dataset,
  dataVolume: faker.number.int({ min: 1, max: 999 }),
  dataVolumeUnit: faker.helpers.arrayElement(possibleDataVolumeUnits),
  columnCount: faker.number.int({ min: 1, max: 100 }),
  rowCount: faker.number.int({ min: 1, max: 100_000 }),
})

const createMockedDataFeedAsset = (): DataFeedAsset => ({
  ...createMockedCommonAssetData(),
  type: AssetType.DataFeed,
  endpoint: faker.internet.url({ appendSlash: false }),
  dataSource: faker.company.name(),
  dataSourceDescription: 'IoT sensors deployed across various locations, capturing real-time environmental metrics.',
  format: faker.system.fileExt(),
  latencyInMs: faker.number.int({ min: 0, max: 1000 }),
  policies: createMockedPolicyReferences(),
})

export const createMockedDataProductAsset = (maxDepth: number): DataProductAsset => {
  return {
    ...createMockedCommonAssetData(),
    type: AssetType.DataProduct,
    dataProductName: faker.commerce.productName(),
    dataProductDomain: faker.commerce.department(),
    version: faker.system.semver(),
    updatedAt: faker.date.past().toISOString(),
    assets: maxDepth > 0 ? createMockedAssets(faker.number.int({ min: 1, max: 5 }), maxDepth - 1) : [],
    policies: createMockedPolicyReferences(),
  }
}

const createMockedAsset = (maxDepth: number): Asset => {
  const assetType = faker.helpers.arrayElement(Object.values(AssetType))

  switch (assetType) {
    case AssetType.Dataset:
      return createMockedDatasetAsset()
    case AssetType.DataFeed:
      return createMockedDataFeedAsset()
    case AssetType.DataProduct:
      return createMockedDataProductAsset(maxDepth)
    default:
      return assertNever(assetType)
  }
}

export function createMockedAssets(length = 5, maxDepth = 2): Assets {
  return createMockedItems(() => createMockedAsset(maxDepth), length)
}

export const createMockedAssetReferences = (length = 5): AssetReferences => {
  const assets = createMockedAssets(length)

  return assets.map(({ id, name, type }) => ({
    id,
    name,
    type,
  }))
}
