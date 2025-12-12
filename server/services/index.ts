import { type DataAccess } from '../data'
import { DomainService } from './domain.service'
import { AssetService } from './asset.service'
import { OutputService } from './output.service'
import { PolicyService } from './policy.service'
import { TagService } from './tag.service'
import { DataProductService } from './data-product.service'
import { DataSourceService } from './data-source.service'
import { DatasetService } from './dataset.service'

export const createServices = (dataAccess: DataAccess) => {
  const {
    domainApiClient,
    assetApiClient,
    outputApiClient,
    policyApiClient,
    tagApiClient,
    dataSourceApiClient,
    datasetApiClient,
    dataProductApiClient,
  } = dataAccess

  const domainService = new DomainService(domainApiClient)
  const assetService = new AssetService(assetApiClient)
  const outputService = new OutputService(outputApiClient)
  const policyService = new PolicyService(policyApiClient)
  const tagService = new TagService(tagApiClient)
  const dataSourceService = new DataSourceService(dataSourceApiClient)
  const datasetService = new DatasetService(datasetApiClient, dataSourceService, domainService, tagService)
  const dataProductService = new DataProductService(
    dataProductApiClient,
    domainService,
    assetService,
    outputService,
    policyService,
    tagService,
  )

  return {
    domainService,
    assetService,
    outputService,
    policyService,
    tagService,
    dataSourceService,
    datasetService,
    dataProductService,
  }
}

export type Services = ReturnType<typeof createServices>
