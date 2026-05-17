import type { Session } from '@/modules/sessions/types';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateSessionDialog } from '@/modules/sessions/components/dialogs/update-session-dialog';
import { useDeleteSessionMutation } from '@/modules/sessions/hooks/mutations';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function SessionHeader({ session }: SessionHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteSessionMutation({
    sessionId: session.id,
    onSuccess: () => navigate({ to: '/app/sessions' }),
  });

  return (
    <>
      <PageHeader
        title={session.key}
        itemId={session.id}
        enableBack
        backToFallback="/app/sessions/"
      >
        <PermissionGuard permissions={ApiPermissions.Sessions.UPDATE}>
          <Button onClick={() => setEditOpen(true)}>
            <PencilIcon />
            {t('actions.edit')}
          </Button>
        </PermissionGuard>
        <PermissionGuard permissions={ApiPermissions.Sessions.DELETE}>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <TrashIcon />
          </Button>
        </PermissionGuard>
      </PageHeader>

      <UpdateSessionDialog
        session={session}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={session.key}
      />
    </>
  );
}

export type SessionHeaderProps = {
  session: Session;
};
