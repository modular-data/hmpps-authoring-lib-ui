import { ConfigurableComponent } from 'govuk-frontend'
import { I18n } from 'govuk-frontend/dist/govuk/i18n.mjs'
import { signal, effect } from '@preact/signals-core'

export class MultiSelect extends ConfigurableComponent {
  static moduleName = 'app-multi-select'

  static defaults = Object.freeze({
    i18n: {
      summary: {
        other: '',
      },
    },
  })

  static schema = Object.freeze({
    properties: {
      i18n: { type: 'object' },
    },
  })

  searchTerm = signal('')

  selectedCount = signal(0)

  constructor($root, config = {}) {
    super($root, config)

    this.i18n = new I18n(this.config.i18n)

    this.lookupDomNodes()
    this.registerEventListeners()
    this.registerEffects()

    this.refreshSelectedCount()
  }

  lookupDomNodes() {
    this.$searchInput = this.$root.querySelector(`.${MultiSelect.moduleName}__search-text-input`)
    this.$checkboxItems = this.$root.querySelectorAll('.govuk-checkboxes__item')
    this.$checkboxes = Array.from(this.$root.querySelectorAll('.govuk-checkboxes__item input[type="checkbox"]'))
    this.$summary = this.$root.querySelector(`[data-${MultiSelect.moduleName}-target="summary"]`)
    this.$noData = this.$root.querySelector(`[data-${MultiSelect.moduleName}-target="noData"]`)
  }

  registerEventListeners() {
    this.$searchInput.addEventListener('input', event => {
      this.searchTerm.value = event.target.value
    })

    this.$root.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        this.refreshSelectedCount()
      }
    })
  }

  registerEffects() {
    effect(() => {
      this.filterCheckboxes(this.searchTerm.value)
    })

    effect(() => {
      this.renderSummary(this.selectedCount.value, this.$checkboxItems.length)
    })
  }

  filterCheckboxes(searchTerm) {
    let visibleCount = 0

    const processedSearchTerm = (searchTerm || '').trim().toLowerCase()

    this.$checkboxItems.forEach($checkboxItem => {
      const $checkboxLabel = $checkboxItem.querySelector('label')
      const processedLabelText = ($checkboxLabel.textContent || '').trim().toLowerCase()
      const isVisible = !processedSearchTerm || processedLabelText.includes(processedSearchTerm)

      $checkboxItem.classList.toggle('govuk-visually-hidden', !isVisible)

      if (isVisible) {
        visibleCount += 1
      }
    })

    this.$noData.classList.toggle('govuk-visually-hidden', visibleCount > 0)
  }

  getAllSelectedValues() {
    return this.$checkboxes.reduce((accumulator, $checkbox) => {
      if ($checkbox.checked) {
        accumulator.push($checkbox.value)
      }

      return accumulator
    }, [])
  }

  refreshSelectedCount() {
    this.selectedCount.value = this.getAllSelectedValues().length
  }

  renderSummary(selected, total) {
    this.$summary.textContent = this.i18n.t('summary', {
      count: selected,
      total,
    })
  }
}
