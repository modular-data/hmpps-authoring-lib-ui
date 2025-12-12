import { SortableTable } from '@ministryofjustice/frontend'
import debounce from 'debounce'
import {
  PAGINATION_KEYS,
  SORT_KEY_ATTRIBUTE,
  SORT_SEARCH_PARAMS_KEY,
  URL_CHANGES_APPLY_DEBOUNCE_MS,
} from './constants.mjs'
import { getAriaSortDirection, getNextAriaSortDirection, getSortDirection } from './utils.mjs'

export class ServerSideSortableTable extends SortableTable {
  static moduleName = 'app-server-side-sortable-table'

  static applyChangesToUrl(sortKey, newAriaSortDirection) {
    const newSortDirection = getSortDirection(newAriaSortDirection)
    const newSort = newSortDirection && `${sortKey},${newSortDirection}`

    const url = new URL(window.location.href)
    const currentSort = url.searchParams.get(SORT_SEARCH_PARAMS_KEY)

    if (currentSort !== newSort) {
      if (newSort) {
        url.searchParams.set(SORT_SEARCH_PARAMS_KEY, newSort)
      } else {
        url.searchParams.delete(SORT_SEARCH_PARAMS_KEY)
      }

      PAGINATION_KEYS.forEach(paginationKey => {
        url.searchParams.delete(paginationKey)
      })

      window.location.href = url.toString()
    }
  }

  static debouncedApplyUrlChanges = debounce(ServerSideSortableTable.applyChangesToUrl, URL_CHANGES_APPLY_DEBOUNCE_MS)

  onSortButtonClick(event) {
    const $target = /** @type {HTMLElement} */ (event.target)
    const $button = $target.closest('button')

    if (!$button || !($button instanceof HTMLButtonElement) || !$button.parentElement) {
      return
    }

    const $heading = $button.parentElement

    const sortKey = $heading.getAttribute(SORT_KEY_ATTRIBUTE)
    const ariaSortDirection = $heading.getAttribute('aria-sort')
    const newAriaSortDirection = getNextAriaSortDirection(ariaSortDirection)

    this.setButtonSorting($button, newAriaSortDirection)

    ServerSideSortableTable.debouncedApplyUrlChanges(sortKey, newAriaSortDirection)
  }

  setAriaSortValuesFromUrl() {
    const sort = new URLSearchParams(window.location.search).get(SORT_SEARCH_PARAMS_KEY)
    const [sortKey, sortDirection] = (sort || '').split(',')

    if (!sortKey || !sortDirection) {
      return
    }

    const $heading = this.$headings.find(h => h.getAttribute(SORT_KEY_ATTRIBUTE) === sortKey)

    if ($heading) {
      const $button = $heading.querySelector('button')

      const ariaSortDirection = getAriaSortDirection(sortDirection)

      this.setButtonSorting($button, ariaSortDirection)
    }
  }

  initialiseSortedColumn() {
    this.setAriaSortValuesFromUrl()
    super.initialiseSortedColumn()
  }

  setButtonSorting($button, ariaSortDirection) {
    this.removeButtonStates()
    this.updateButtonState($button, ariaSortDirection)
    this.updateDirectionIndicators()
  }

  // eslint-disable-next-line class-methods-use-this
  sort($rows) {
    return $rows // no-op - sorting is performed server-side
  }
}
