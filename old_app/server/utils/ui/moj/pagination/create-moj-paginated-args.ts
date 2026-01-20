import { type Paginated } from '../../../../types/entities/pagination'
import {
  type MojPaginationItem,
  type MojPaginationItems,
  type MojPaginationLink,
  type MojPaginationArgs,
  type MojPaginationResults,
} from '../../../../types/ui/moj/pagination'
import { mergeQueryParams, stringifyQueryParams } from '../../../queryParams'

const createPagesToShow = (totalPages: number, currentPage: number, windowSize = 1): number[] => {
  const pages = new Set([1, totalPages])

  for (let page = currentPage - windowSize; page <= currentPage + windowSize; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page)
    }
  }

  return Array.from(pages).sort((pageA, pageB) => pageA - pageB)
}

const createMojPaginationItems = (
  pages: number[],
  currentPage: number,
  buildHref: (page: number) => string,
): MojPaginationItems => {
  return pages.reduce<MojPaginationItem[]>((accumulator, page, index) => {
    const previousPage = pages[index - 1]

    if (index > 0 && page - previousPage > 1) {
      accumulator.push({ type: 'dots' })
    }

    accumulator.push({
      text: page.toString(),
      href: buildHref(page),
      selected: page === currentPage,
    })

    return accumulator
  }, [])
}

const createMojPaginationLink = (text: string, href: string, shouldCreate: boolean): MojPaginationLink | undefined => {
  if (!shouldCreate) {
    return undefined
  }

  return {
    text,
    href,
  }
}

export const createMojPaginationArgs = (
  paginatedData: Paginated<unknown>,
  queryParams?: Record<string, unknown>,
): MojPaginationArgs | null => {
  const { first, last, totalPages, totalElements, numberOfElements, number, pageable } = paginatedData
  const { offset } = pageable

  if (totalPages <= 1) {
    return null
  }

  const currentPage = number + 1

  const hrefBuilder = (page: number): string => {
    const mergedQueryParams = mergeQueryParams(queryParams, { page: page - 1 })

    return stringifyQueryParams(mergedQueryParams)
  }

  const pagesToShow = createPagesToShow(totalPages, currentPage)
  const items = createMojPaginationItems(pagesToShow, currentPage, hrefBuilder)

  const results: MojPaginationResults = {
    count: totalElements,
    from: Math.min(offset + 1, totalElements),
    to: Math.min(offset + numberOfElements, totalElements),
  }

  return {
    items,
    results,
    previous: createMojPaginationLink('Previous', hrefBuilder(currentPage - 1), !first),
    next: createMojPaginationLink('Next', hrefBuilder(currentPage + 1), !last),
  }
}
