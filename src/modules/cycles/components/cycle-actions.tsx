import type { Cycle } from '@/modules/cycles/types';

import { useState } from 'react';
import {
  DotsThreeIcon,
  PencilIcon,
  TrashIcon,
  UsersThreeIcon,
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
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateCycleDialog } from '@/modules/cycles/components/dialogs/update-cycle-dialog';
import { useDeleteCycleMutation } from '@/modules/cycles/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function CycleActions({ cycle }: CycleActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteCycleMutation({ cycleId: cycle.id });

  return (
    <PermissionGuard
      permissions={[ApiPermissions.Cycles.UPDATE, ApiPermissions.Cycles.DELETE]}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeIcon weight="bold" className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <PermissionGuard permissions={ApiPermissions.Groups.UPDATE}>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: '/app/cycles/$cycleId/groups',
                  params: { cycleId: String(cycle.id) },
                })
              }
            >
              <UsersThreeIcon />
              {t('cycles:actions.viewGroups')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Cycles.UPDATE}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Cycles.DELETE}>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon />
              {t('actions.delete')}
            </DropdownMenuItem>
          </PermissionGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateCycleDialog
        cycle={cycle}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={cycle.name}
      />
    </PermissionGuard>
  );
}

export type CycleActionsProps = { cycle: Cycle };
