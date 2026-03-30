import { z } from 'zod';

import { dummiesSearchSchema, dummySchema } from '@/modules/dummies/schemas';

export type Dummy = z.infer<typeof dummySchema>;
export type DummiesSearchParams = z.infer<typeof dummiesSearchSchema>;
