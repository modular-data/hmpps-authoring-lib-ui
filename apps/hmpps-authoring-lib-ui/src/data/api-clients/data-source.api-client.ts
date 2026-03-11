import { asSystem } from '@ministryofjustice/hmpps-rest-client';
import { type GetDataSourcesResponse } from '@/generated/core-api';
import { type CoreApiClient } from './core';

export class DataSourceApiClient {
  private static readonly ROOT_PATH = '/datasources';

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getList(): Promise<GetDataSourcesResponse> {
    return this.coreApiClient.get<GetDataSourcesResponse>(
      { path: DataSourceApiClient.ROOT_PATH },
      asSystem(),
    );
  }
}
