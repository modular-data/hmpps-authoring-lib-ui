import { type Id } from './base'

export type DataSourceId = Id

export enum DataSourceConnection {
  Federated = 'federated',
  AwsDataCatalog = 'awsdatacatalog',
  DataWarehouse = 'datawarehouse',
}

export enum DataSourceDialect {
  Oracle11g = 'oracle/11g',
  Postgres19 = 'postgres/19',
  Redshift4 = 'redshift/4',
  Athena3 = 'athena/3',
}

export interface DataSource {
  id: DataSourceId
  name: string
  connection: DataSourceConnection
  dialect: DataSourceDialect
  database: string
  catalog: string
}

export type DataSourceReference = Pick<DataSource, 'id' | 'name'>

export type DataSourceReferences = DataSourceReference[]

export type DataSources = DataSource[]
