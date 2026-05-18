import type {
  AssignTargetsFormData,
  UpdateSessionFormData,
} from '@/modules/sessions/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  assignSessionTargets,
  deleteSession,
  updateSession,
} from '@/modules/sessions/api/query-fns';

export function useUpdateSessionMutation({
  sessionId,
  onSuccess,
}: {
  sessionId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateSession', sessionId],
    mutationFn: (data: UpdateSessionFormData) => updateSession(sessionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess();
      toast.success(t('sessions:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useSessionTargetsMutation({
  sessionId,
  onSuccess,
}: {
  sessionId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['assignSessionTargets', sessionId],
    mutationFn: (data: AssignTargetsFormData) =>
      assignSessionTargets(sessionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess();
      toast.success(t('sessions:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteSessionMutation({
  sessionId,
  onSuccess,
}: {
  sessionId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteSession', sessionId],
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      onSuccess?.();
      toast.message(t('sessions:messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
