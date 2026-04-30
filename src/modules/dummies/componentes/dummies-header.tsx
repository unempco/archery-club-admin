import { FolderPlusIcon, PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/core/components/ui/button';
import { CreateDummyDialogTrigger } from '@/modules/dummies/componentes/dialogs/create-dummy-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';

export function DummiesHeader({ selectedItems }: DummiesHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader title={t('layout:navItems.dummies')}>
      <CreateDummyDialogTrigger>
        <Button>
          <PlusIcon />
          {t('dummies:actions.addNew')}
        </Button>
      </CreateDummyDialogTrigger>
      <Button
        variant="secondary"
        size="icon"
        disabled={!selectedItems?.length}
        onClick={() => toast.info(JSON.stringify(selectedItems))}
      >
        <FolderPlusIcon />
      </Button>
    </PageHeader>
  );
}

export type DummiesHeaderProps = {
  selectedItems: string[];
};
