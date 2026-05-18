import type {
  BranchTargetsSearchParams,
  SessionTargetsSearchParams,
  TargetsLookupSearchParams,
  TargetsSearchParams,
} from '@/modules/targets/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getAllTargets,
  getBranchTargetsList,
  getSessionTargetsList,
  getTargetById,
  getTargetsList,
} from '@/modules/targets/api/query-fns';

export const targetsIndexQueryOptions = (params: TargetsSearchParams) =>
  queryOptions({
    queryKey: ['targets', params],
    queryFn: () => getTargetsList(params),
  });

export const targetsLookupQueryOptions = (
  params: TargetsLookupSearchParams,
) => {
  return queryOptions({
    queryKey: ['targets', 'lookup', params],
    queryFn: () => getAllTargets(params),
    staleTime: 1000 * 60, // 1 minute to avoid reload on multiple forms in a short time
  });
};

export const targetQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['targets', itemId],
    queryFn: () => getTargetById(itemId),
  });

//=======================>By Branch<========================//

export const branchTargetsQueryOptions = (
  branchId: number,
  params: BranchTargetsSearchParams,
) =>
  queryOptions({
    queryKey: ['targets', branchId, params],
    queryFn: () => getBranchTargetsList(branchId, params),
  });

//=======================>By Session<========================//

export const sessionTargetsQueryOptions = (
  sessionId: number,
  params: SessionTargetsSearchParams,
) =>
  queryOptions({
    queryKey: ['targets', sessionId, params],
    queryFn: () => getSessionTargetsList(sessionId, params),
  });
