import {
  type DataSource,
  type DataSourceReference,
  DataSourceConnection,
  DataSourceDialect,
} from '../../../types/entities/data-source'

// TODO: Prototype: Fully review this file after first priority tasks

export interface SupabaseDataSourceRow {
  id: string
  name: string
  connection: string
  dialect: string
  database: string
  catalog: string
  created_at: string
  updated_at: string | null
}

export const mapSupabaseRowToDataSource = (row: SupabaseDataSourceRow): DataSource => {
  return {
    id: row.id,
    name: row.name,
    connection: row.connection as DataSourceConnection,
    dialect: row.dialect as DataSourceDialect,
    database: row.database,
    catalog: row.catalog,
  }
}

export const mapSupabaseRowToDataSourceReference = (row: SupabaseDataSourceRow): DataSourceReference => {
  return {
    id: row.id,
    name: row.name,
  }
}

export const mapDataSourceToSupabaseInsert = (
  dataSource: Omit<DataSource, 'id'>,
): Omit<SupabaseDataSourceRow, 'id' | 'created_at' | 'updated_at'> => {
  return {
    name: dataSource.name,
    connection: dataSource.connection,
    dialect: dataSource.dialect,
    database: dataSource.database,
    catalog: dataSource.catalog,
  }
}

export const mapDataSourceToSupabaseUpdate = (
  dataSource: Partial<Omit<DataSource, 'id'>>,
): Partial<Omit<SupabaseDataSourceRow, 'id' | 'created_at' | 'updated_at'>> => {
  const update: Partial<Omit<SupabaseDataSourceRow, 'id' | 'created_at' | 'updated_at'>> = {}

  if (dataSource.name !== undefined) {
    update.name = dataSource.name
  }

  if (dataSource.connection !== undefined) {
    update.connection = dataSource.connection
  }

  if (dataSource.dialect !== undefined) {
    update.dialect = dataSource.dialect
  }

  if (dataSource.database !== undefined) {
    update.database = dataSource.database
  }

  if (dataSource.catalog !== undefined) {
    update.catalog = dataSource.catalog
  }

  return update
}
