import { type Environment } from 'nunjucks'
import classNames from 'classnames'
import { DataProductState } from '../../../types/entities/data-product'
import { DatasetState } from '../../../types/entities/dataset'
import { AssetType } from '../../../types/entities/asset'
import { OutputType } from '../../../types/entities/output'
import { NO_DATA_PLACEHOLDER } from '../../../constants/common'
import { dataProductStateTagColourMap, dataProductStateLabelMap } from '../../../constants/data-products'
import { datasetStateTagColourMap, datasetStateLabelMap } from '../../../constants/datasets'
import { assetTypeLabelMap } from '../../../constants/assets'
import { outputTypeLabelMap } from '../../../constants/outputs'

export const configureNunjucksGlobals = (nunjucksEnvironment: Environment) => {
  const ENUMS = {
    DatasetState,
    AssetType,
    OutputType,
    DataProductState,
  }

  const CONSTANTS = {
    datasetStateLabelMap,
    datasetStateTagColourMap,
    assetTypeLabelMap,
    outputTypeLabelMap,
    dataProductStateLabelMap,
    dataProductStateTagColourMap,
  }

  nunjucksEnvironment.addGlobal('classNames', classNames)
  nunjucksEnvironment.addGlobal('ENUMS', ENUMS)
  nunjucksEnvironment.addGlobal('CONSTANTS', CONSTANTS)
  nunjucksEnvironment.addGlobal('NO_DATA_PLACEHOLDER', NO_DATA_PLACEHOLDER)
}
