import { NO_DATA_PLACEHOLDER } from '../../../constants/common'

interface GdsTableCell extends Record<string, unknown> {
  text?: string
  html?: string
}

type GdsTableRow = GdsTableCell[]

type GdsTableRows = GdsTableRow[]

export const fallbackTableEmptyCells = (rows: GdsTableRows): GdsTableRows => {
  return rows.map(row => {
    return row.map(cell => {
      let contentKey = 'text'

      if (cell.html) {
        contentKey = 'html'
      }

      const content = cell.html || cell.text || ''
      const trimmedContent = content.trim()
      const processedContent = trimmedContent || NO_DATA_PLACEHOLDER

      return {
        ...cell,
        [contentKey]: processedContent,
      }
    })
  })
}
