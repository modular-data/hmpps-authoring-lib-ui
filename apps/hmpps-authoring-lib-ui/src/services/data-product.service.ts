import {
  type DataProduct,
  type DataProductDefinition,
  type DataProductStateActions,
  type DataSet,
  type Policy,
  type Report,
} from '../generated/core-api';
import { type DataProductApiClient } from '../data/api-clients';

export class DataProductService {
  constructor(private readonly dataProductApiClient: DataProductApiClient) {}

  async create(data: DataProduct): Promise<DataProduct> {
    return this.dataProductApiClient.create(data);
  }

  async getList(): Promise<DataProduct[]> {
    return this.dataProductApiClient.getList();
  }

  async getById(id: string): Promise<DataProductDefinition> {
    return this.dataProductApiClient.getById(id);
  }

  async saveOverview(id: string, data: DataProduct): Promise<DataProduct> {
    return this.dataProductApiClient.saveOverview(id, data);
  }

  async saveDataSources(id: string, data: string[]): Promise<string[]> {
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
  ): Promise<DataProductDefinition> {
    return this.dataProductApiClient.postAction(id, action);
  }
}
