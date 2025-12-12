import { type DataSourceApiClient } from '../data/api-clients'
import { type DataSources, type DataSource, type DataSourceId } from '../types/entities/data-source'

export class DataSourceService {
  constructor(private readonly dataSourceApiClient: DataSourceApiClient) {}

  async getList(): Promise<DataSources> {
    return this.dataSourceApiClient.getList()
  }

  async getById(id: DataSourceId): Promise<DataSource> {
    return this.dataSourceApiClient.getById(id)
  }
}
