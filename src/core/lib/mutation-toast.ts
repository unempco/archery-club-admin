// core/lib/mutation-toast.ts
import type { TFunction } from 'i18next';

import { toast } from 'sonner';

import { NotOkResponseError } from '@/core/errors';

export function onMutationError(
  t: TFunction,
  fallbackKey = 'dialogs.unableToHandleAction',
) {
  return (e: Error) => {
    if (e instanceof NotOkResponseError) {
      toast.error(t(`statusCodes:${e.status}.short`), {
        description: t(e.detail),
      });
    } else {
      toast.error(t(fallbackKey));
    }
  };
}

export function onMutationSuccess(
  t: TFunction,
  fallbackKey = 'dialogs.wasUpdated',
) {
  return () => toast.success(t(fallbackKey));
}
