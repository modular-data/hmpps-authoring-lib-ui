import { type Environment as NunjucksEnvironment } from 'nunjucks'
import { type Services } from '../services'
import { HomeController } from './home.controller'
import { DataProductController } from './data-product.controller'
import { DatasetController } from './dataset.controller'

export const createControllers = (services: Services, nunjucksEnvironment: NunjucksEnvironment) => {
  const { datasetService, dataProductService } = services

  const homeController = new HomeController()
  const datasetController = new DatasetController(datasetService, nunjucksEnvironment)
  const dataProductController = new DataProductController(dataProductService, nunjucksEnvironment)

  return {
    homeController,
    datasetController,
    dataProductController,
  }
}
