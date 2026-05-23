import type { UpdateBranchFormData } from '@/modules/branches/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createBranch,
  deleteBranch,
  updateBranch,
} from '@/modules/branches/api/query-fns';

export function useCreateBranchMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBranch'],
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      onSuccess();
      toast.success(t('branches:messages.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateBranchMutation({
  branchId,
  onSuccess,
}: {
  branchId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBranch', branchId],
    mutationFn: (data: UpdateBranchFormData) => updateBranch(branchId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      onSuccess();
      toast.success(t('branches:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteBranchMutation({
  branchId,
  onSuccess,
}: {
  branchId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteBranch', branchId],
    mutationFn: () => deleteBranch(branchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      onSuccess?.();
      toast.success(t('branches:messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
