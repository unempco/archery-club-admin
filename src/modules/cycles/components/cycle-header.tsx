import type { Cycle } from '@/modules/cycles/types';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UpdateCycleDialog } from '@/modules/cycles/components/dialogs/update-cycle-dialog';
import { useDeleteCycleMutation } from '@/modules/cycles/hooks/mutations';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function CycleHeader({ cycle }: CycleHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteCycleMutation({
    cycleId: cycle.id,
    onSuccess: () => navigate({ to: '/app/cycles' }),
  });

  const canUpdate = hasPermissions(ApiPermissions.Cycles.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Cycles.DELETE);

  return (
    <>
      <PageHeader
        title={cycle.name}
        itemId={cycle.id}
        enableBack
        backToFallback="/app/cycles/"
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
    </>
  );
}

export type CycleHeaderProps = {
  cycle: Cycle;
};
