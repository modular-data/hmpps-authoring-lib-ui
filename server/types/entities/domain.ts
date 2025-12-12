import { type Id } from './base'
import { type Paginated } from './pagination'

export type DomainId = Id

export interface Domain {
  id: DomainId
  name: string
}

export type DomainReference = Pick<Domain, 'id' | 'name'>

export type PaginatedDomains = Paginated<Domain>
