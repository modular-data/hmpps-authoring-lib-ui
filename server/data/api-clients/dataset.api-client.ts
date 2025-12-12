import { type SupabaseClient } from '@supabase/supabase-js'
import { Parser } from 'node-sql-parser'
import {
  type Dataset,
  type DatasetId,
  type DatasetAction,
  type DatasetsFiltersMetadata,
  type PaginatedDatasets,
  DatasetState,
} from '../../types/entities/dataset'
import { type TagReference } from '../../types/entities/tag'
import { type CreateDatasetDto } from '../../schemas/dataset/dto/create-dataset.dto'
import { type UpdateDatasetDto } from '../../schemas/dataset/dto/update-dataset.dto'
import { type GetDatasetsQueryDto } from '../../schemas/dataset/dto/get-datasets-query.dto'
import {
  mapSupabaseRowToDataset,
  mapDatasetToSupabaseInsert,
  mapDatasetToSupabaseUpdate,
  type SupabaseDatasetRow,
  type SupabaseDatasetTagRow,
  type SupabaseDatasetLinkedDataProductRow,
  type SupabaseDataSourceRow,
  type SupabaseTagRow,
  type SupabaseDataProductRow,
} from '../supabase/helpers/dataset-remapper'
import { ValidationError } from '../../errors'

// TODO: Prototype: Fully review this file after first priority tasks

export class DatasetApiClient {
  private static readonly TABLE_NAME = 'datasets'

  private static readonly TAGS_TABLE_NAME = 'dataset_tags'

  private static readonly LINKED_DATA_PRODUCTS_TABLE_NAME = 'dataset_linked_data_products'

  private static readonly parser = new Parser()

  constructor(private readonly supabaseClient: SupabaseClient) {}

