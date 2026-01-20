import path from 'path'
import fs from 'fs'
import { type Environment } from 'nunjucks'
import merge from 'deepmerge'
import mojFilters from '@ministryofjustice/frontend/moj/filters/all'
import { initialiseName } from '../../utils'
import { logger } from '../../../logger'
import { toCheckboxItems } from './toCheckboxItems'
import { fallbackTableEmptyCells } from './fallbackTableEmptyCells'
import { formatPercents } from '../../dataFormat/format-percents'

export const configureNunjucksFilters = (nunjucksEnvironment: Environment) => {
  let assetManifest: Record<string, string> = {}

  try {
    const assetMetadataPath = path.resolve(__dirname, '../../../assets/manifest.json')

    assetManifest = JSON.parse(fs.readFileSync(assetMetadataPath, 'utf8'))
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') {
      logger.error(e, 'Could not read asset manifest file')
    }
  }

  for (const [name, filter] of Object.entries(mojFilters())) {
    nunjucksEnvironment.addFilter(name, filter)
  }

  nunjucksEnvironment.addFilter('initialiseName', initialiseName)
  nunjucksEnvironment.addFilter('authoringAssetMap', (url: string) => assetManifest[url] || url)
  nunjucksEnvironment.addFilter('merge', merge)
  nunjucksEnvironment.addFilter('toCheckboxItems', toCheckboxItems)
  nunjucksEnvironment.addFilter('fallbackTableEmptyCells', fallbackTableEmptyCells)
  nunjucksEnvironment.addFilter('formatPercents', formatPercents)
}
