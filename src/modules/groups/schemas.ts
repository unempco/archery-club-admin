import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { groupStatuses } from '@/modules/groups/constants';

export const groupSchema = z.object({
  // Server-generated fields
  id: z.number(),
  createdAt: z.string(),
  status: z.enum(groupStatuses),
  deletedAt: z.string().nullable(),
  isDeleted: z.boolean(),
  // Form fields
  name: z.string().min(1, 'Name is required'),
  cycleId: z.coerce.number('Cycle is required'),
  weekday: z.coerce.number().min(0).max(6),
  startTime: z.string().min(1, 'Start time is required'), // HH:mm format
  durationMinutes: z.coerce.number().min(0),
});

export const createGroupFormSchema = groupSchema.pick({
  name: true,
  cycleId: true,
  weekday: true,
  startTime: true,
  durationMinutes: true,
});

export const updateGroupFormSchema = groupSchema.pick({
  name: true,
  status: true,
  startTime: true,
  durationMinutes: true,
});

export const groupsFiltersSchema = z.object({
  cycleId: z.string().optional().catch(''),
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const groupsSearchSchema = paginationSearchSchema.extend(
  groupsFiltersSchema.shape,
);

//====================>ByCycle<===================//

export const cycleGroupsSearchSchema = groupsSearchSchema.omit({
  cycleId: true,
});
