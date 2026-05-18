import type {
  GroupSessionsSearchParams,
  SessionsSearchParams,
} from '@/modules/sessions/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getAllSessions,
  getGroupSessionsList,
  getSessionById,
  getSessionsList,
} from '@/modules/sessions/api/query-fns';

export const sessionsIndexQueryOptions = (params: SessionsSearchParams) =>
  queryOptions({
    queryKey: ['sessions', params],
    queryFn: () => getSessionsList(params),
  });

export const sessionsLookupQueryOptions = () => {
  return queryOptions({
    queryKey: ['sessions', 'lookup'],
    queryFn: () => getAllSessions(),
    staleTime: 1000 * 60, // 1 minute to avoid reload on multiple forms in a short time
  });
};

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
