import { type DataProductId } from '../types/entities/data-product'
import { type DatasetId } from '../types/entities/dataset'
import { type DataSourceId } from '../types/entities/data-source'
import { type GetDataProductsQuery } from '../schemas/data-product/dto/get-data-products-query.dto'
import { type GetDatasetsQuery } from '../schemas/dataset/dto/get-datasets-query.dto'
import { stringifyQueryParams } from './queryParams'

// TODO: Revisit routes config to make it prepared for upcoming features. Flat structure was great for the MVP, but must be changed to some sort of tree data structure.
// It will help us to not duplicate path segments for nested routes

const DATA_PRODUCTS_ROOT = '/data-products'
const DATASETS_ROOT = '/datasets'
const DATA_SOURCES_ROOT = '/datasources'

export const ROUTE_PATHS = {
  home: '/',
  dataProducts: DATA_PRODUCTS_ROOT,
  dataProduct: `${DATA_PRODUCTS_ROOT}/:id`,
  dataProductPreview: `${DATA_PRODUCTS_ROOT}/:id/preview`,
  dataProductApproveAndPublish: `${DATA_PRODUCTS_ROOT}/:id/approve-and-publish`,
  dataProductsCreate: `${DATA_PRODUCTS_ROOT}/create`,
  datasets: DATASETS_ROOT,
  dataset: `${DATASETS_ROOT}/:id`,
  datasetPreview: `${DATASETS_ROOT}/:id/preview`,
  datasetApproveAndPublish: `${DATASETS_ROOT}/:id/approve-and-publish`,
  datasetsCreate: `${DATASETS_ROOT}/create`,
  dataSource: `${DATA_SOURCES_ROOT}/:id`,
} as const

export const createRouteDefinitions = (basePath = '') => {
  const routeDefinitions = {
    home: {
      path: ROUTE_PATHS.home,
      createUrl: () => `${basePath}${routeDefinitions.home.path}`,
    },
    dataProducts: {
      path: ROUTE_PATHS.dataProducts,
      createUrl: (queryParams?: GetDataProductsQuery) => {
        const searchString = stringifyQueryParams(queryParams)

        return `${basePath}${routeDefinitions.dataProducts.path}${searchString}`
      },
    },
    dataProduct: {
      path: ROUTE_PATHS.dataProduct,
      createUrl: (id: DataProductId) => `${basePath}${routeDefinitions.dataProduct.path.replace(':id', id)}`,
    },
    dataProductPreview: {
      path: ROUTE_PATHS.dataProductPreview,
      createUrl: (id: DataProductId) => `${basePath}${routeDefinitions.dataProductPreview.path.replace(':id', id)}`,
    },
    dataProductApproveAndPublish: {
      path: ROUTE_PATHS.dataProductApproveAndPublish,
      createUrl: (id: DataProductId) => {
        return `${basePath}${routeDefinitions.dataProductApproveAndPublish.path.replace(':id', id)}`
      },
    },
    dataProductsCreate: {
      path: ROUTE_PATHS.dataProductsCreate,
      createUrl: () => `${basePath}${routeDefinitions.dataProductsCreate.path}`,
    },
    datasets: {
      path: ROUTE_PATHS.datasets,
      createUrl: (queryParams?: GetDatasetsQuery) => {
        const searchString = stringifyQueryParams(queryParams)

        return `${basePath}${routeDefinitions.datasets.path}${searchString}`
      },
    },
    dataset: {
      path: ROUTE_PATHS.dataset,
      createUrl: (id: DatasetId) => `${basePath}${routeDefinitions.dataset.path.replace(':id', id)}`,
    },
    datasetPreview: {
      path: ROUTE_PATHS.datasetPreview,
      createUrl: (id: DatasetId) => `${basePath}${routeDefinitions.datasetPreview.path.replace(':id', id)}`,
    },
    datasetApproveAndPublish: {
      path: ROUTE_PATHS.datasetApproveAndPublish,
      createUrl: (id: DatasetId) => {
        return `${basePath}${routeDefinitions.datasetApproveAndPublish.path.replace(':id', id)}`
      },
    },
    datasetsCreate: {
      path: ROUTE_PATHS.datasetsCreate,
      createUrl: () => `${basePath}${routeDefinitions.datasetsCreate.path}`,
    },
    dataSource: {
      path: ROUTE_PATHS.dataSource,
      createUrl: (id: DataSourceId) => `${basePath}${routeDefinitions.dataSource.path.replace(':id', id)}`,
    },
  }

  return routeDefinitions
}

export type RouteDefinitions = ReturnType<typeof createRouteDefinitions>
