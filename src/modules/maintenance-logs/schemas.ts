import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';

export const maintenanceLogSchema = z.object({
  // Server-generated fields
  id: z.number(),
  key: z.string(),
  // Form fields
  targetId: z.coerce.number('Target is required'),
  performedAt: z.coerce.date(),
  notes: z.string().optional(),
});

export const createMaintenanceLogFormSchema = maintenanceLogSchema.pick({
  targetId: true,
  performedAt: true,
  notes: true,
});

export const maintenanceLogsFiltersSchema = z.object({});
export const maintenanceLogsSearchSchema = paginationSearchSchema.extend(
  maintenanceLogsFiltersSchema.shape,
);
