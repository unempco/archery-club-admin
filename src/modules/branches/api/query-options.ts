import type {
  BranchesLookupSearchParams,
  BranchesSearchParams,
} from '@/modules/branches/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getAllBranches,
  getBranchById,
  getBranchesList,
} from '@/modules/branches/api/query-fns';

export const branchesIndexQueryOptions = (params: BranchesSearchParams) =>
  queryOptions({
    queryKey: ['branches', params],
    queryFn: () => getBranchesList(params),
  });

export const branchesLookupQueryOptions = (
  params: BranchesLookupSearchParams = {},
) => {
  return queryOptions({
    queryKey: ['branches', 'lookup'],
    queryFn: () => getAllBranches(params),
    staleTime: 1000 * 60, // 1 minute to avoid reload on multiple forms in a short time
  });
};

export const branchQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['branches', id],
    queryFn: () => getBranchById(id),
  });
