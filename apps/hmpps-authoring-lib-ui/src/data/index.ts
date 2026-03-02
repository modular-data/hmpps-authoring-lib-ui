import {
  type AuthConfig,
  type TokenStore,
  AuthenticationClient,
} from '@ministryofjustice/hmpps-auth-clients';
import { type ApiConfig } from '@ministryofjustice/hmpps-rest-client';
import { logger } from '../logger';
import {
  CoreApiClient,
  DataSourceApiClient,
  DataProductApiClient,
} from './api-clients';

export interface DataAccessConfig {
  coreApiConfig: ApiConfig;
  authConfig: AuthConfig;
  tokenStore: TokenStore;
}

export const createDataAccess = ({
  coreApiConfig,
  authConfig,
  tokenStore,
}: DataAccessConfig) => {
  const hmppsAuthClient = new AuthenticationClient(
    authConfig,
    logger,
    tokenStore,
  );

  const coreApiClient = new CoreApiClient(coreApiConfig, hmppsAuthClient);

  return {
    hmppsAuthClient,
    dataSourceApiClient: new DataSourceApiClient(coreApiClient),
    dataProductApiClient: new DataProductApiClient(coreApiClient),
  };
};

export type DataAccess = ReturnType<typeof createDataAccess>;
