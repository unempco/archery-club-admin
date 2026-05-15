import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { CreateCycleDialogTrigger } from '@/modules/cycles/components/dialogs/create-cycle-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function CyclesHeader({ asSubtitle }: CyclesHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t('cycles:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    >
      <PermissionGuard permissions={ApiPermissions.Cycles.CREATE}>
        <CreateCycleDialogTrigger>
          <Button>
            <PlusIcon />
            {t('cycles:actions.addNew')}
          </Button>
        </CreateCycleDialogTrigger>
      </PermissionGuard>
    </PageHeader>
  );
}

export type CyclesHeaderProps = {
  asSubtitle?: boolean;
};
