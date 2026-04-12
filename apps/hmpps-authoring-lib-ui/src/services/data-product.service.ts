import {
  type DataProduct,
  type DataProductCreateInput,
  type DataProductOverview,
  type DataProductStateActions,
  type DataProductUpdateInput,
  type DataSet,
  type DataSourceIdsRequest,
  type DataSourceIdsResponse,
  type Policy,
  type Report,
} from '../generated/core-api';
import { type DataProductApiClient } from '../data/api-clients';

export class DataProductService {
  constructor(private readonly dataProductApiClient: DataProductApiClient) {}

  async create(data: DataProductCreateInput): Promise<DataProductOverview> {
    return this.dataProductApiClient.create(data);
  }

  async getList(): Promise<DataProductOverview[]> {
    return this.dataProductApiClient.getList();
  }

  async getById(id: string): Promise<DataProduct> {
    return this.dataProductApiClient.getById(id);
  }

  async saveOverview(
    id: string,
    data: DataProductUpdateInput,
  ): Promise<DataProductOverview> {
    return this.dataProductApiClient.saveOverview(id, data);
  }

  async saveDataSources(
    id: string,
    data: DataSourceIdsRequest,
  ): Promise<DataSourceIdsResponse> {
    return this.dataProductApiClient.saveDataSources(id, data);
  }

  async saveDatasets(id: string, data: DataSet[]): Promise<DataSet[]> {
    return this.dataProductApiClient.saveDatasets(id, data);
  }

  async savePolicies(id: string, data: Policy[]): Promise<Policy[]> {
    return this.dataProductApiClient.savePolicies(id, data);
  }

  async saveReports(id: string, data: Report[]): Promise<Report[]> {
    return this.dataProductApiClient.saveReports(id, data);
  }

  async performAction(
    id: string,
    action: DataProductStateActions,
  ): Promise<DataProduct> {
    return this.dataProductApiClient.postAction(id, action);
  }
}
