import type { PaginatedResponse, PaginationParams } from '@/core/types/api';
import type { Dummy } from '@/modules/dummies/types';

import { sleep } from '@/core/lib/utils';
import { dummies } from '@/modules/dummies/data/mock';

export function getAllDummies(): Promise<Dummy[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummies), 500);
  });
}

export async function getDummiesList(
  paginationParams: PaginationParams,
): Promise<PaginatedResponse<Dummy>> {
  const { page = 1, pageSize = 10 } = paginationParams;

  await sleep(150);

  return {
    items: dummies.slice((page - 1) * pageSize, page * pageSize),
    meta: {
      page,
      pageSize,
      total: dummies.length,
    },
  };
}
