import type { Target } from '@/modules/targets/types';

import { useState } from 'react';
import {
  ClipboardIcon,
  DotsThreeIcon,
  PencilIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { ApiPermissions } from '@/modules/shared/constants/permissions';
import { UpdateTargetDialog } from '@/modules/targets/components/dialogs/update-target-dialog';
import { useDeleteTargetMutation } from '@/modules/targets/hooks/mutations';

export function TargetActions({ target }: TargetActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteTargetMutation({ targetId: target.id });

  const canViewMaintenanceLogs = hasPermissions(
    ApiPermissions.MaintenanceLogs.READ,
  );
  const canUpdate = hasPermissions(ApiPermissions.Targets.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Targets.DELETE);

  if (canViewMaintenanceLogs || canUpdate || canDelete)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsThreeIcon weight="bold" className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {canViewMaintenanceLogs && (
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: '/app/targets/$targetId/maintenance-logs',
                    params: { targetId: String(target.id) },
                  })
                }
              >
                <ClipboardIcon />
                {t('targets:actions.viewLogs')}
              </DropdownMenuItem>
            )}
            {canViewMaintenanceLogs && [canUpdate, canDelete].some(Boolean) && (
              <DropdownMenuSeparator />
            )}
            {canUpdate && (
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <PencilIcon />
                {t('actions.edit')}
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

        <UpdateTargetDialog
          target={target}
          open={editOpen}
          onOpenChange={setEditOpen}
        />

        <DeleteConfirmationDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirm={() => deleteMutation.mutate()}
          isPending={deleteMutation.isPending}
          name={target.name}
        />
      </>
    );
}

export type TargetActionsProps = {
  target: Target;
};
