import {
  type DataProduct,
  type DataProductAction,
  type DataProductId,
  type PaginatedDataProducts,
} from '../types/entities/data-product';
import { type CreateDataProductDto } from '../schemas/data-product/dto/create-data-product.dto';
import { type GetDataProductsQueryDto } from '../schemas/data-product/dto/get-data-products-query.dto';
import { type DataProductApiClient } from '../data/api-clients';

export class DataProductService {
  constructor(private readonly dataProductApiClient: DataProductApiClient) {}

  async create(data: CreateDataProductDto): Promise<DataProduct> {
    return this.dataProductApiClient.create(data);
  }

  async getList(
    query: GetDataProductsQueryDto,
  ): Promise<PaginatedDataProducts> {
    return this.dataProductApiClient.getList(query);
  }

  async getById(id: DataProductId): Promise<DataProduct> {
    return this.dataProductApiClient.getById(id);
  }

  async performAction(
    id: DataProductId,
    action: DataProductAction,
  ): Promise<void> {
    return this.dataProductApiClient.postAction(id, action);
  }
}
