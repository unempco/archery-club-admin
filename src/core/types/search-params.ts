import { z } from 'zod';

import { DEFAULT_PAGE_SIZES } from '@/core/constants/search-params';

export const paginationParamsSchema = z.object({
  page: z.number().min(1).catch(1),
  pageSize: z.literal(DEFAULT_PAGE_SIZES).catch(10),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;
export type PaginationPageSize = (typeof DEFAULT_PAGE_SIZES)[number];
