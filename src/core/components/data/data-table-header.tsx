import type { HeaderContext } from '@tanstack/react-table';

import { useTranslation } from 'react-i18next';

export function DataTableHeader<TData>({
  column,
}: DataTableHeaderProps<TData>) {
  const { t } = useTranslation();
  const headerI18nKey = column.columnDef.meta?.headerI18nKey ?? '';
  const headerDefault = column.id;

  return <span>{t(headerI18nKey, { defaultValue: headerDefault })}</span>;
}

export type DataTableHeaderProps<TData> = HeaderContext<TData, unknown>;
