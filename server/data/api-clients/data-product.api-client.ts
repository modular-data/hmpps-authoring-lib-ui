import { asSystem } from '@ministryofjustice/hmpps-rest-client'
import { type CoreApiClient } from './core'
import {
  type DataProduct,
  type DataProductAction,
  type DataProductId,
  type DataProductsFiltersMetadata,
  type PaginatedDataProducts,
} from '../../types/entities/data-product'
import { type CreateDataProductDto } from '../../schemas/data-product/dto/create-data-product.dto'
import { type UpdateDataProductDto } from '../../schemas/data-product/dto/update-data-product.dto'
import { type GetDataProductsQueryDto } from '../../schemas/data-product/dto/get-data-products-query.dto'

export class DataProductApiClient {
  private static readonly ROOT_PATH = '/data-products'

  constructor(private readonly coreApiClient: CoreApiClient) {}

  async create(data: CreateDataProductDto): Promise<DataProduct> {
    return this.coreApiClient.post(
      {
        path: DataProductApiClient.ROOT_PATH,
        data,
      },
      asSystem(),
    )
  }

  async getList(query: GetDataProductsQueryDto): Promise<PaginatedDataProducts> {
    return this.coreApiClient.get(
      {
        path: DataProductApiClient.ROOT_PATH,
        query,
      },
      asSystem(),
    )
  }

  async getById(id: DataProductId): Promise<DataProduct> {
    return this.coreApiClient.get(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}`,
      },
      asSystem(),
    )
  }

  async update(data: UpdateDataProductDto): Promise<DataProduct> {
    return this.coreApiClient.put(
      {
        path: DataProductApiClient.ROOT_PATH,
        data,
      },
      asSystem(),
    )
  }

  async getFiltersMetadata(): Promise<DataProductsFiltersMetadata> {
    return this.coreApiClient.get(
      {
        path: `${DataProductApiClient.ROOT_PATH}/filters`,
      },
      asSystem(),
    )
  }

  async postAction(id: DataProductId, action: DataProductAction): Promise<void> {
    return this.coreApiClient.post(
      {
        path: `${DataProductApiClient.ROOT_PATH}/${id}/${action}`,
      },
      asSystem(),
    )
  }
}
