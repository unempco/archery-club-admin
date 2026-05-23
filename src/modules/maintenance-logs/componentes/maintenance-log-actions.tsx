import type { MaintenanceLog } from '@/modules/maintenance-logs/types';

import { useState } from 'react';
import { DotsThreeIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UpdateMaintenanceLogDialog } from '@/modules/maintenance-logs/componentes/dialogs/update-maintenance-log-dialog';
import { useDeleteMaintenanceLogMutation } from '@/modules/maintenance-logs/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function MaintenanceLogActions({
  maintenanceLog,
}: MaintenanceLogActionsProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteMaintenanceLogMutation({
    logId: maintenanceLog.id,
  });

  const canUpdate = hasPermissions(ApiPermissions.MaintenanceLogs.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.MaintenanceLogs.DELETE);

  if (!canUpdate && !canDelete) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeIcon weight="bold" className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {canUpdate && (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.update')}
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon />
              {t('actions.delete')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateMaintenanceLogDialog
        maintenanceLog={maintenanceLog}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={maintenanceLog.key}
      />
    </>
  );
}

export type MaintenanceLogActionsProps = {
  maintenanceLog: MaintenanceLog;
};
