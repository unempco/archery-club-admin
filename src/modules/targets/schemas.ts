import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { targetStatuses } from '@/modules/targets/constants';

export const targetSchema = z.object({
  // Server-generated fields
  id: z.number(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  retiredAt: z.string(),
  // Form fields
  name: z.string().min(1, 'Name is required'),
  branchId: z.coerce.number('Branch is required'),
  usageCount: z.number(),
  status: z.enum(targetStatuses),
});

export const createTargetFormSchema = targetSchema.pick({
  name: true,
  branchId: true,
});
export const updateTargetFormSchema = targetSchema.pick({
  name: true,
  status: true,
});

export const targetsFiltersSchema = z.object({
  branchId: z.number().optional().catch(undefined),
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const targetsSearchSchema = paginationSearchSchema.extend(
  targetsFiltersSchema.shape,
);
export const targetsLookupSearchSchema = targetsSearchSchema.pick({
  branchId: true,
});

//=======================>By Branch<========================//

export const branchTargetsSearchSchema = targetsSearchSchema.omit({
  branchId: true,
});

//=======================>By Session<========================//

export const sessionTargetsSearchSchema = targetsSearchSchema.omit({
  branchId: true,
});
