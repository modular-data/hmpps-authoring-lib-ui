import {
  type DataProduct,
  type DataProductCreateInput,
  type DataProductOverview,
  type DataProductStateActions,
  type DataProductUpdateInput,
  type DataSets,
  type DataSetsInput,
  type DataSourceIdsRequest,
  type DataSourceIdsResponse,
  type Policies,
  type PoliciesInput,
  type Reports,
  type ReportsInput,
} from '@/generated/core-api';
import { type DataProductApiClient } from '@/data/api-clients';

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

  async saveDatasets(id: string, data: DataSetsInput): Promise<DataSets> {
    return this.dataProductApiClient.saveDatasets(id, data);
  }

  async savePolicies(id: string, data: PoliciesInput): Promise<Policies> {
    return this.dataProductApiClient.savePolicies(id, data);
  }

  async saveReports(id: string, data: ReportsInput): Promise<Reports> {
    return this.dataProductApiClient.saveReports(id, data);
  }

  async performAction(
    id: string,
    action: DataProductStateActions,
  ): Promise<DataProduct> {
    return this.dataProductApiClient.postAction(id, action);
  }
}
