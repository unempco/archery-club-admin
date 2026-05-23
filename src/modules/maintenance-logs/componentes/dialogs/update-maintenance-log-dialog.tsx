import type { MaintenanceLog } from '@/modules/maintenance-logs/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateMaintenanceLogForm } from '@/modules/maintenance-logs/componentes/forms/update-maintenance-log-form';
import { useUpdateMaintenanceLogMutation } from '@/modules/maintenance-logs/hooks/mutations';

export function UpdateMaintenanceLogDialog({
  maintenanceLog,
  open,
  onOpenChange,
}: UpdateMaintenanceLogDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateMaintenanceLogMutation({
    logId: maintenanceLog.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('maintenanceLogs:dialogs.update.title')}</DialogTitle>
        </DialogHeader>
        <UpdateMaintenanceLogForm
          defaultValues={maintenanceLog}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateMaintenanceLogDialogProps = {
  maintenanceLog: MaintenanceLog;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
