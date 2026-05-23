import type {
  BranchCyclesSearchParams,
  CyclesLookupSearchParams,
  CyclesSearchParams,
} from '@/modules/cycles/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getAllCycles,
  getBranchCyclesList,
  getCycleById,
  getCyclesList,
} from '@/modules/cycles/api/query-fns';

export const cyclesIndexQueryOptions = (params: CyclesSearchParams) =>
  queryOptions({
    queryKey: ['cycles', params],
    queryFn: () => getCyclesList(params),
  });

export const cyclesLookupQueryOptions = (
  params: CyclesLookupSearchParams = {},
) => {
  return queryOptions({
    queryKey: ['cycles', 'lookup'],
    queryFn: () => getAllCycles(params),
    staleTime: 1000 * 60, // 1 minute to avoid reload on multiple forms in a short time
  });
};

export const cycleQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['cycles', id],
    queryFn: () => getCycleById(id),
  });

//=======================>By Branch<========================//

export const branchCyclesQueryOptions = (
  branchId: number,
  params: BranchCyclesSearchParams,
) =>
  queryOptions({
    queryKey: ['cycles', branchId, params],
    queryFn: () => getBranchCyclesList(branchId, params),
  });
