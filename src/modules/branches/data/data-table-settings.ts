import type { Branch } from '@/modules/branches/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableBranchActionsCell } from '@/modules/branches/components/data/data-table-branch-actions-cell';

export const branchesTableColumns: ColumnDef<Branch>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'branches:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'branches:fields.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'maintenanceThreshold',
    meta: {
      headerI18nKey: 'branches:fields.maintenanceThreshold',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'maintenanceWarningOffset',
    meta: {
      headerI18nKey: 'branches:fields.maintenanceWarningOffset',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'branches:fields.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'closedAt',
    meta: {
      headerI18nKey: 'branches:fields.closedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'branches:fields.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableBranchActionsCell,
    enableHiding: false,
  },
];
