import { z } from 'zod';

export const dataSourcesStepSchema = z.object({
  datasourceIds: z.array(z.string()).min(1, 'Select at least one data source'),
});

export type DataSourcesStepValues = z.infer<typeof dataSourcesStepSchema>;
