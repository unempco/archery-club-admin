import type { Session } from '@/modules/sessions/types';

import { useState } from 'react';
import { DotsThreeIcon, PencilIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateSessionDialog } from '@/modules/sessions/components/dialogs/update-session-dialog';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function SessionActions({ session }: SessionsActionsProps) {
  const { t } = useTranslation();

  const [editOpen, setEditOpen] = useState(false);

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
          <PermissionGuard permissions={ApiPermissions.Sessions.UPDATE}>
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
    </PermissionGuard>
  );
}

export type SessionsActionsProps = { session: Session };
