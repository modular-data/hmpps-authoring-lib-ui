import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

// TODO: Prototype: Decompose this file

export interface DatasetPreviewDataRow {
  prisoner_id: string
  first_name: string
  last_name: string
  date_of_birth: string
  prison_location: string
  sentence_start_date: string
  sentence_length_months: number
  offence_category: string
}

export interface DataProductPreviewDataRow {
  prison_name: string
  total_prisoners: number
  average_age: number
  category_breakdown: string
  average_sentence_months: number
  last_updated: string
}

const PRISON_NAMES = [
  'HMP Belmarsh',
  'HMP Wandsworth',
  'HMP Pentonville',
  'HMP Brixton',
  'HMP Wormwood Scrubs',
  'HMP Holloway',
  'HMP Wandsworth',
  'HMP Leeds',
  'HMP Manchester',
  'HMP Birmingham',
  'HMP Liverpool',
  'HMP Durham',
]

const OFFENCE_CATEGORIES = ['Violent', 'Drug', 'Property', 'Sexual', 'Fraud', 'Other']

export function createMockedDatasetPreviewData(count = 25): DatasetPreviewDataRow[] {
  return Array.from({ length: count }, () => {
    const sentenceStartDate = faker.date.past({ years: 5 })
    const dateOfBirth = faker.date.birthdate({ min: 18, max: 70, mode: 'age' })

    return {
      prisoner_id: uuidv4(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      date_of_birth: dateOfBirth.toISOString().split('T')[0],
      prison_location: faker.helpers.arrayElement(PRISON_NAMES),
      sentence_start_date: sentenceStartDate.toISOString().split('T')[0],
      sentence_length_months: faker.number.int({ min: 6, max: 240 }),
      offence_category: faker.helpers.arrayElement(OFFENCE_CATEGORIES),
    }
  })
}

export function createMockedDataProductPreviewData(count = 12): DataProductPreviewDataRow[] {
  return PRISON_NAMES.slice(0, count).map(prisonName => {
    const totalPrisoners = faker.number.int({ min: 50, max: 1500 })
    const violentCount = faker.number.int({ min: 20, max: totalPrisoners * 0.5 })
    const drugCount = faker.number.int({ min: 10, max: totalPrisoners * 0.4 })

    const violentPercent = Math.round((violentCount / totalPrisoners) * 100)
    const drugPercent = Math.round((drugCount / totalPrisoners) * 100)
    const otherPercent = 100 - violentPercent - drugPercent

    return {
      prison_name: prisonName,
      total_prisoners: totalPrisoners,
      average_age: Number(faker.number.float({ min: 25, max: 45, fractionDigits: 1 }).toFixed(1)),
      category_breakdown: `Violent: ${violentPercent}%, Drug: ${drugPercent}%, Other: ${otherPercent}%`,
      average_sentence_months: Number(faker.number.float({ min: 12, max: 120, fractionDigits: 1 }).toFixed(1)),
      last_updated: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    }
  })
}
