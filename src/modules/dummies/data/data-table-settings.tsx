import type { DataTableColumnVisibilityState } from '@/core/types/data-table';
import type { Dummy } from '@/modules/dummies/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/date-table/data-table-cell';
import { DataTableHeader } from '@/core/components/date-table/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';

export const dummiesTableColumns: ColumnDef<Dummy>[] = [
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'dummies:attribs.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'image',
    meta: {
      headerI18nKey: 'dummies:attribs.image',
      columnType: DataTableColumnType.IMAGE,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'key',
    meta: {
      headerI18nKey: 'dummies:attribs.key',
      columnType: DataTableColumnType.BADGES,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'email',
    meta: {
      headerI18nKey: 'dummies:attribs.email',
      columnType: DataTableColumnType.EMAIL,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'dummies:attribs.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'special',
    meta: {
      headerI18nKey: 'dummies:attribs.isSpecial',
      columnType: DataTableColumnType.BOOLEAN,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
];

export const dummiesColumnsDefaultState: DataTableColumnVisibilityState<Dummy> =
  {
    count: true,
    created_at: true,
    description: true,
    email: true,
    id: true,
    image: false,
    key: true,
    name: true,
    price: true,
    special: true,
    status: true,
    website: true,
  };
