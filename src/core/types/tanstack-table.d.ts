import '@tanstack/react-table';

import type { DataTableColumnType } from '@/core/constants/data-table'; //or vue, svelte, solid, qwik, etc.
import type { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    type?: DataTableColumnType;
  }
}
