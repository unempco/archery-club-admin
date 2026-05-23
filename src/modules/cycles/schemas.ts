import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { cycleStatuses } from '@/modules/cycles/constants';

export const cycleSchema = z.object({
  // Server-generated fields
  id: z.number(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  // Form fields
  name: z.string().min(1, 'Name is required'),
  branchId: z.coerce.number('Branch is required'),
  startDate: z.coerce.date(),
  sessionCount: z.number(),
  status: z.enum(cycleStatuses),
});

export const createCycleFormSchema = cycleSchema.pick({
  name: true,
  branchId: true,
  startDate: true,
  sessionCount: true,
});
export const updateCycleFormSchema = cycleSchema.pick({
  name: true,
  status: true,
});

export const cyclesFiltersSchema = z.object({
  status: z.enum(cycleStatuses).optional().catch(undefined),
  branchId: z.string().optional().catch(''),
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const cyclesSearchSchema = paginationSearchSchema.extend(
  cyclesFiltersSchema.shape,
);
export const cyclesLookupSearchSchema = cyclesFiltersSchema.pick({
  status: true,
  branchId: true,
  includeDeleted: true,
});

//==================>By Branch<======================//

export const branchCyclesSearchSchema = cyclesSearchSchema.omit({
  // Branch ID already goes in path params
  branchId: true,
});
