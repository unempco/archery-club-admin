import type { Branch } from '@/modules/branches/types';

import { useState } from 'react';
import {
  DotsThreeIcon,
  KanbanIcon,
  PencilIcon,
  TargetIcon,
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
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateBranchDialog } from '@/modules/branches/components/dialogs/update-branch-dialog';
import { useDeleteBranchMutation } from '@/modules/branches/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchActions({ branch }: BranchActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteBranchMutation({ branchId: branch.id });

  return (
    <PermissionGuard
      permissions={[
        ApiPermissions.Branches.UPDATE,
        ApiPermissions.Branches.DELETE,
        ApiPermissions.Cycles.READ,
      ]}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeIcon weight="bold" className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <PermissionGuard permissions={ApiPermissions.Cycles.READ}>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: '/app/branches/$branchId/cycles',
                  params: { branchId: String(branch.id) },
                })
              }
            >
              <KanbanIcon />
              {t('branches:actions.viewCycles')}
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Targets.READ}>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: '/app/branches/$branchId/targets',
                  params: { branchId: String(branch.id) },
                })
              }
            >
              <TargetIcon />
              {t('branches:actions.viewTargets')}
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard
            permissions={[
              ApiPermissions.Cycles.READ,
              ApiPermissions.Targets.READ,
            ]}
          >
            <DropdownMenuSeparator />
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Branches.UPDATE}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Branches.DELETE}>
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

      <UpdateBranchDialog
        branch={branch}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={branch.name}
      />
    </PermissionGuard>
  );
}

export type BranchActionsProps = { branch: Branch };
