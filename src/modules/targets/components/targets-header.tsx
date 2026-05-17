import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';
import { CreateTargetDialogTrigger } from '@/modules/targets/components/dialogs/create-target-dialog-trigger';

export function TargetsHeader({ asSubtitle }: TargetsHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t('targets:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    >
      <PermissionGuard permissions={ApiPermissions.Targets.CREATE}>
        <CreateTargetDialogTrigger>
          <Button>
            <PlusIcon />
            {t('targets:actions.addNew')}
          </Button>
        </CreateTargetDialogTrigger>
      </PermissionGuard>
    </PageHeader>
  );
}

export type TargetsHeaderProps = {
  asSubtitle?: boolean;
};
