/* eslint-disable no-param-reassign */
import path from 'path'
import nunjucks, { type Environment as NunjucksEnvironment } from 'nunjucks'
import express from 'express'
import config from '../../config'
import { configureNunjucksGlobals } from './globals/configureNunjucksGlobals'
import { configureNunjucksFilters } from './filters/configureNunjucksFilters'

export function nunjucksSetup(app: express.Express): NunjucksEnvironment {
  app.set('view engine', 'njk')

  app.locals.asset_path = '/assets/'
  app.locals.applicationName = 'HMPPS Authoring'
  app.locals.environmentName = config.environmentName
  app.locals.environmentNameColour = config.environmentName === 'PRE-PRODUCTION' ? 'govuk-tag--green' : ''

  const nunjucksEnvironment = nunjucks.configure(
    [
      path.join(__dirname, '../../../server/views'),
      'node_modules/govuk-frontend/dist/',
      'node_modules/@ministryofjustice/frontend/',
    ],
    {
      autoescape: true,
      express: app,
    },
  )

  configureNunjucksFilters(nunjucksEnvironment)
  configureNunjucksGlobals(nunjucksEnvironment)

  return nunjucksEnvironment
}
