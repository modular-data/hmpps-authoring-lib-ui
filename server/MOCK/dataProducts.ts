import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import {
  type DataProduct,
  type DataProductQualityMetrics,
  type DataProducts,
  DataProductState,
} from '../types/entities/data-product'
import { createMockedItems } from './utils/createMockedItems'
import { createMockedPublicUser } from './users'
import { createMockedAssetReferences } from './assets'
import { createMockedOutputReferences } from './outputs'
import { createMockedPolicyReferences } from './policies'
import { createMockedTagReferences } from './tags'

const createMockedDataProductQualityMetrics = (calculated = true): DataProductQualityMetrics => {
  return {
    accuracy: calculated ? faker.number.float(100) : null,
    consistency: calculated ? faker.number.float(100) : null,
  }
}

export const createMockedDataProduct = (): DataProduct => {
  const owner = createMockedPublicUser()
  const state = faker.helpers.arrayElement(Object.values(DataProductState))

  let qualityMetrics = createMockedDataProductQualityMetrics()
  let lastPreviewedAt: DataProduct['metadata']['lastPreviewedAt'] = faker.date.past().toISOString()

  if (state === DataProductState.Draft) {
    const isPreviewed = faker.datatype.boolean()

    if (!isPreviewed) {
      qualityMetrics = createMockedDataProductQualityMetrics(false)
      lastPreviewedAt = null
    }
  }

  const assetReferences = createMockedAssetReferences(faker.number.int({ min: 1, max: 5 }))
  const outputReferences = createMockedOutputReferences(faker.number.int({ min: 1, max: 5 }))
  const policyReferences = createMockedPolicyReferences(faker.number.int({ min: 1, max: 5 }))
  const tagReferences = createMockedTagReferences(faker.number.int({ min: 1, max: 5 }))

  return {
    id: uuidv4(),
    name: `${faker.company.name()} ${faker.helpers.arrayElement(['Statistics', 'Analytics'])}`,
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    isBookmarked: faker.datatype.boolean(),
    state,
    domain: {
      id: faker.string.uuid(),
      name: faker.company.buzzNoun(),
    },
    metadata: {
      owner: owner.displayName,
      author: owner.displayName,
      version: faker.system.semver(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
      lastPreviewedAt,
    },
    qualityMetrics,
    assets: Object.groupBy(assetReferences, assetReference => assetReference.type),
    outputs: Object.groupBy(outputReferences, outputReference => outputReference.type),
    policies: policyReferences,
    tags: tagReferences,
    collaborators: null,
  }
}

export function createMockedDataProducts(length = 5): DataProducts {
  return createMockedItems(createMockedDataProduct, length)
}
