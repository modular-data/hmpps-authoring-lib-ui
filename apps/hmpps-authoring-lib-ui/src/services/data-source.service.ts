import { type DataSourceApiClient } from '../data/api-clients';
import { type DataSources } from '../types/entities/data-source';

export class DataSourceService {
  constructor(private readonly dataSourceApiClient: DataSourceApiClient) {}

  async getList(): Promise<DataSources> {
    return this.dataSourceApiClient.getList();
  }
}
