import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { sessionStatuses } from '@/modules/sessions/constants';

export const sessionSchema = z.object({
  // Server-generated fields
  id: z.number(),
  key: z.string(),
  scheduledAt: z.string(),
  groupId: z.string(),
  branchId: z.number(),
  deletedAt: z.string().nullable(),
  isDeleted: z.boolean(),
  // Form fields
  notes: z.string().optional().nullable(),
  durationMinutes: z.number(),
  status: z.enum(sessionStatuses),
  targetIds: z.array(z.number()),
});

export const updateSessionFormSchema = sessionSchema.pick({
  status: true,
  notes: true,
});
export const assignTargetsFormSchema = sessionSchema.pick({ targetIds: true });

export const sessionsFiltersSchema = z.object({
  status: z.enum(sessionStatuses).optional().catch(undefined),
  groupId: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const sessionsSearchSchema = paginationSearchSchema.extend(
  sessionsFiltersSchema.shape,
);

//=================>By Group<==================//

export const groupSessionsSearchSchema = sessionsSearchSchema.omit({
  groupId: true,
});
