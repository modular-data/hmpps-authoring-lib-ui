import { faker } from '@faker-js/faker'
import { capitalizeFirstLetter } from '../utils/dataFormat/capitalizeFirstLetter'
import { type Output, type OutputReferences, type Outputs, OutputType } from '../types/entities/output'
import { createMockedItems } from './utils/createMockedItems'

const suffixesByOutputType: Record<OutputType, string[]> = {
  [OutputType.Dashboard]: ['Dashboard'],
  [OutputType.Report]: ['Report', 'Summary', 'Dashboard'],
}

const createMockedOutput = (): Output => {
  const type = faker.helpers.arrayElement([OutputType.Dashboard, OutputType.Report])
  const suffixes = suffixesByOutputType[type]
  const noun = capitalizeFirstLetter(faker.word.noun())
  const suffix = faker.helpers.arrayElement(suffixes)

  return {
    id: faker.string.uuid(),
    name: `${noun} ${suffix}`,
    type,
  }
}

export const createMockedOutputs = (length = 5): Outputs => {
  return createMockedItems(createMockedOutput, length)
}

export const createMockedOutputReferences = (length = 5): OutputReferences => {
  const outputs = createMockedOutputs(length)

  return outputs.map(({ id, name, type }) => ({
    id,
    name,
    type,
  }))
}
