import type { Session } from '@/modules/sessions/types';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DataTableSessionActionsCell } from '@/modules/sessions/components/data/data-table-session-actions-cell';

export const sessionsTableColumns: ColumnDef<Session>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'sessions:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'key',
    meta: {
      headerI18nKey: 'sessions:fields.key',
      columnType: DataTableColumnType.KEY,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'notes',
    meta: {
      headerI18nKey: 'sessions:fields.notes',
      columnType: DataTableColumnType.PARAGRAPH,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'durationMinutes',
    meta: {
      headerI18nKey: 'sessions:fields.duration',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'groupId',
    meta: {
      headerI18nKey: 'sessions:fields.group',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'branchId',
    meta: {
      headerI18nKey: 'sessions:fields.branch',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'scheduledAt',
    meta: {
      headerI18nKey: 'sessions:fields.scheduledAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'sessions:fields.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: DataTableSessionActionsCell,
    enableHiding: false,
  },
];
