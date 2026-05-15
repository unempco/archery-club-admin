import type { Cycle } from '@/modules/cycles/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableCycleActionsCell } from '@/modules/cycles/components/data/data-table-cycle-actions-cell';

export const cyclesTableColumns: ColumnDef<Cycle>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'cycles:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'cycles:fields.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'startDate',
    meta: {
      headerI18nKey: 'cycles:fields.startDate',
      columnType: DataTableColumnType.DATE,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'sessionCount',
    meta: {
      headerI18nKey: 'cycles:fields.sessionCount',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'branchId',
    meta: {
      headerI18nKey: 'cycles:fields.branch',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'cycles:fields.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'cycles:fields.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'deletedAt',
    meta: {
      headerI18nKey: 'cycles:fields.deletedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableCycleActionsCell,
    enableHiding: false,
  },
];
