import { type SanitisedError } from '@ministryofjustice/hmpps-rest-client'

interface CoreApiValidationErrorData {
  errors: { path: string[]; message: string }[]
}

type CoreApiValidationError = SanitisedError<CoreApiValidationErrorData>

export const isCoreApiValidationError = (error: SanitisedError): error is CoreApiValidationError => {
  const { responseStatus, data } = error

  if (responseStatus !== 400) {
    return false
  }

  if (typeof data !== 'object' || data === null) {
    return false
  }

  return 'errors' in data && Array.isArray(data.errors)
}
