import { DataProductState } from '../types/entities/data-product'

export const DATA_PRODUCT_DEFAULT_VERSION = '0.0.1'

export const RECENT_DATA_PRODUCT_THRESHOLD_MS = 30 * 60 * 1000 // 30 minutes

export const dataProductStateLabelMap: Record<DataProductState, string> = {
  [DataProductState.Draft]: 'Draft',
  [DataProductState.Published]: 'Published',
  [DataProductState.Launched]: 'Launched',
}

export const dataProductStateTagColourMap: Record<DataProductState, string> = {
  [DataProductState.Draft]: 'blue',
  [DataProductState.Published]: 'yellow',
  [DataProductState.Launched]: 'green',
}
