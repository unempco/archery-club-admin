import type { Lookup } from '@/modules/shared/types';
import type {
  BranchTargetsSearchParams,
  CreateTargetFormData,
  SessionTargetsSearchParams,
  Target,
  TargetsSearchParams,
  UpdateTargetFormData,
} from '@/modules/targets/types';

import api from '@/core/api';
import { BRANCHES_MODULE_NAME } from '@/modules/branches/api/query-fns';
import { SESSIONS_MODULE_NAME } from '@/modules/sessions/api/query-fns';

export const TARGETS_MODULE_NAME = 'targets';

export async function getAllTargets() {
  return await api.get<Lookup[]>(`/${TARGETS_MODULE_NAME}/lookup`);
}

export async function getTargetsList(params: TargetsSearchParams) {
  return await api.getList<Target>(TARGETS_MODULE_NAME, {
    query: params,
  });
}

export async function getTargetById(id: number) {
  return await api.getById<Target>(TARGETS_MODULE_NAME, id);
}

export async function createTarget(target: CreateTargetFormData) {
  return await api.post<Target>(
    `/${BRANCHES_MODULE_NAME}/${target.branchId}/${TARGETS_MODULE_NAME}`,
    {
      body: target,
    },
  );
}

export async function updateTarget(id: number, target: UpdateTargetFormData) {
  return await api.patchById<Target>(TARGETS_MODULE_NAME, id, {
    body: target,
  });
}

export async function deleteTarget(id: number) {
  return await api.deleteById(TARGETS_MODULE_NAME, id);
}

//======================>By Branch<===========================//

export async function getBranchTargetsList(
  branchId: number,
  params: BranchTargetsSearchParams,
) {
  return await api.getList<Target>(
    `/${BRANCHES_MODULE_NAME}/${branchId}/${TARGETS_MODULE_NAME}`,
    { query: params },
  );
}

//======================>By Session<===========================//

export async function getSessionTargetsList(
  sessionId: number,
  params: SessionTargetsSearchParams,
) {
  return await api.getList<Target>(
    `/${SESSIONS_MODULE_NAME}/${sessionId}/${TARGETS_MODULE_NAME}`,
    { query: params },
  );
}