  async create(data: CreateDatasetDto): Promise<Dataset> {
    const validationError = DatasetApiClient.validateSql(data.query)

    if (validationError) {
      throw ValidationError.fromApi([{ path: ['query'], message: validationError }])
    }

    const datasetInsert = mapDatasetToSupabaseInsert({
      name: data.name,
      domain: { id: data.domainId, name: data.domainName },
      dataSource: { id: data.dataSourceId, name: '' },
      state: DatasetState.Draft,
      description: data.description ?? null,
      query: data.query,
      isBookmarked: false,
      metadata: {
        owner: data.metadata.owner,
        version: data.metadata.version,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        previewedAt: null,
      },
    })

    let insertedDataset
    let datasetError
    try {
      const result = await this.supabaseClient.from(DatasetApiClient.TABLE_NAME).insert(datasetInsert).select().single()
      insertedDataset = result.data
      datasetError = result.error
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to create dataset: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (datasetError || !insertedDataset) {
      throw new Error(`Failed to create dataset: ${datasetError?.message ?? 'Unknown error'}`)
    }

    const inserted = insertedDataset as SupabaseDatasetRow

    if (data.tags && data.tags.length > 0) {
      const tagInserts: SupabaseDatasetTagRow[] = data.tags.map(tagId => ({
        dataset_id: inserted.id,
        tag_id: tagId,
      }))

      let tagsError
      try {
        const result = await this.supabaseClient.from(DatasetApiClient.TAGS_TABLE_NAME).insert(tagInserts)
        tagsError = result.error
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        throw new Error(`Failed to create dataset tags: ${errorMessage}. Please check your Supabase configuration.`)
      }

      if (tagsError) {
        throw new Error(`Failed to create dataset tags: ${tagsError.message}`)
      }
    }

    return this.getById(inserted.id)
  }

  async getList(query: GetDatasetsQueryDto): Promise<PaginatedDatasets> {
    let queryBuilder = this.supabaseClient.from(DatasetApiClient.TABLE_NAME).select('*', { count: 'exact' })

    if (query.filters) {
      if (query.filters.search) {
        queryBuilder = queryBuilder.or(
          `name.ilike.%${query.filters.search}%,description.ilike.%${query.filters.search}%`,
        )
      }

      if (query.filters.owner) {
        queryBuilder = queryBuilder.eq('metadata->>owner', query.filters.owner)
      }

      if (query.filters.version) {
        queryBuilder = queryBuilder.eq('version', query.filters.version)
      }

      if (query.filters.states && query.filters.states.length > 0) {
        queryBuilder = queryBuilder.in('state', query.filters.states)
      }

      if (query.filters.createdAt) {
        if (query.filters.createdAt.from) {
          queryBuilder = queryBuilder.gte('metadata->>createdAt', query.filters.createdAt.from)
        }

        if (query.filters.createdAt.to) {
          queryBuilder = queryBuilder.lte('metadata->>createdAt', query.filters.createdAt.to)
        }
      }

      if (query.filters.updatedAt) {
        if (query.filters.updatedAt.from) {
          queryBuilder = queryBuilder.gte('metadata->>updatedAt', query.filters.updatedAt.from)
        }

        if (query.filters.updatedAt.to) {
          queryBuilder = queryBuilder.lte('metadata->>updatedAt', query.filters.updatedAt.to)
        }
      }

      if (query.filters.previewedAt) {
        if (query.filters.previewedAt.from) {
          queryBuilder = queryBuilder.gte('metadata->>previewedAt', query.filters.previewedAt.from)
        }

        if (query.filters.previewedAt.to) {
          queryBuilder = queryBuilder.lte('metadata->>previewedAt', query.filters.previewedAt.to)
        }
      }
    }

    if (query.sort) {
      const [field, direction] = query.sort.split(',')
      queryBuilder = queryBuilder.order(field, { ascending: direction !== 'desc' })
    } else {
      queryBuilder = queryBuilder.order('created_at', { ascending: false })
    }

    const page = query.page ? parseInt(query.page, 10) : 0
    const size = query.size ? parseInt(query.size, 10) : 20
    const from = page * size
    const to = from + size - 1

    queryBuilder = queryBuilder.range(from, to)

    let data
    let error
    let count
    try {
      const result = await queryBuilder
      data = result.data
      error = result.error
      count = result.count
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to fetch datasets: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (error) {
      throw new Error(`Failed to fetch datasets: ${error.message}`)
    }

    if (!data) {
      return this.createEmptyPaginatedResponse()
    }

    const datasets = await Promise.all((data as SupabaseDatasetRow[]).map(row => this.enrichDataset(row)))

    return {
      content: datasets,
      first: page === 0,
      last: count ? page >= Math.ceil(count / size) - 1 : true,
      number: page,
      size,
      totalPages: count ? Math.ceil(count / size) : 0,
      totalElements: count ?? 0,
      numberOfElements: datasets.length,
      empty: datasets.length === 0,
      pageable: {
        pageNumber: page,
        pageSize: size,
        offset: from,
        paged: true,
        unpaged: false,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
      },
      sort: {
        empty: false,
        unsorted: false,
        sorted: true,
      },
    }
  }

  async getById(id: DatasetId): Promise<Dataset> {
    let dataset
    let datasetError
    try {
      const result = await this.supabaseClient.from(DatasetApiClient.TABLE_NAME).select('*').eq('id', id).single()
      dataset = result.data
      datasetError = result.error
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to fetch dataset: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (datasetError || !dataset) {
      throw new Error(`Failed to fetch dataset: ${datasetError?.message ?? 'Dataset not found'}`)
    }

    return this.enrichDataset(dataset as SupabaseDatasetRow)
  }

  async update(data: UpdateDatasetDto): Promise<Dataset> {
    const validationError = DatasetApiClient.validateSql(data.query)

    if (validationError) {
      throw ValidationError.fromApi([{ path: ['query'], message: validationError }])
    }

    const existingDataset = await this.getById(data.id)

    const updateData = mapDatasetToSupabaseUpdate({
      name: data.name,
      domain: data.domainId && data.domainName ? { id: data.domainId, name: data.domainName } : undefined,
      dataSource: data.dataSourceId ? { id: data.dataSourceId, name: '' } : undefined,
      description: data.description,
      query: data.query,
      metadata: data.metadata
        ? {
            owner: data.metadata.owner,
            version: data.metadata.version,
            createdAt: existingDataset.metadata.createdAt,
            updatedAt: new Date().toISOString(),
            previewedAt: existingDataset.metadata.previewedAt,
          }
        : undefined,
    })

    let updatedDataset
    let updateError
    try {
      const result = await this.supabaseClient
        .from(DatasetApiClient.TABLE_NAME)
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
          metadata: updateData.metadata
            ? {
                ...updateData.metadata,
                updatedAt: new Date().toISOString(),
              }
            : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        .eq('id', data.id)
        .select()
        .single()
      updatedDataset = result.data
      updateError = result.error
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to update dataset: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (updateError || !updatedDataset) {
      throw new Error(`Failed to update dataset: ${updateError?.message ?? 'Unknown error'}`)
    }

    const updated = updatedDataset as SupabaseDatasetRow

    if (data.tags !== undefined) {
      try {
        await this.supabaseClient.from(DatasetApiClient.TAGS_TABLE_NAME).delete().eq('dataset_id', data.id)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        throw new Error(`Failed to delete dataset tags: ${errorMessage}. Please check your Supabase configuration.`)
      }

      if (data.tags.length > 0) {
        const tagInserts: SupabaseDatasetTagRow[] = data.tags.map(tagId => ({
          dataset_id: data.id,
          tag_id: tagId,
        }))

        let tagsError
        try {
          const result = await this.supabaseClient.from(DatasetApiClient.TAGS_TABLE_NAME).insert(tagInserts)
          tagsError = result.error
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          throw new Error(`Failed to update dataset tags: ${errorMessage}. Please check your Supabase configuration.`)
        }

        if (tagsError) {
          throw new Error(`Failed to update dataset tags: ${tagsError.message}`)
        }
      }
    }

    return this.getById(data.id)
  }

  async getFiltersMetadata(): Promise<DatasetsFiltersMetadata> {
    let tagsResult
    let statesResult
    try {
      ;[tagsResult, statesResult] = await Promise.all([
        this.supabaseClient.from('tags').select('id, name'),
        this.supabaseClient.from(DatasetApiClient.TABLE_NAME).select('state'),
      ])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to fetch filters metadata: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    const tags: TagReference[] =
      (tagsResult.data as SupabaseTagRow[] | null)?.map(tag => ({ id: tag.id, name: tag.name })) ?? []
    const uniqueStates = new Set<DatasetState>()
    ;(statesResult.data as SupabaseDatasetRow[] | null)?.forEach(row => {
      if (row.state) {
        uniqueStates.add(row.state as DatasetState)
      }
    })

    return {
      tags,
      states: Array.from(uniqueStates),
    }
  }

  async postAction(id: DatasetId, action: DatasetAction): Promise<void> {
    let error
    try {
      const result = await this.supabaseClient
        .from(DatasetApiClient.TABLE_NAME)
        .update({
          updated_at: new Date().toISOString(),
          metadata: {
            updatedAt: new Date().toISOString(),
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        .eq('id', id)
      error = result.error
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to perform action ${action}: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (error) {
      throw new Error(`Failed to perform action ${action}: ${error.message}`)
    }
  }

  private async enrichDataset(datasetRow: SupabaseDatasetRow): Promise<Dataset> {
    let dataSourceResult
    let tagsResult
    let linkedDataProductsResult
    try {
      ;[dataSourceResult, tagsResult, linkedDataProductsResult] = await Promise.all([
        this.supabaseClient.from('datasources').select('id, name').eq('id', datasetRow.datasource_id).single(),
        this.supabaseClient
          .from(DatasetApiClient.TAGS_TABLE_NAME)
          .select('tag_id')
          .eq('dataset_id', datasetRow.id)
          .then(async result => {
            if (!result.data || result.data.length === 0) {
              return []
            }
            const tagIds = (result.data as SupabaseDatasetTagRow[]).map(row => row.tag_id)

            return this.supabaseClient
              .from('tags')
              .select('id, name')
              .in('id', tagIds)
              .then(response => (response.data as SupabaseTagRow[] | null) ?? [])
          }),
        this.supabaseClient
          .from(DatasetApiClient.LINKED_DATA_PRODUCTS_TABLE_NAME)
          .select('data_product_id')
          .eq('dataset_id', datasetRow.id)
          .then(async result => {
            if (!result.data || result.data.length === 0) {
              return []
            }
            const dpIds = (result.data as SupabaseDatasetLinkedDataProductRow[]).map(row => row.data_product_id)

            return this.supabaseClient
              .from('data_products')
              .select('id, name')
              .in('id', dpIds)
              .then(dpResult => (dpResult.data as SupabaseDataProductRow[] | null) ?? [])
          }),
      ])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to enrich dataset: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    const dataSource: SupabaseDataSourceRow | undefined = dataSourceResult.data as SupabaseDataSourceRow | undefined
    const tags: SupabaseTagRow[] = tagsResult ?? []
    const linkedDataProducts: SupabaseDataProductRow[] = linkedDataProductsResult ?? []

    return mapSupabaseRowToDataset(datasetRow, dataSource, tags, linkedDataProducts)
  }

  private createEmptyPaginatedResponse(): PaginatedDatasets {
    return {
      content: [],
      first: true,
      last: true,
      number: 0,
      size: 20,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      empty: true,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        offset: 0,
        paged: true,
        unpaged: false,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
      },
      sort: {
        empty: false,
        unsorted: false,
        sorted: true,
      },
    }
  }

  private static validateSql(sql: string): string | null {
    if (!sql || sql.trim().length === 0) {
      return 'SQL query cannot be empty'
    }

    try {
      DatasetApiClient.parser.astify(sql)

      return null
    } catch (error) {
      return 'The SQL query is incorrect.'
    }
  }
}
