import type {
  CycleGroupsSearchParams,
  GroupsSearchParams,
} from '@/modules/groups/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getCycleGroupsList,
  getGroupById,
  getGroupsList,
} from '@/modules/groups/api/query-fns';

export const groupsIndexQueryOptions = (params: GroupsSearchParams) =>
  queryOptions({
    queryKey: ['groups', params],
    queryFn: () => getGroupsList(params),
  });

export const groupQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['groups', id],
    queryFn: () => getGroupById(id),
  });

//===============>By cycle<=================//

export const cycleGroupsQueryOptions = (
  cycleId: number,
  params: CycleGroupsSearchParams,
) =>
  queryOptions({
    queryKey: ['groups', cycleId, params],
    queryFn: () => getCycleGroupsList(cycleId, params),
  });
