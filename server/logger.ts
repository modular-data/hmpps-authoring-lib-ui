import bunyan from 'bunyan'
import bunyanFormat from 'bunyan-format'

const formatOut = bunyanFormat({ outputMode: 'short', color: false })

export const logger = bunyan.createLogger({ name: 'HMPPS Authoring UI', stream: formatOut, level: 'debug' })
