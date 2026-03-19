import type { DataTableColumnType } from '@/core/constants/data-table';

/* Experimental custom table config */
export type DataTableColumnSetting<TData extends Record<string, string>> = {
  accessorKey: TData[keyof TData];
  headerI18nKey: string;
  headerDefault?: string;
  type: DataTableColumnType;
};

export type DataTableColumnVisibilityState<TData, TValue = boolean> = {
  [key in keyof TData]: TValue;
};
