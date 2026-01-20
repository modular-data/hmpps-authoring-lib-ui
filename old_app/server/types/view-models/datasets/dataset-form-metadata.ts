import { type DataSourceReferences } from '../../entities/data-source'
import { type TagReferences } from '../../entities/tag'

export interface DatasetFormMetadata {
  dataSources: DataSourceReferences
  tags: TagReferences
}
