import type {
  Branch,
  BranchesLookupSearchParams,
  BranchesSearchParams,
  CreateBranchFormData,
  UpdateBranchFormData,
} from '@/modules/branches/types';
import type { Lookup } from '@/modules/shared/types';

import api from '@/core/api';

export const BRANCHES_MODULE_NAME = 'branches';

export async function getAllBranches(params: BranchesLookupSearchParams) {
  return await api.get<Lookup[]>(`/${BRANCHES_MODULE_NAME}/lookup`, {
    query: params,
  });
}

export async function getBranchesList(params: BranchesSearchParams) {
  return await api.getList<Branch>(BRANCHES_MODULE_NAME, {
    query: params,
  });
}

export async function getBranchById(id: number) {
  return await api.getById<Branch>(BRANCHES_MODULE_NAME, id);
}

export async function createBranch(branch: CreateBranchFormData) {
  return await api.post<Branch>(BRANCHES_MODULE_NAME, {
    body: branch,
  });
}

export async function updateBranch(id: number, branch: UpdateBranchFormData) {
  return await api.patchById<Branch>(BRANCHES_MODULE_NAME, id, {
    body: branch,
  });
}

export async function deleteBranch(id: number) {
  return await api.deleteById(BRANCHES_MODULE_NAME, id);
}
