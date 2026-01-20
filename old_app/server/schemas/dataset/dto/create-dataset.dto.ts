import { z } from 'zod'
import { datasetFormSchema } from '../dataset-form.schema'

export const createDatasetSchema = datasetFormSchema

export type CreateDatasetDto = z.output<typeof createDatasetSchema>
