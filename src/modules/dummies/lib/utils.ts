import type { Dummy } from '@/modules/dummies/types';

import { dummies } from '@/modules/dummies/data/mock';

/* This function is only for example reusability*/
export function getDummiesFromLocalStorage(): Dummy[] {
  const rawDummies = localStorage.getItem('dummies');

  if (rawDummies) {
    return JSON.parse(rawDummies) as Dummy[];
  } else {
    localStorage.setItem('dummies', JSON.stringify(dummies));
    return dummies;
  }
}
