import { FilterToggleButton } from '@ministryofjustice/frontend'

const initFilter = () => {
  const filterNode = document.querySelector('[data-module="moj-filter"]')

  if (!filterNode) {
    return undefined
  }

  return new FilterToggleButton(filterNode, {
    startHidden: true,
    toggleButton: {
      showText: 'Show filter',
      hideText: 'Hide filter',
    },
  })
}

const init = () => {
  initFilter()
}

document.addEventListener('DOMContentLoaded', init)
