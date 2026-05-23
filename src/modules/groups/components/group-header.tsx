import type { Group } from '@/modules/groups/types';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UpdateGroupDialog } from '@/modules/groups/components/dialogs/update-group-dialog';
import { useDeleteGroupMutation } from '@/modules/groups/hooks/mutations';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function GroupHeader({ group }: GroupHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteGroupMutation({
    groupId: group.id,
    onSuccess: () => navigate({ to: '/app/groups' }),
  });

  const canUpdate = hasPermissions(ApiPermissions.Groups.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Groups.DELETE);

  return (
    <>
      <PageHeader
        title={group.name}
        itemId={group.id}
        enableBack
        backToFallback="/app/groups/"
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

      <UpdateGroupDialog
        group={group}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={group.name}
      />
    </>
  );
}

export type GroupHeaderProps = {
  group: Group;
};
