import { ConfigurableComponent } from 'govuk-frontend'

export class FormManager extends ConfigurableComponent {
  static moduleName = 'app-form-manager'

  static defaults = Object.freeze({
    dependentFormSelectors: '',
  })

  static schema = Object.freeze({
    properties: {
      dependentFormSelectors: { type: 'string' },
    },
  })

  static shouldDisableElement(element) {
    const isHidden = element.type === 'hidden'
    const isAlreadyDisabled = element.disabled

    return !isHidden && !isAlreadyDisabled
  }

  static isSubmitControl(element) {
    if (element.tagName === 'BUTTON') {
      return element.type === 'submit' || element.type === ''
    }

    if (element.tagName === 'INPUT') {
      return element.type === 'submit'
    }

    return false
  }

  constructor($root, config = {}) {
    super($root, config)

    this.registerEventListeners()
  }

  getFormElements() {
    return Array.from(this.$root.elements)
  }

  getDependentSubmitControls() {
    const { dependentFormSelectors } = this.config

    if (!dependentFormSelectors) {
      return []
    }

    const dependentForms = Array.from(document.querySelectorAll(dependentFormSelectors))
    const dependentFormElements = dependentForms.flatMap(form => Array.from(form.elements))

    return dependentFormElements.filter(element => FormManager.isSubmitControl(element))
  }

  getElementsToDisable() {
    return [...this.getFormElements(), ...this.getDependentSubmitControls()].filter(element => {
      return FormManager.shouldDisableElement(element)
    })
  }

  registerEventListeners() {
    this.$root.addEventListener('submit', this.handleFormSubmit.bind(this))
  }

  handleFormSubmit() {
    setTimeout(() => {
      this.getElementsToDisable().forEach(element => {
        // eslint-disable-next-line no-param-reassign
        element.disabled = true
      })
    }, 0)
  }
}
