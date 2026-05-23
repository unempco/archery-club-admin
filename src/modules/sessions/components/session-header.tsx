import type { Session } from '@/modules/sessions/types';

import { useState } from 'react';
import {
  PencilIcon,
  RowsPlusBottomIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { AssignSessionTargetsDialog } from '@/modules/sessions/components/dialogs/assign-session-targets-dialog';
import { UpdateSessionDialog } from '@/modules/sessions/components/dialogs/update-session-dialog';
import { useDeleteSessionMutation } from '@/modules/sessions/hooks/mutations';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function SessionHeader({ session }: SessionHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteSessionMutation({
    sessionId: session.id,
    onSuccess: () => navigate({ to: '/app/sessions' }),
  });

  const canAssignTargets = hasPermissions(ApiPermissions.Sessions.UPDATE);
  const canUpdate = hasPermissions(ApiPermissions.Sessions.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Sessions.DELETE);

  return (
    <>
      <PageHeader
        title={session.key}
        itemId={session.id}
        enableBack
        backToFallback="/app/sessions/"
      >
        {canUpdate && (
          <Button onClick={() => setEditOpen(true)}>
            <PencilIcon />
            {t('actions.edit')}
          </Button>
        )}
        {canAssignTargets && (
          <Button variant="secondary" onClick={() => setAssignOpen(true)}>
            <RowsPlusBottomIcon />
            {t('sessions:actions.assignTargets')}
          </Button>
        )}
        {canDelete && (
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <TrashIcon />
          </Button>
        )}
      </PageHeader>

      <UpdateSessionDialog
        session={session}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <AssignSessionTargetsDialog
        session={session}
        open={assignOpen}
        onOpenChange={setAssignOpen}
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
