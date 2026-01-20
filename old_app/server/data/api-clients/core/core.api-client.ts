import { type ApiConfig, type SanitisedError, RestClient } from '@ministryofjustice/hmpps-rest-client'
import { type AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import { logger } from '../../../logger'
import { ValidationError } from '../../../errors'
import { isCoreApiValidationError } from './errors'

export class CoreApiClient extends RestClient {
  constructor(apiConfig: ApiConfig, authenticationClient: AuthenticationClient) {
    super('Core API', apiConfig, logger, authenticationClient)
  }

  protected handleError<TResponse, TErrorData>(
    path: string,
    method: string,
    error: SanitisedError<TErrorData>,
  ): TResponse {
    switch (true) {
      case isCoreApiValidationError(error): {
        throw ValidationError.fromApi(error.data.errors)
      }

      default: {
        return super.handleError<TResponse, TErrorData>(path, method, error)
      }
    }
  }
}
