import {
  type Dataset,
  type DatasetAction,
  type DatasetId,
  type DatasetsFiltersMetadata,
  type PaginatedDatasets,
} from '../types/entities/dataset'
import { type DatasetFormMetadata } from '../types/view-models/datasets/dataset-form-metadata'
import { type CreateDatasetDto } from '../schemas/dataset/dto/create-dataset.dto'
import { type GetDatasetsQueryDto } from '../schemas/dataset/dto/get-datasets-query.dto'
import { type DatasetApiClient } from '../data/api-clients'
import { type DataSourceService } from './data-source.service'
import { type DomainService } from './domain.service'
import { type TagService } from './tag.service'
import { type HmppsUser } from '../types/entities/hmpps-user'
import { DATASET_DEFAULT_VERSION } from '../constants/datasets'
import { type DatasetFormDefaultValues, type DatasetFormValues } from '../schemas/dataset/dataset-form.schema'
import { type UpdateDatasetDto } from '../schemas/dataset/dto/update-dataset.dto'

export class DatasetService {
  constructor(
    private readonly datasetApiClient: DatasetApiClient,
    private readonly dataSourceService: DataSourceService,
    private readonly domainService: DomainService,
    private readonly tagService: TagService,
  ) {}

  async create(data: CreateDatasetDto): Promise<Dataset> {
    return this.datasetApiClient.create(data)
  }

  async getList(query: GetDatasetsQueryDto): Promise<PaginatedDatasets> {
    return this.datasetApiClient.getList(query)
  }

  async getById(id: DatasetId): Promise<Dataset> {
    return this.datasetApiClient.getById(id)
  }

  async update(data: UpdateDatasetDto): Promise<Dataset> {
    return this.datasetApiClient.update(data)
  }

  async getFiltersMetadata(): Promise<DatasetsFiltersMetadata> {
    return this.datasetApiClient.getFiltersMetadata()
  }

  async getFormMetadata(): Promise<DatasetFormMetadata> {
    const [dataSources, tags] = await Promise.all([this.dataSourceService.getList(), this.tagService.getList()])

    return {
      dataSources,
      tags,
    }
  }

  async getCreateFormValues(currentUser: HmppsUser): Promise<DatasetFormDefaultValues> {
    const domain = await this.domainService.getActiveDomainForUser()

    return {
      domainId: domain?.id,
      domainName: domain?.name,
      metadata: {
        owner: currentUser.displayName,
        version: DATASET_DEFAULT_VERSION,
      },
    }
  }

  getFormValues(dataset: Dataset): DatasetFormValues {
    return DatasetService.mapDatasetToFormValues(dataset)
  }

  async performAction(id: DatasetId, action: DatasetAction): Promise<void> {
    return this.datasetApiClient.postAction(id, action)
  }

  private static mapDatasetToFormValues(dataset: Dataset): DatasetFormValues {
    const { name, domain, dataSource, description, tags, query, metadata } = dataset

    return {
      name,
      domainId: domain.id,
      domainName: domain.name,
      dataSourceId: dataSource.id,
      description,
      tags: tags.map(tag => tag.id),
      query,
      metadata: {
        owner: metadata.owner,
        version: metadata.version,
      },
    }
  }
}
