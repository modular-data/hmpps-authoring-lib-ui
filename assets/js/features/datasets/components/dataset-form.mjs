import { SqlEditor } from '../../../components/sql-editor.mjs'
import { logger } from '../../../utils/logger.mjs'

// TODO: Prototype: Fully review this file after first priority tasks

export const initDatasetForm = () => {
  const containers = document.querySelectorAll('.sql-editor-container')

  containers.forEach(container => {
    try {
      // eslint-disable-next-line no-unused-vars
      const sqlEditor = new SqlEditor(container)
    } catch (error) {
      logger.error('Failed to initialize SQL editor:', error)
    }
  })
}
