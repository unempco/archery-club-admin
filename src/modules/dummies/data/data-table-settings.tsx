import type { Dummy } from '@/modules/dummies/types';
import type { ColumnDef } from '@tanstack/react-table';

import { Translation } from 'react-i18next';

import { DataTableCell } from '@/core/components/date-table/data-table-cell';

export const dummiesTableColumns: ColumnDef<Dummy>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <Translation>
        {(t) => <span>{t('core:greetings.welcomeBack')}</span>}
      </Translation>
    ),
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <DataTableCell value={row.getValue('image')} type="image" />
    ),
  },
  {
    accessorKey: 'key',
    header: 'Key',
    cell: ({ row }) => (
      <DataTableCell value={row.getValue('key')} type="badges" />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <DataTableCell value={row.getValue('email')} type="email" />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <DataTableCell value={row.getValue('status')} type="status" />
    ),
  },
  {
    accessorKey: 'special',
    header: 'Is Special?',
    cell: ({ row }) => (
      <DataTableCell value={row.getValue('special')} type="boolean" />
    ),
  },
];
