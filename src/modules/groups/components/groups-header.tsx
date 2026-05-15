import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { CreateGroupDialogTrigger } from '@/modules/groups/components/dialogs/create-group-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function GroupsHeader({ asSubtitle }: GroupsHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t('groups:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    >
      <PermissionGuard permissions={ApiPermissions.Groups.CREATE}>
        <CreateGroupDialogTrigger>
          <Button>
            <PlusIcon />
            {t('groups:actions.addNew')}
          </Button>
        </CreateGroupDialogTrigger>
      </PermissionGuard>
    </PageHeader>
  );
}

export type GroupsHeaderProps = {
  asSubtitle?: boolean;
};
