import type { UpdateCycleFormData } from '@/modules/cycles/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createCycle,
  deleteCycle,
  updateCycle,
} from '@/modules/cycles/api/query-fns';

export function useCreateCycleMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createCycle'],
    mutationFn: createCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
      onSuccess();
      toast.success(t('cycles:messages.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateCycleMutation({
  cycleId,
  onSuccess,
}: {
  cycleId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateCycle', cycleId],
    mutationFn: (data: UpdateCycleFormData) => updateCycle(cycleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
      onSuccess();
      toast.success(t('cycles:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteCycleMutation({
  cycleId,
  onSuccess,
}: {
  cycleId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteCycle', cycleId],
    mutationFn: () => deleteCycle(cycleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
      onSuccess?.();
      toast.success(t('cycles:messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
