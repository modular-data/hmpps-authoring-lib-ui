import { asSystem } from '@ministryofjustice/hmpps-rest-client';
import {
  type CreateDraftResponse,
  type DataProduct,
  type DataProductCreateInput,
  type DataProductOverview,
  type DataProductUpdateInput,
  type ExecuteActionData,
  type ExecuteActionResponse,
  type GetAllDataProductsResponse,
  type GetDataProductData,
  type GetDataProductResponse,
  type PutAllDataSourcesData,
  type PutAllDataSourcesResponse,
  type UpdateDataSetsData,
  type UpdateDataSetsResponse,
  type UpdateOverviewData,
  type UpdateOverviewResponse,
  type UpdatePoliciesData,
  type UpdatePoliciesResponse,
  type UpdateReportsData,
  type UpdateReportsResponse,
} from '@/generated/core-api';
import { type CoreApiClient } from './core';

// TODO: Rename types after backend fixes OpenAPI naming issues

export class DataProductApiClient {
  private static readonly ROOT_PATH = '/data-products';

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async create(data: DataProductCreateInput): Promise<DataProductOverview> {
    return this.coreApiClient.post<CreateDraftResponse>(
      {
        path: DataProductApiClient.ROOT_PATH,
        data,
      },
      asSystem(),
    );
  }

  async getList(): Promise<DataProductOverview[]> {
    return this.coreApiClient.get<GetAllDataProductsResponse>(
      { path: DataProductApiClient.ROOT_PATH },
      asSystem(),
    );
  }

  async getById(id: GetDataProductData['path']['id']): Promise<DataProduct> {
    return this.coreApiClient.get<GetDataProductResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}`,
      },
      asSystem(),
    );
  }

  async saveOverview(
    id: UpdateOverviewData['path']['id'],
    data: DataProductUpdateInput,
  ): Promise<DataProductOverview> {
    return this.coreApiClient.put<UpdateOverviewResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/overview`,
        data,
      },
      asSystem(),
    );
  }

  async saveDataSources(
    id: PutAllDataSourcesData['path']['id'],
    data: PutAllDataSourcesData['body'],
  ): Promise<PutAllDataSourcesResponse> {
    return this.coreApiClient.put<PutAllDataSourcesResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/datasources`,
        data,
      },
      asSystem(),
    );
  }

  async saveDatasets(
    id: UpdateDataSetsData['path']['id'],
    data: UpdateDataSetsData['body'],
  ): Promise<UpdateDataSetsResponse> {
    return this.coreApiClient.put<UpdateDataSetsResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/datasets`,
        data,
      },
      asSystem(),
    );
  }

  async savePolicies(
    id: UpdatePoliciesData['path']['id'],
    data: UpdatePoliciesData['body'],
  ): Promise<UpdatePoliciesResponse> {
    return this.coreApiClient.put<UpdatePoliciesResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/policies`,
        data,
      },
      asSystem(),
    );
  }

  async saveReports(
    id: UpdateReportsData['path']['id'],
    data: UpdateReportsData['body'],
  ): Promise<UpdateReportsResponse> {
    return this.coreApiClient.put<UpdateReportsResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/reports`,
        data,
      },
      asSystem(),
    );
  }

  async postAction(
    id: ExecuteActionData['path']['id'],
    action: ExecuteActionData['path']['action'],
  ): Promise<DataProduct> {
    return this.coreApiClient.post<ExecuteActionResponse>(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/${action}`,
      },
      asSystem(),
    );
  }
}
