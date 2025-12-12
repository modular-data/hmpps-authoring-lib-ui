import { type RequestHandler } from 'express'

export class HomeController {
  index: RequestHandler = (_, res) => {
    res.redirect(303, res.locals.routeDefinitions.dataProducts.createUrl())
  }
}
