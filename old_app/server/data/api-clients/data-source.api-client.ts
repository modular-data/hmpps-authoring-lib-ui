import { type SupabaseClient } from '@supabase/supabase-js'
import { type DataSource, type DataSourceId } from '../../types/entities/data-source'
import { mapSupabaseRowToDataSource, type SupabaseDataSourceRow } from '../supabase/helpers/data-source-remapper'

// TODO: Prototype: Fully review this file after first priority tasks

export class DataSourceApiClient {
  private static readonly TABLE_NAME = 'datasources'

  constructor(private readonly supabaseClient: SupabaseClient) {}

  async getList(): Promise<DataSource[]> {
    let data
    let error
    try {
      const result = await this.supabaseClient
        .from(DataSourceApiClient.TABLE_NAME)
        .select('*')
        .order('name', { ascending: true })
      data = result.data
      error = result.error
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to fetch data sources: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (error) {
      throw new Error(`Failed to fetch data sources: ${error.message}`)
    }

    if (!data) {
      return []
    }

    return (data as SupabaseDataSourceRow[]).map(mapSupabaseRowToDataSource)
  }

  async getById(id: DataSourceId): Promise<DataSource> {
    let data
    let error
    try {
      const result = await this.supabaseClient.from(DataSourceApiClient.TABLE_NAME).select('*').eq('id', id).single()
      data = result.data
      error = result.error
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      throw new Error(
        `Failed to fetch data source: ${errorMessage}. Please check your Supabase configuration and ensure the service is running.`,
      )
    }

    if (error) {
      throw new Error(`Failed to fetch data source: ${error.message}`)
    }

    if (!data) {
      throw new Error(`Data source with id ${id} not found`)
    }

    return mapSupabaseRowToDataSource(data as SupabaseDataSourceRow)
  }
}
