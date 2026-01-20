import { Router } from 'express'
import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type Services } from '../services'
import { methodOverride } from '../middleware/methodOverride'
import { setUpRouteDefinitions } from '../middleware/setUpRouteDefinitions'
import { setUpPageContext } from '../middleware/setUpPageContext'
import { setUpServiceNavigation } from '../middleware/setUpServiceNavigation'
import { setUpAlerts } from '../middleware/setUpAlerts'
import { ROUTE_PATHS } from '../utils/route-definitions'
import { createControllers } from '../controllers'
import { createDatasetRouter } from './datasets'
import { createDataProductRouter } from './data-products'

export const createRouter = (services: Services, nunjucksEnvironment: NunjucksEnvironment) => {
  const router = Router({ mergeParams: true })
  const { homeController, datasetController, dataProductController } = createControllers(services, nunjucksEnvironment)

  router.use(methodOverride())
  router.use(setUpRouteDefinitions())
  router.use(setUpPageContext())
  router.use(setUpServiceNavigation())
  router.use(setUpAlerts())

  router.get(ROUTE_PATHS.home, homeController.index)
  router.use(createDatasetRouter(datasetController))
  router.use(createDataProductRouter(dataProductController))

  return router
}
