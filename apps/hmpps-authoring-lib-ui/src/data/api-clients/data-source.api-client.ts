import { asSystem } from '@ministryofjustice/hmpps-rest-client';
import { type GetDataSourcesResponses } from '@/generated/core-api';
import { type CoreApiClient } from './core';

export class DataSourceApiClient {
  private static readonly ROOT_PATH = '/datasources';

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getList(): Promise<GetDataSourcesResponses> {
    return this.coreApiClient.get<GetDataSourcesResponses>(
      { path: DataSourceApiClient.ROOT_PATH },
      asSystem(),
    );
  }
}
