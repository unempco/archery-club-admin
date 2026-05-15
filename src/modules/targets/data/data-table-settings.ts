import type { Target } from '@/modules/targets/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableTargetActionsCell } from '@/modules/targets/components/data/data-table-target-actions-cell';
import { DateTableTargetStatusCell } from '@/modules/targets/components/data/data-table-target-status-cell';

export const targetsTableColumns: ColumnDef<Target>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'targets:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'targets:fields.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'usageCount',
    meta: {
      headerI18nKey: 'targets:fields.usageCount',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'branchId',
    meta: {
      headerI18nKey: 'targets:fields.branch',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'targets:fields.status',
    },
    header: DataTableHeader,
    cell: DateTableTargetStatusCell,
  },
  {
    accessorKey: 'retiredAt',
    meta: {
      headerI18nKey: 'targets:fields.retiredAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'targets:fields.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'deletedAt',
    meta: {
      headerI18nKey: 'targets:fields.deletedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableTargetActionsCell,
    enableHiding: false,
  },
];
