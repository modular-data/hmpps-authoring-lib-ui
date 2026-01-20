import { ProgressBar } from '../../../components/progress-bar.mjs'
import { logger } from '../../../utils/logger.mjs'

const getPreviewNewTabInitialContent = () => {
  const template = document.getElementById('data-product-preview-loading-page-template')

  return template.innerHTML
}

const handlePreviewFormSubmit = async event => {
  const progressBar = ProgressBar.getInstance()
  const newTab = window.open('about:blank', '_blank')

  if (!newTab) {
    return
  }

  event.preventDefault()

  const { target: form, submitter } = event
  const url = submitter.formAction || form.action
  const formData = new FormData(form)

  newTab.document.write(getPreviewNewTabInitialContent())

  try {
    progressBar?.show()

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': formData.get('_csrf'),
      },
    })

    if (!response.ok) {
      throw new Error('The data product preview request has failed.')
    }

    const data = await response.json()

    newTab.location = data.redirectUrl
    newTab.focus()
  } catch (error) {
    logger.error(error)
    newTab.close()
    window.focus()
  } finally {
    progressBar?.hide()
    window.location.replace(window.location.href)
  }
}

const handleActionsFormSubmit = async event => {
  const { submitter } = event

  if (submitter.getAttribute('data-action') === 'preview') {
    await handlePreviewFormSubmit(event)
  }
}

const init = () => {
  const actionsForm = document.querySelector('#data-product-actions-form')

  actionsForm.addEventListener('submit', handleActionsFormSubmit)
}

document.addEventListener('DOMContentLoaded', init)
