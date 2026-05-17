import type { Branch } from '@/modules/branches/types';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateBranchDialog } from '@/modules/branches/components/dialogs/update-branch-dialog';
import { useDeleteBranchMutation } from '@/modules/branches/hooks/mutations';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchHeader({ branch }: BranchHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteBranchMutation({
    branchId: branch.id,
    onSuccess: () => navigate({ to: '/app/branches' }),
  });

  return (
    <>
      <PageHeader
        title={branch.name}
        itemId={branch.id}
        enableBack
        backToFallback="/app/branches/"
      >
        <PermissionGuard permissions={ApiPermissions.Branches.UPDATE}>
          <Button onClick={() => setEditOpen(true)}>
            <PencilIcon />
            {t('actions.edit')}
          </Button>
        </PermissionGuard>
        <PermissionGuard permissions={ApiPermissions.Branches.DELETE}>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <TrashIcon />
          </Button>
        </PermissionGuard>
      </PageHeader>

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

export type BranchHeaderProps = {
  branch: Branch;
};
