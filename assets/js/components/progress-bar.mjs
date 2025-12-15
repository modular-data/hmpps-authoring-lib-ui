const SELECTOR = '.progress-bar'
const VISIBLE_CLASS = 'progress-bar--visible'

export class ProgressBar {
  static instance

  static getInstance() {
    const progressBarElement = document.querySelector(SELECTOR)

    if (!progressBarElement) {
      console.warn(`Progress bar element "${SELECTOR}" not found`)

      return null
    }

    if (!ProgressBar.instance) {
      ProgressBar.instance = new ProgressBar(progressBarElement)
    }

    return ProgressBar.instance
  }

  #element

  #hideTimeout

  constructor(element) {
    this.#element = element
    this.#hideTimeout = null
  }

  show() {
    clearTimeout(this.#hideTimeout)

    this.#element.classList.add(VISIBLE_CLASS)
    this.#element.removeAttribute('aria-hidden')
  }

  hide(delay = 200) {
    clearTimeout(this.#hideTimeout)

    this.#hideTimeout = window.setTimeout(() => {
      this.#element.classList.remove(VISIBLE_CLASS)
      this.#element.setAttribute('aria-hidden', 'true')
    }, delay)
  }
}
