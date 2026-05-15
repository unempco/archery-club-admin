import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { CreateMaintenanceLogDialogTrigger } from '@/modules/maintenance-logs/componentes/dialogs/create-maintenance-log-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';

export function MaintenanceLogsHeader({
  asSubtitle,
}: MaintenanceLogsHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t('maintenanceLogs:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    >
      <CreateMaintenanceLogDialogTrigger>
        <Button>
          <PlusIcon />
          {t('maintenanceLog:actions.addNew')}
        </Button>
      </CreateMaintenanceLogDialogTrigger>
    </PageHeader>
  );
}

export type MaintenanceLogsHeaderProps = {
  asSubtitle?: boolean;
};
