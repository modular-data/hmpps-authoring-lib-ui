import { FilterToggleButton } from '@ministryofjustice/frontend'

const filterNode = document.querySelector('[data-module="moj-filter"]')

const filterToggleButton = new FilterToggleButton(filterNode, {
  startHidden: true,
  toggleButton: {
    showText: 'Show filter',
    hideText: 'Hide filter',
  },
})
