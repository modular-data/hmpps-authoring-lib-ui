import { faker } from '@faker-js/faker'
import { createMockedItems } from './utils/createMockedItems'
import { type PublicUser, type PublicUsers } from '../types/entities/hmpps-user'

export const createMockedPublicUser = (): PublicUser => {
  return {
    userId: faker.string.uuid(),
    displayName: faker.person.fullName(),
  }
}

export function createMockedPublicUsers(length = 5): PublicUsers {
  return createMockedItems(createMockedPublicUser, length)
}
