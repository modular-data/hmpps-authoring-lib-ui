import { Router } from 'express'
import { canonicalizeQuery } from '../middleware/canonicalizeQuery'
import { createAsyncRouteHandlers } from '../utils/express/create-async-route-handlers'
import { ROUTE_PATHS } from '../utils/route-definitions'
import { type DatasetController } from '../controllers/dataset.controller'

export const createDatasetRouter = (datasetController: DatasetController) => {
  const router = Router({ mergeParams: true })
  const { get, post, put } = createAsyncRouteHandlers(router)

  get(ROUTE_PATHS.datasets, canonicalizeQuery(), datasetController.index)

  get(ROUTE_PATHS.datasetsCreate, datasetController.new)

  post(ROUTE_PATHS.datasetsCreate, datasetController.create)

  get(ROUTE_PATHS.dataset, datasetController.show)

  put(ROUTE_PATHS.dataset, datasetController.update)

  get(ROUTE_PATHS.datasetPreview, datasetController.showPreview)

  post(ROUTE_PATHS.datasetPreview, datasetController.preview)

  post(ROUTE_PATHS.datasetApproveAndPublish, datasetController.approveAndPublish)

  return router
}
