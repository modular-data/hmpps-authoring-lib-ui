import { z } from 'zod'
import { dataProductFormSchema } from '../data-product-form.schema'

export const createDataProductSchema = dataProductFormSchema

export type CreateDataProductDto = z.output<typeof createDataProductSchema>
