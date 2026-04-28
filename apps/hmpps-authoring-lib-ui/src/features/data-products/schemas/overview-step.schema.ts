import { type z } from 'zod';
import { zDataProductUpdateInput } from '@/generated/core-api/zod.gen';
import { requiredTrimmedText } from '@/utils/zod/required-trimmed-text';

const overviewShape = zDataProductUpdateInput.shape;
const metadataShape = overviewShape.metadata.shape;

export const overviewStepSchema = zDataProductUpdateInput.safeExtend({
  name: requiredTrimmedText(overviewShape.name),
  description: requiredTrimmedText(overviewShape.description),
  metadata: overviewShape.metadata.safeExtend({
    owner: requiredTrimmedText(metadataShape.owner),
    version: requiredTrimmedText(metadataShape.version),
  }),
});

export type OverviewStepValues = z.infer<typeof overviewStepSchema>;
