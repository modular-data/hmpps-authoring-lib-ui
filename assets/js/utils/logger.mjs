/* eslint-disable no-console */
export class Logger {
  constructor(name = 'HMPPS Authoring UI') {
    this.prefix = `[${name}]: `
  }

  debug(...args) {
    console.debug(this.prefix, ...args)
  }

  info(...args) {
    console.info(this.prefix, ...args)
  }

  warn(...args) {
    console.warn(this.prefix, ...args)
  }

  error(...args) {
    console.error(this.prefix, ...args)
  }
}

export const logger = new Logger()
