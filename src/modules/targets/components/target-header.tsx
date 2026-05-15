import type { Target } from '@/modules/targets/types';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';
import { UpdateTargetDialog } from '@/modules/targets/components/dialogs/update-target-dialog';
import { useDeleteTargetMutation } from '@/modules/targets/hooks/mutations';

export function TargetHeader({ target }: TargetHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteTargetMutation({
    targetId: target.id,
    onSuccess: () => navigate({ to: '/app/targets' }),
  });

  return (
    <>
      <PageHeader
        title={target.name}
        itemId={target.id}
        enableBack
        backToFallback="/app/targets/"
      >
        <PermissionGuard permissions={ApiPermissions.Targets.UPDATE}>
          <Button onClick={() => setEditOpen(true)}>
            <PencilIcon />
            {t('actions.edit')}
          </Button>
        </PermissionGuard>
        <PermissionGuard permissions={ApiPermissions.Targets.DELETE}>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <TrashIcon />
          </Button>
        </PermissionGuard>
      </PageHeader>

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

export type TargetHeaderProps = {
  target: Target;
};
