import {
  type DataProduct,
  type DataProductCreateInput,
  type DataProductDataSets,
  type DataProductDataSetsInput,
  type DataProductDefinition,
  type DataProductOverview,
  type DataProductPolicies,
  type DataProductPoliciesInput,
  type DataProductReports,
  type DataProductReportsInput,
  type DataProductStateActions,
  type DataProductUpdateInput,
  type DataSourceIds,
  type DataSourceIdsInput,
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

  async getDefinitionById(id: string): Promise<DataProductDefinition> {
    return this.dataProductApiClient.getDefinitionById(id);
  }

  async saveOverview(
    id: string,
    data: DataProductUpdateInput,
  ): Promise<DataProductOverview> {
    return this.dataProductApiClient.saveOverview(id, data);
  }

  async saveDataSources(
    id: string,
    data: DataSourceIdsInput,
  ): Promise<DataSourceIds> {
    return this.dataProductApiClient.saveDataSources(id, data);
  }

  async saveDatasets(
    id: string,
    data: DataProductDataSetsInput,
  ): Promise<DataProductDataSets> {
    return this.dataProductApiClient.saveDatasets(id, data);
  }

  async savePolicies(
    id: string,
    data: DataProductPoliciesInput,
  ): Promise<DataProductPolicies> {
    return this.dataProductApiClient.savePolicies(id, data);
  }

  async saveReports(
    id: string,
    data: DataProductReportsInput,
  ): Promise<DataProductReports> {
    return this.dataProductApiClient.saveReports(id, data);
  }

  async performAction(
    id: string,
    action: DataProductStateActions,
  ): Promise<DataProduct> {
    return this.dataProductApiClient.postAction(id, action);
  }
}
