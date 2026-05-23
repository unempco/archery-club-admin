import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';
import { CreateTargetDialogTrigger } from '@/modules/targets/components/dialogs/create-target-dialog-trigger';

export function TargetsHeader({
  asSubtitle,
  enableCreate = true,
}: TargetsHeaderProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const canCreate =
    hasPermissions(ApiPermissions.Targets.CREATE) && enableCreate;

  return (
    <PageHeader
      title={t('targets:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    >
      {canCreate && (
        <CreateTargetDialogTrigger>
          <Button>
            <PlusIcon />
            {t('targets:actions.addNew')}
          </Button>
        </CreateTargetDialogTrigger>
      )}
    </PageHeader>
  );
}

export type TargetsHeaderProps = {
  enableCreate?: boolean;
  asSubtitle?: boolean;
};
