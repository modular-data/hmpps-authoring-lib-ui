import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import {
  type Policy,
  type PolicyReferences,
  PolicyConditionType,
  PolicyEffect,
  PolicyType,
} from '../types/entities/policy'
import { createMockedItems } from './utils/createMockedItems'

const possibleTags = ['Medicine', 'Business', 'Equipment', 'Technology', 'Education', 'Finance']

const possibleNames = [
  'Access Policy Data Product',
  'Pricing',
  'Stakeholders',
  'Demographics',
  'User Permissions',
  'Security Controls',
  'Data Retention',
  'Compliance',
  'Privacy Policy',
  'Service Level Agreement',
  'Incident Response',
  'Resource Allocation',
]

export const createMockedPolicy = (): Policy => {
  const conditions = faker.helpers.multiple(
    () => ({
      type: faker.helpers.arrayElement(Object.values(PolicyConditionType)),
      key: faker.database.column(),
      values: faker.word.words({ count: { min: 1, max: 10 } }).split(' '),
    }),
    { count: { min: 1, max: 5 } },
  )

  return {
    id: uuidv4(),
    type: faker.helpers.arrayElement(Object.values(PolicyType)),
    effect: faker.helpers.arrayElement(Object.values(PolicyEffect)),
    name: faker.helpers.arrayElement(possibleNames),
    tags: faker.helpers.arrayElements(possibleTags),
    conditions,
  }
}

export function createMockedPolicies(length = 5) {
  return createMockedItems(createMockedPolicy, length)
}

export const createMockedPolicyReferences = (length = 5): PolicyReferences => {
  const policies = createMockedPolicies(length)

  return policies.map(({ id, name }) => ({
    id,
    name,
  }))
}
