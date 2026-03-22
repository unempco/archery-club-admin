import type { PaginationParams } from '@/core/types/search-params';

import { queryOptions } from '@tanstack/react-query';

import { getDummiesList } from '@/modules/dummies/api/query-fns';

export const dummiesQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: ['dummies', params],
    queryFn: () => getDummiesList(params),
  });
