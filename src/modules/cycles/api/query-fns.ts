import type {
  BranchCyclesSearchParams,
  CreateCycleFormData,
  Cycle,
  CyclesLookupSearchParams,
  CyclesSearchParams,
  UpdateCycleFormData,
} from '@/modules/cycles/types';
import type { Lookup } from '@/modules/shared/types';

import api from '@/core/api';
import { BRANCHES_MODULE_NAME } from '@/modules/branches/api/query-fns';

export const CYCLES_MODULE_NAME = 'cycles';

export async function getAllCycles(params: CyclesLookupSearchParams) {
  return await api.get<Lookup[]>(`/${CYCLES_MODULE_NAME}/lookup`, {
    query: params,
  });
}

export async function getCyclesList(params: CyclesSearchParams) {
  return await api.getList<Cycle>(CYCLES_MODULE_NAME, {
    query: params,
  });
}

export async function getCycleById(id: number) {
  return await api.getById<Cycle>(CYCLES_MODULE_NAME, id);
}

export async function updateCycle(id: number, cycle: UpdateCycleFormData) {
  return await api.patchById<Cycle>(CYCLES_MODULE_NAME, id, {
    body: cycle,
  });
}

export async function deleteCycle(id: number) {
  return await api.deleteById(CYCLES_MODULE_NAME, id);
}

//======================>By Branch<===========================//

export async function getBranchCyclesList(
  branchId: number,
  params: BranchCyclesSearchParams,
) {
  return await api.getList<Cycle>(
    `/${BRANCHES_MODULE_NAME}/${branchId}/${CYCLES_MODULE_NAME}`,
    { query: params },
  );
}

export async function createCycle(cycle: CreateCycleFormData) {
  return await api.post<Cycle>(
    `/${BRANCHES_MODULE_NAME}/${cycle.branchId}/${CYCLES_MODULE_NAME}`,
    {
      body: cycle,
    },
  );
}
