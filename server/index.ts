import path from 'path'

export { createDataAccess } from './data'
export { createServices } from './services'
export { configureNunjucksGlobals, configureNunjucksFilters } from './utils/nunjucksSetup'
export { createRouter } from './routes'

export const getAssetsPath = (): string => {
  return path.join(__dirname, 'assets')
}

export const getViewsPath = (): string => {
  return path.join(__dirname, 'views')
}
