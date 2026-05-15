import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/modules/shared/components/page-header';

export function SessionsHeader({ asSubtitle }: SessionsHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t('sessions:name')}
      titleVariant={asSubtitle ? 'h2' : 'h1'}
    />
  );
}

export type SessionsHeaderProps = {
  asSubtitle?: boolean;
};
