import { stringifyQueryParams } from '../queryParams'

interface HiddenInputField {
  name: string
  value: string
}

export type HiddenInputFields = HiddenInputField[]

export const createHiddenInputFields = (data: Record<string, unknown>): HiddenInputFields => {
  const searchString = stringifyQueryParams(data)
  const urlSearchParams = new URLSearchParams(searchString)

  return Array.from(urlSearchParams.entries()).map(([name, value]) => ({
    name,
    value,
  }))
}
