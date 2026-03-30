import { z } from 'zod';

import { ItemStatus } from '@/core/constants/misc';
import { paginationSearchSchema } from '@/core/types/search-params';

export const dummySchema = z.object({
  id: z.number(),
  key: z.string(),
  name: z.string(),
  count: z.number(),
  description: z.string(),
  created_at: z.string().nullable(),
  status: z.string(),
  email: z.email(),
  website: z.url(),
  image: z.url(),
  special: z.boolean(),
  price: z.number(),
});

export const dummiesFiltersSchema = z.object({
  search: z.string().optional().catch(''),
  status: z.literal(Object.values(ItemStatus)).optional().catch(undefined),
});
export const dummiesSearchSchema = paginationSearchSchema.extend(
  dummiesFiltersSchema.shape,
);
