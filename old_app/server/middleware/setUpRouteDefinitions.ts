import { type RequestHandler } from 'express'
import { createRouteDefinitions } from '../utils/route-definitions'

export const setUpRouteDefinitions = (): RequestHandler => {
  return (req, res, next) => {
    const basePath = req.baseUrl ?? ''

    res.locals.basePath = basePath
    res.locals.routeDefinitions = createRouteDefinitions(basePath)

    next()
  }
}
