import type { Session } from '@/modules/sessions/types';

import { useState } from 'react';
import {
  DotsThreeIcon,
  PencilIcon,
  RowsPlusBottomIcon,
  TargetIcon,
} from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { AssignSessionTargetsDialog } from '@/modules/sessions/components/dialogs/assign-session-targets-dialog';
import { UpdateSessionDialog } from '@/modules/sessions/components/dialogs/update-session-dialog';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function SessionActions({ session }: SessionsActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  return (
    <PermissionGuard
      permissions={[
        ApiPermissions.Sessions.UPDATE,
        ApiPermissions.Sessions.DELETE,
      ]}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeIcon weight="bold" className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <PermissionGuard permissions={ApiPermissions.Targets.READ}>
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
            <DropdownMenuSeparator />
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Sessions.UPDATE}>
            <DropdownMenuItem onClick={() => setAssignOpen(true)}>
              <RowsPlusBottomIcon />
              {t('sessions:actions.assignTargets')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          </PermissionGuard>
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
    </PermissionGuard>
  );
}

export type SessionsActionsProps = { session: Session };
