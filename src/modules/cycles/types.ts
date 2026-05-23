import { z } from 'zod';

import {
  createCycleFormSchema,
  cycleSchema,
  cyclesLookupSearchSchema,
  cyclesSearchSchema,
  updateCycleFormSchema,
} from '@/modules/cycles/schemas';

export type Cycle = z.infer<typeof cycleSchema>;
export type CreateCycleFormData = z.infer<typeof createCycleFormSchema>;
export type UpdateCycleFormData = z.infer<typeof updateCycleFormSchema>;

export type CyclesSearchParams = z.infer<typeof cyclesSearchSchema>;
export type CyclesLookupSearchParams = z.infer<typeof cyclesLookupSearchSchema>;

//================>By Branch<=====================//

export type BranchCyclesSearchParams = z.infer<typeof cyclesSearchSchema>;
