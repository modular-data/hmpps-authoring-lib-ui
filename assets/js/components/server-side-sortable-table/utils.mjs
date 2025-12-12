import { ARIA_SORT_DIRECTION_ORDER, AriaSortDirection, SortDirection } from './constants.mjs'

export const getNextAriaSortDirection = currentAriaSortDirection => {
  const currentIndex = ARIA_SORT_DIRECTION_ORDER.indexOf(currentAriaSortDirection)
  const nextIndex = (currentIndex + 1) % ARIA_SORT_DIRECTION_ORDER.length

  return ARIA_SORT_DIRECTION_ORDER[nextIndex]
}

export const getSortDirection = ariaSortDirection => {
  const lookupMap = {
    [AriaSortDirection.None]: null,
    [AriaSortDirection.Ascending]: SortDirection.Asc,
    [AriaSortDirection.Descending]: SortDirection.Desc,
  }

  return lookupMap[ariaSortDirection]
}

export const getAriaSortDirection = sortDirection => {
  const lookupMap = {
    [SortDirection.Asc]: AriaSortDirection.Ascending,
    [SortDirection.Desc]: AriaSortDirection.Descending,
  }

  if (!sortDirection) {
    return 'none'
  }

  return lookupMap[sortDirection]
}
