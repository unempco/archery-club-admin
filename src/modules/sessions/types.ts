import type { sessionSchema } from '@/modules/sessions/schemas';

import { z } from 'zod';

import {
  assignTargetsFormSchema,
  groupSessionsSearchSchema,
  sessionsSearchSchema,
  updateSessionFormSchema,
} from '@/modules/sessions/schemas';

export type Session = z.infer<typeof sessionSchema>;
export type UpdateSessionFormData = z.infer<typeof updateSessionFormSchema>;
export type AssignTargetsFormData = z.infer<typeof assignTargetsFormSchema>;

export type SessionsSearchParams = z.infer<typeof sessionsSearchSchema>;

//=================>By Group<==================//

export type GroupSessionsSearchParams = z.infer<
  typeof groupSessionsSearchSchema
>;
