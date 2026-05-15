import type { Group } from '@/modules/groups/types';

import { useState } from 'react';
import {
  ClockCountdownIcon,
  DotsThreeIcon,
  PencilIcon,
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
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { UpdateGroupDialog } from '@/modules/groups/components/dialogs/update-group-dialog';
import { useDeleteGroupMutation } from '@/modules/groups/hooks/mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function GroupActions({ group }: GroupActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const deleteMutation = useDeleteGroupMutation({ groupId: group.id });

  return (
    <PermissionGuard
      permissions={[ApiPermissions.Groups.UPDATE, ApiPermissions.Groups.DELETE]}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeIcon weight="bold" className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <PermissionGuard permissions={ApiPermissions.Sessions.READ}>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: '/app/groups/$groupId/sessions',
                  params: {
                    groupId: String(group.id),
                  },
                })
              }
            >
              <ClockCountdownIcon />
              {t('groups:actions.viewSessions')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Groups.UPDATE}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permissions={ApiPermissions.Groups.DELETE}>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon />
              {t('actions.delete')}
            </DropdownMenuItem>
          </PermissionGuard>
        </DropdownMenuContent>
      </DropdownMenu>

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
    </PermissionGuard>
  );
}

export type GroupActionsProps = { group: Group };
