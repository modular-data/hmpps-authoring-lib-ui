import { z } from 'zod'
import { AssetType } from '../../types/entities/asset'
import { OutputType } from '../../types/entities/output'

export const dataProductFormSchema = z.object({
  name: z.string(),
  domainId: z.string(),
  domainName: z.string(),
  description: z.string(),
  metadata: z.object({
    owner: z.string(),
    author: z.string(),
    version: z.string(),
  }),
  assets: z.record(z.nativeEnum(AssetType), z.array(z.string())),
  outputs: z.record(z.nativeEnum(OutputType), z.array(z.string())),
  policies: z.array(z.string()),
  tags: z.array(z.string()),
})

export type DataProductFormValues = z.input<typeof dataProductFormSchema>

export type DataProductFormDefaultValues = Partial<DataProductFormValues>
