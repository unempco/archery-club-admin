import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateMaintenanceLogForm } from '@/modules/maintenance-logs/componentes/forms/create-maintenance-log-form';
import { useCreateMaintenanceLogMutation } from '@/modules/maintenance-logs/hooks/mutations';

export function CreateMaintenanceLogDialogTrigger({
  children,
}: CreateMaintenanceLogDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const { targetId } = useParams({ strict: false });

  const mutation = useCreateMaintenanceLogMutation({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('maintenanceLogs:dialogs.create.title')}</DialogTitle>
        </DialogHeader>
        <CreateMaintenanceLogForm
          defaultValues={{ targetId }}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateMaintenanceLogDialogProps = {
  children: React.ReactNode;
};
