import { asSystem } from '@ministryofjustice/hmpps-rest-client';
import { type CoreApiClient } from './core';
import { type DataSources } from '../../types/entities/data-source';

export class DataSourceApiClient {
  private static readonly ROOT_PATH = '/data-sources';

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async getList(): Promise<DataSources> {
    return this.coreApiClient.get<DataSources>(
      { path: DataSourceApiClient.ROOT_PATH },
      asSystem(),
    );
  }
}
