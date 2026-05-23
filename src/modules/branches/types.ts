import { z } from 'zod';

import {
  branchesLookupSearchSchema,
  branchesSearchSchema,
  branchSchema,
  createBranchFormSchema,
  updateBranchFormSchema,
} from '@/modules/branches/schemas';

export type Branch = z.infer<typeof branchSchema>;
export type CreateBranchFormData = z.infer<typeof createBranchFormSchema>;
export type UpdateBranchFormData = z.infer<typeof updateBranchFormSchema>;

export type BranchesSearchParams = z.infer<typeof branchesSearchSchema>;
export type BranchesLookupSearchParams = z.infer<
  typeof branchesLookupSearchSchema
>;
