import { EditorView, basicSetup } from 'codemirror'
import { sql } from '@codemirror/lang-sql'
import { EditorState } from '@codemirror/state'

// TODO: Prototype: Fully review this file after first priority tasks

export class SqlEditor {
  constructor(container, options = {}) {
    this.container = container
    this.textarea = options.textarea || container.querySelector('textarea')
    this.editorContainer = container.querySelector('.sql-editor')
    this.disabled = options.disabled || container.dataset.disabled === 'true'
    this.view = null

    if (!this.textarea || !this.editorContainer) {
      throw new Error('SqlEditor requires a textarea and editor container element')
    }

    this.initialize()
  }

  initialize() {
    const initialValue = this.textarea.value || ''

    const extensions = [
      basicSetup,
      sql(),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          this.syncToTextarea()
        }
      }),
    ]

    if (this.disabled) {
      extensions.push(EditorState.readOnly.of(true))
      extensions.push(EditorView.editable.of(false))
    }

    this.view = new EditorView({
      doc: initialValue,
      extensions,
      parent: this.editorContainer,
    })

    this.setupFormSync()
  }

  syncToTextarea() {
    if (this.view) {
      const content = this.view.state.doc.toString()
      this.textarea.value = content
    }
  }

  setupFormSync() {
    const form = this.textarea.closest('form')

    if (form) {
      form.addEventListener('submit', () => {
        this.syncToTextarea()
      })
    }
  }

  setValue(value) {
    if (this.view) {
      this.view.dispatch({
        changes: {
          from: 0,
          to: this.view.state.doc.length,
          insert: value || '',
        },
      })
      this.syncToTextarea()
    }
  }

  getValue() {
    return this.view ? this.view.state.doc.toString() : ''
  }

  setDisabled(disabled) {
    this.disabled = disabled

    if (this.view) {
      this.view.dispatch({
        effects: [EditorState.readOnly.reconfigure(disabled), EditorView.editable.reconfigure(!disabled)],
      })
    }
  }

  destroy() {
    if (this.view) {
      this.view.destroy()
      this.view = null
    }
  }
}
