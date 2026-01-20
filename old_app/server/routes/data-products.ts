import { Router } from 'express'
import { canonicalizeQuery } from '../middleware/canonicalizeQuery'
import { createAsyncRouteHandlers } from '../utils/express/create-async-route-handlers'
import { ROUTE_PATHS } from '../utils/route-definitions'
import { type DataProductController } from '../controllers/data-product.controller'

export const createDataProductRouter = (dataProductController: DataProductController) => {
  const router = Router({ mergeParams: true })
  const { get, post, put } = createAsyncRouteHandlers(router)

  get(ROUTE_PATHS.dataProducts, canonicalizeQuery(), dataProductController.index)

  get(ROUTE_PATHS.dataProductsCreate, dataProductController.new)

  post(ROUTE_PATHS.dataProductsCreate, dataProductController.create)

  get(ROUTE_PATHS.dataProduct, dataProductController.show)

  put(ROUTE_PATHS.dataProduct, dataProductController.update)

  get(ROUTE_PATHS.dataProductPreview, dataProductController.showPreview)

  post(ROUTE_PATHS.dataProductPreview, dataProductController.preview)

  post(ROUTE_PATHS.dataProductApproveAndPublish, dataProductController.approveAndPublish)

  return router
}
