import type {
  GroupSessionsSearchParams,
  SessionsSearchParams,
} from '@/modules/sessions/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getGroupSessionsList,
  getSessionById,
  getSessionsList,
} from '@/modules/sessions/api/query-fns';

export const sessionsIndexQueryOptions = (params: SessionsSearchParams) =>
  queryOptions({
    queryKey: ['sessions', params],
    queryFn: () => getSessionsList(params),
  });

export const sessionQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['sessions', id],
    queryFn: () => getSessionById(id),
  });

//=================>By Group<==================//

export const groupSessionsQueryOptions = (
  groupId: number,
  params: GroupSessionsSearchParams,
) =>
  queryOptions({
    queryKey: ['sessions', groupId, params],
    queryFn: () => getGroupSessionsList(groupId, params),
  });
