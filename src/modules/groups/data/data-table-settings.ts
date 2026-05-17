import type { Group } from '@/modules/groups/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableGroupActionsCell } from '@/modules/groups/components/data/data-table-group-actions-cell';
import { DateTableWeekdayCell } from '@/modules/groups/components/data/date-table-weekday-cell';

export const groupsTableColumns: ColumnDef<Group>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'groups:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'groups:fields.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'weekday',
    meta: {
      headerI18nKey: 'groups:fields.weekday',
    },
    header: DataTableHeader,
    cell: DateTableWeekdayCell,
  },
  {
    accessorKey: 'startTime',
    meta: {
      headerI18nKey: 'groups:fields.startTime',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'durationMinutes',
    meta: {
      headerI18nKey: 'groups:fields.duration',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'cycleId',
    meta: {
      headerI18nKey: 'groups:fields.cycle',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'groups:fields.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'groups:fields.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'deletedAt',
    meta: {
      headerI18nKey: 'groups:fields.deletedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableGroupActionsCell,
    enableHiding: false,
  },
];
