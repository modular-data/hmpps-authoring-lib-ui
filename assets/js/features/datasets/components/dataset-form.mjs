import { SqlEditor } from '../../../components/sql-editor.mjs'

// TODO: Prototype: Fully review this file after first priority tasks

export const initDatasetForm = () => {
  const containers = document.querySelectorAll('.sql-editor-container')

  containers.forEach(container => {
    try {
      // eslint-disable-next-line no-unused-vars
      const sqlEditor = new SqlEditor(container)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to initialize SQL editor:', error)
    }
  })
}
