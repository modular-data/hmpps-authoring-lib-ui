export interface PaginatedSortData {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
  sort: PaginatedSortData
}

export interface Paginated<TEntity> {
  content: TEntity[]
  first: boolean
  last: boolean
  number: number
  size: number
  totalPages: number
  totalElements: number
  numberOfElements: number
  empty: boolean
  pageable: Pageable
  sort: PaginatedSortData
}
