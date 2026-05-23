import type { UpdateTargetFormData } from '@/modules/targets/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createTarget,
  deleteTarget,
  updateTarget,
} from '@/modules/targets/api/query-fns';

export function useCreateTargetMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createTarget'],
    mutationFn: createTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess();
      toast.success(t('targets:messages.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateTargetMutation({
  targetId,
  onSuccess,
}: {
  targetId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTarget', targetId],
    mutationFn: (data: UpdateTargetFormData) => updateTarget(targetId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess();
      toast.success(t('targets:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteTargetMutation({
  targetId,
  onSuccess,
}: {
  targetId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteTarget', targetId],
    mutationFn: () => deleteTarget(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess?.();
      toast.success(t('targets:messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
