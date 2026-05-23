import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { branchStatuses } from '@/modules/branches/constants';

export const branchSchema = z.object({
  // Server-generated fields
  id: z.number(),
  createdAt: z.string(),
  closedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
  isDeleted: z.boolean(),
  // Form field
  name: z.string().min(1, 'Name is required'),
  status: z.enum(branchStatuses).default(branchStatuses[0]),
  maintenanceThreshold: z
    .int()
    .min(1, 'Maintenance threshold must be non-negative'),
  maintenanceWarningOffset: z
    .int()
    .min(1, 'Maintenance warning offset must be non-negative'),
});

export const createBranchFormSchema = branchSchema.pick({
  name: true,
  maintenanceThreshold: true,
  maintenanceWarningOffset: true,
});
export const updateBranchFormSchema = branchSchema.pick({
  name: true,
  status: true,
  maintenanceThreshold: true,
  maintenanceWarningOffset: true,
});

export const branchesFiltersSchema = z.object({
  status: z.enum(branchStatuses).optional().catch(undefined),
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const branchesSearchSchema = paginationSearchSchema.extend(
  branchesFiltersSchema.shape,
);
export const branchesLookupSearchSchema = branchesFiltersSchema.pick({
  status: true,
  includeDeleted: true,
});
