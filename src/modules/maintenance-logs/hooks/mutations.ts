import type { UpdateMaintenanceLogFormData } from '@/modules/maintenance-logs/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createMaintenanceLog,
  deleteMaintenanceLog,
  updateMaintenanceLog,
} from '@/modules/maintenance-logs/api/query-fns';

export function useCreateMaintenanceLogMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createMaintenanceLog'],
    mutationFn: createMaintenanceLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceLogs'] });
      onSuccess();
      toast.success(t('maintenanceLog:messages.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateMaintenanceLogMutation({
  logId,
  onSuccess,
}: {
  logId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateMaintenanceLog', logId],
    mutationFn: (data: UpdateMaintenanceLogFormData) =>
      updateMaintenanceLog(logId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceLogs'] });
      onSuccess();
      toast.success(t('maintenanceLogs:messages.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteMaintenanceLogMutation({
  logId,
  onSuccess,
}: {
  logId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteMaintenanceLog', logId],
    mutationFn: () => deleteMaintenanceLog(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceLogs'] });
      onSuccess?.();
      toast.success(t('maintenanceLogs:messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
