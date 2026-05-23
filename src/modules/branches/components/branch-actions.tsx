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
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UpdateBranchDialog } from '@/modules/branches/components/dialogs/update-branch-dialog';
import { useDeleteBranchMutation } from '@/modules/branches/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchActions({ branch }: BranchActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteBranchMutation({ branchId: branch.id });

  const canViewCycles = hasPermissions([ApiPermissions.Cycles.READ]);
  const canViewTargets = hasPermissions(ApiPermissions.Targets.READ);
  const canUpdate = hasPermissions(ApiPermissions.Branches.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Branches.DELETE);

  if (canViewCycles || canViewTargets || canUpdate || canDelete)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsThreeIcon weight="bold" className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {canViewCycles && (
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
            )}
            {canViewTargets && (
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
            )}
            {[canViewTargets, canViewCycles].some(Boolean) &&
              [canUpdate, canDelete].some(Boolean) && <DropdownMenuSeparator />}
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
      </>
    );
}

export type BranchActionsProps = { branch: Branch };
