import { type DataSource } from '../generated/core-api';
import { type DataSourceApiClient } from '../data/api-clients';

export class DataSourceService {
  constructor(private readonly dataSourceApiClient: DataSourceApiClient) {}

  async getList(): Promise<DataSource[]> {
    return this.dataSourceApiClient.getList();
  }
}
