import type { Branch } from '@/modules/branches/types';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UpdateBranchDialog } from '@/modules/branches/components/dialogs/update-branch-dialog';
import { useDeleteBranchMutation } from '@/modules/branches/hooks/mutations';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchHeader({ branch }: BranchHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteBranchMutation({
    branchId: branch.id,
    onSuccess: () => navigate({ to: '/app/branches' }),
  });

  const canUpdate = hasPermissions(ApiPermissions.Branches.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Branches.DELETE);

  return (
    <>
      <PageHeader
        title={branch.name}
        itemId={branch.id}
        enableBack
        backToFallback="/app/branches/"
      >
        {canUpdate && (
          <Button onClick={() => setEditOpen(true)}>
            <PencilIcon />
            {t('actions.edit')}
          </Button>
        )}
        {canDelete && (
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <TrashIcon />
          </Button>
        )}
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
