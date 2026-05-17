import { z } from 'zod';

import {
  branchTargetsSearchSchema,
  createTargetFormSchema,
  sessionTargetsSearchSchema,
  targetSchema,
  targetsSearchSchema,
  updateTargetFormSchema,
} from '@/modules/targets/schemas';

export type Target = z.infer<typeof targetSchema>;
export type CreateTargetFormData = z.infer<typeof createTargetFormSchema>;
export type UpdateTargetFormData = z.infer<typeof updateTargetFormSchema>;

export type TargetsSearchParams = z.infer<typeof targetsSearchSchema>;

//=======================>By Branch<========================//

export type BranchTargetsSearchParams = z.infer<
  typeof branchTargetsSearchSchema
>;

//=======================>By Session<========================//

export type SessionTargetsSearchParams = z.infer<
  typeof sessionTargetsSearchSchema
>;
