import type { MaintenanceLog } from '@/modules/maintenance-logs/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';

export const maintenanceLogsTableColumns: ColumnDef<MaintenanceLog>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'maintenanceLogs:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'key',
    meta: {
      headerI18nKey: 'maintenanceLogs:fields.key',
      columnType: DataTableColumnType.KEY,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'notes',
    meta: {
      headerI18nKey: 'maintenanceLogs:fields.notes',
      columnType: DataTableColumnType.PARAGRAPH,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'targetId',
    meta: {
      headerI18nKey: 'maintenanceLogs:fields.target',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'performedAt',
    meta: {
      headerI18nKey: 'maintenanceLogs:fields.performedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  // {
  //   id: 'actions',
  //   cell: MaintenanceLogActions,
  //   enableHiding: false,
  // },
];
