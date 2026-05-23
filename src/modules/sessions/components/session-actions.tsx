import type { Session } from '@/modules/sessions/types';

import { useState } from 'react';
import {
  DotsThreeIcon,
  PencilIcon,
  RowsPlusBottomIcon,
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
import { AssignSessionTargetsDialog } from '@/modules/sessions/components/dialogs/assign-session-targets-dialog';
import { UpdateSessionDialog } from '@/modules/sessions/components/dialogs/update-session-dialog';
import { useDeleteSessionMutation } from '@/modules/sessions/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function SessionActions({ session }: SessionsActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermissions } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteMutation = useDeleteSessionMutation({
    sessionId: session.id,
  });

  const canViewTargets = hasPermissions(ApiPermissions.Targets.READ);
  const canAssignTargets = hasPermissions(ApiPermissions.Sessions.UPDATE);
  const canUpdate = hasPermissions(ApiPermissions.Sessions.UPDATE);
  const canDelete = hasPermissions(ApiPermissions.Sessions.DELETE);

  if (canViewTargets || canUpdate || canAssignTargets || canDelete)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsThreeIcon weight="bold" className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {canViewTargets && (
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: '/app/sessions/$sessionId/targets',
                    params: { sessionId: String(session.id) },
                  })
                }
              >
                <TargetIcon />
                {t('sessions:actions.viewTargets')}
              </DropdownMenuItem>
            )}

            {canViewTargets &&
              [canUpdate, canAssignTargets, canDelete].some(Boolean) && (
                <DropdownMenuSeparator />
              )}

            {canAssignTargets && (
              <DropdownMenuItem onClick={() => setAssignOpen(true)}>
                <RowsPlusBottomIcon />
                {t('sessions:actions.assignTargets')}
              </DropdownMenuItem>
            )}
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

export type SessionsActionsProps = { session: Session };
