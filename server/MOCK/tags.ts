import { faker } from '@faker-js/faker'
import { type Tag, type TagReferences, type Tags } from '../types/entities/tag'
import { createMockedItems } from './utils/createMockedItems'

export const createMockedTag = (): Tag => {
  return {
    id: faker.string.uuid(),
    name: faker.word.noun(),
  }
}

export const createMockedTags = (length = 5): Tags => {
  return createMockedItems(createMockedTag, length)
}

export const createMockedTagReferences = (length = 5): TagReferences => {
  const tags = createMockedTags(length)

  return tags.map(({ id, name }) => ({
    id,
    name,
  }))
}
