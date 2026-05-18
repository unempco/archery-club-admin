import type {
  AssignTargetsFormData,
  GroupSessionsSearchParams,
  Session,
  SessionsSearchParams,
  UpdateSessionFormData,
} from '@/modules/sessions/types';
import type { Lookup } from '@/modules/shared/types';

import api from '@/core/api';
import { GROUPS_MODULE_NAME } from '@/modules/groups/api/query-fns';

export const SESSIONS_MODULE_NAME = 'sessions';

export async function getAllSessions() {
  return await api.get<Lookup[]>(`/${SESSIONS_MODULE_NAME}/lookup`);
}

export async function getSessionsList(params: SessionsSearchParams) {
  return await api.getList<Session>(SESSIONS_MODULE_NAME, {
    query: params,
  });
}

export async function getSessionById(id: number) {
  return await api.getById<Session>(SESSIONS_MODULE_NAME, id);
}

export async function updateSession(
  id: number,
  session: UpdateSessionFormData,
) {
  return await api.patchById<Session>(SESSIONS_MODULE_NAME, id, {
    body: session,
  });
}

export async function assignSessionTargets(
  id: number,
  data: AssignTargetsFormData,
) {
  return await api.put(`${SESSIONS_MODULE_NAME}/${id}/targets`, { body: data });
}

export async function deleteSession(id: number) {
  return await api.deleteById(SESSIONS_MODULE_NAME, id);
}

//==============>By Group<===================//

export async function getGroupSessionsList(
  groupId: number,
  params: GroupSessionsSearchParams,
) {
  return await api.getList<Session>(
    `/${GROUPS_MODULE_NAME}/${groupId}/sessions`,
    { query: params },
  );
}
