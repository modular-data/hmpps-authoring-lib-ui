import { type AuthConfig, type TokenStore, AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import { type ApiConfig } from '@ministryofjustice/hmpps-rest-client'
import { logger } from '../logger'
import {
  CoreApiClient,
  DomainApiClient,
  AssetApiClient,
  OutputApiClient,
  PolicyApiClient,
  TagApiClient,
  DataSourceApiClient,
  DatasetApiClient,
  DataProductApiClient,
} from './api-clients'
import { createSupabaseClient, type SupabaseClientConfig } from './supabase'

export interface DataAccessConfig {
  coreApiConfig: ApiConfig
  authConfig: AuthConfig
  tokenStore: TokenStore
  supabaseConfig: SupabaseClientConfig
}

export const createDataAccess = ({ coreApiConfig, authConfig, tokenStore, supabaseConfig }: DataAccessConfig) => {
  const hmppsAuthClient = new AuthenticationClient(authConfig, logger, tokenStore)

  const coreApiClient = new CoreApiClient(coreApiConfig, hmppsAuthClient)
  const supabaseClient = createSupabaseClient(supabaseConfig)

  return {
    hmppsAuthClient,
    domainApiClient: new DomainApiClient(coreApiClient),
    assetApiClient: new AssetApiClient(coreApiClient),
    outputApiClient: new OutputApiClient(coreApiClient),
    policyApiClient: new PolicyApiClient(coreApiClient),
    tagApiClient: new TagApiClient(coreApiClient),
    dataSourceApiClient: new DataSourceApiClient(supabaseClient),
    datasetApiClient: new DatasetApiClient(supabaseClient),
    dataProductApiClient: new DataProductApiClient(coreApiClient),
  }
}

export type DataAccess = ReturnType<typeof createDataAccess>

export { AuthenticationClient }
