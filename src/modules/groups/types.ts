import { z } from 'zod';

import {
  createGroupFormSchema,
  cycleGroupsSearchSchema,
  groupSchema,
  groupsLookupSearchSchema,
  groupsSearchSchema,
  updateGroupFormSchema,
} from '@/modules/groups/schemas';

export type Group = z.infer<typeof groupSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupFormSchema>;
export type UpdateGroupFormData = z.infer<typeof updateGroupFormSchema>;

export type GroupsSearchParams = z.infer<typeof groupsSearchSchema>;
export type GroupsLookupSearchParams = z.infer<typeof groupsLookupSearchSchema>;

//====================>By Cycle<===================//

export type CycleGroupsSearchParams = z.infer<typeof cycleGroupsSearchSchema>;
