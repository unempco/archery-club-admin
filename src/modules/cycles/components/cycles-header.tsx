import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CreateCycleDialogTrigger } from '@/modules/cycles/components/dialogs/create-cycle-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function CyclesHeader({ asSubtitle }: CyclesHeaderProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const canCreate = hasPermissions(ApiPermissions.Cycles.CREATE);

  return (
    <PageHeader
      title={t('cycles:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    >
      {canCreate && (
        <CreateCycleDialogTrigger>
          <Button>
            <PlusIcon />
            {t('cycles:actions.addNew')}
          </Button>
        </CreateCycleDialogTrigger>
      )}
    </PageHeader>
  );
}

export type CyclesHeaderProps = {
  asSubtitle?: boolean;
};
