import { z } from 'zod'

export const datasetFormSchema = z.object({
  name: z.string(),
  domainId: z.string(),
  domainName: z.string(),
  dataSourceId: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  query: z.string(),
  metadata: z.object({
    owner: z.string(),
    version: z.string(),
  }),
})

export type DatasetFormValues = z.input<typeof datasetFormSchema>

export type DatasetFormDefaultValues = Partial<DatasetFormValues>
