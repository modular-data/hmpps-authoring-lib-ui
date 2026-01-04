import path from 'path'

export { createDataAccess, type DataAccess, type DataAccessConfig, type SupabaseClientConfig } from './data'
export { createServices, type Services } from './services'
export { configureNunjucksGlobals, configureNunjucksFilters } from './utils/nunjucksSetup'
export { createRouter } from './routes'

export const getAssetsPath = (): string => {
  return path.join(__dirname, 'assets')
}

export const getViewsPath = (): string => {
  return path.join(__dirname, 'views')
}
