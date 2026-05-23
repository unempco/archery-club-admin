import type { UpdateGroupFormData } from '@/modules/groups/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from '@/modules/groups/api/query-fns';

export function useCreateGroupMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      onSuccess();
      toast.success(t('groups:messages.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateGroupMutation({
  groupId,
  onSuccess,
}: {
  groupId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateGroup', groupId],
    mutationFn: (data: UpdateGroupFormData) => updateGroup(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      onSuccess();
      toast.success(t('groups:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteGroupMutation({
  groupId,
  onSuccess,
}: {
  groupId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteGroup', groupId],
    mutationFn: () => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      onSuccess?.();
      toast.success(t('groups:messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
