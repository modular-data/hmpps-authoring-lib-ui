import { type SubPageViewModel } from '../../common/sub-page'
import { type DataProduct } from '../../../types/entities/data-product'
import { type DataProductFormViewModel } from '../data-product-form'
import { type DataProductActionsViewModel } from './data-product-actions'

interface DataProductQualityMetricViewModel {
  name: string
  value: number | null
  lastUpdatedAt: string | null
}

export type DataProductQualityMetricsViewModel = DataProductQualityMetricViewModel[]

export interface DataProductPageViewModel extends SubPageViewModel {
  dataProduct: DataProduct
  qualityMetrics: DataProductQualityMetricsViewModel
  form: DataProductFormViewModel
  actions: DataProductActionsViewModel
}
