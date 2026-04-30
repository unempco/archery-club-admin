import type { Dummy } from '@/modules/dummies/types';
import type { ColumnDef, VisibilityState } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableCheckboxCell } from '@/core/components/data/data-table-checkbox-cell';
import { DataTableCheckboxHeader } from '@/core/components/data/data-table-checkbox-header';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DummyActions } from '@/modules/dummies/componentes/dummy-actions';

export const dummiesTableColumns: ColumnDef<Dummy>[] = [
  {
    id: 'select',
    header: DataTableCheckboxHeader,
    cell: DataTableCheckboxCell,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'dummies:attribs.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
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
  {
    accessorKey: 'created_at',
    meta: {
      headerI18nKey: 'dummies:attribs.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DummyActions,
    enableHiding: false,
  },
];

export const dummiesColumnsDefaultState: VisibilityState = {
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
