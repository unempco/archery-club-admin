import type {
  BranchTargetsSearchParams,
  TargetsSearchParams,
} from '@/modules/targets/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getAllTargets,
  getBranchTargetsList,
  getTargetById,
  getTargetsList,
} from '@/modules/targets/api/query-fns';

export const targetsIndexQueryOptions = (params: TargetsSearchParams) =>
  queryOptions({
    queryKey: ['targets', params],
    queryFn: () => getTargetsList(params),
  });

export const targetsLookupQueryOptions = () => {
  return queryOptions({
    queryKey: ['targets', 'lookup'],
    queryFn: () => getAllTargets(),
    staleTime: 1000 * 60, // 1 minute to avoid reload on multiple forms in a short time
  });
};

export const targetQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['targetById', itemId],
    queryFn: () => getTargetById(itemId),
  });

//=======================>By Branch<========================//

export const branchTargetsQueryOptions = (
  branchId: number,
  params: BranchTargetsSearchParams,
) =>
  queryOptions({
    queryKey: ['cycles', branchId, params],
    queryFn: () => getBranchTargetsList(branchId, params),
  });
