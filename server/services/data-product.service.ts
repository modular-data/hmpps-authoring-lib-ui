import {
  type DataProduct,
  type DataProductAction,
  type DataProductId,
  type DataProductsFiltersMetadata,
  type PaginatedDataProducts,
} from '../types/entities/data-product'
import { type DataProductFormMetadata } from '../types/view-models/data-products/data-product-form-metadata'
import { type CreateDataProductDto } from '../schemas/data-product/dto/create-data-product.dto'
import { type GetDataProductsQueryDto } from '../schemas/data-product/dto/get-data-products-query.dto'
import { type DataProductApiClient } from '../data/api-clients'
import { type DomainService } from './domain.service'
import { type AssetService } from './asset.service'
import { type OutputService } from './output.service'
import { type PolicyService } from './policy.service'
import { type TagService } from './tag.service'
import { type HmppsUser } from '../types/entities/hmpps-user'
import { DATA_PRODUCT_DEFAULT_VERSION } from '../constants/data-products'
import {
  type DataProductFormDefaultValues,
  type DataProductFormValues,
} from '../schemas/data-product/data-product-form.schema'
import { type UpdateDataProductDto } from '../schemas/data-product/dto/update-data-product.dto'

export class DataProductService {
  constructor(
    private readonly dataProductApiClient: DataProductApiClient,
    private readonly domainService: DomainService,
    private readonly assetService: AssetService,
    private readonly outputService: OutputService,
    private readonly policyService: PolicyService,
    private readonly tagService: TagService,
  ) {}

  async create(data: CreateDataProductDto): Promise<DataProduct> {
    return this.dataProductApiClient.create(data)
  }

  async getList(query: GetDataProductsQueryDto): Promise<PaginatedDataProducts> {
    return this.dataProductApiClient.getList(query)
  }

  async getById(id: DataProductId): Promise<DataProduct> {
    return this.dataProductApiClient.getById(id)
  }

  async update(data: UpdateDataProductDto): Promise<DataProduct> {
    return this.dataProductApiClient.update(data)
  }

  async getFiltersMetadata(): Promise<DataProductsFiltersMetadata> {
    return this.dataProductApiClient.getFiltersMetadata()
  }

  async getFormMetadata(): Promise<DataProductFormMetadata> {
    const [assetsByType, outputsByType, policies, tags] = await Promise.all([
      this.assetService.getListGroupedByType(),
      this.outputService.getListGroupedByType(),
      this.policyService.getList(),
      this.tagService.getList(),
    ])

    return {
      assetReferencesByType: assetsByType,
      outputReferencesByType: outputsByType,
      policies,
      tags,
    }
  }

  async getCreateFormValues(currentUser: HmppsUser): Promise<DataProductFormDefaultValues> {
    const domain = await this.domainService.getActiveDomainForUser()

    return {
      domainId: domain?.id,
      domainName: domain?.name,
      metadata: {
        owner: currentUser.displayName,
        author: currentUser.displayName,
        version: DATA_PRODUCT_DEFAULT_VERSION,
      },
    }
  }

  getFormValues(dataProduct: DataProduct): DataProductFormValues {
    return DataProductService.mapDataProductToFormValues(dataProduct)
  }

  async performAction(id: DataProductId, action: DataProductAction): Promise<void> {
    return this.dataProductApiClient.postAction(id, action)
  }

  private static mapDataProductToFormValues(dataProduct: DataProduct): DataProductFormValues {
    const { name, description, domain, metadata, assets, outputs, policies, tags } = dataProduct

    return {
      name,
      description,
      domainId: domain.id,
      domainName: domain.name,
      metadata,
      assets: Object.entries(assets).reduce((accumulator, [assetType, assetReferences]) => {
        return {
          ...accumulator,
          [assetType]: assetReferences.map(assetReference => assetReference.id),
        }
      }, {}),
      outputs: Object.entries(outputs).reduce((accumulator, [outputType, outputReferences]) => {
        return {
          ...accumulator,
          [outputType]: outputReferences.map(outputReference => outputReference.id),
        }
      }, {}),
      policies: policies.map(policy => policy.id),
      tags: tags.map(tag => tag.id),
    }
  }
}
