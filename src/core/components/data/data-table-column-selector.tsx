import type { ColumnDef, VisibilityState } from '@tanstack/react-table';
import type { ComponentProps, Dispatch, SetStateAction } from 'react';

import { CaretDownIcon, ColumnsPlusRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { cn } from '@/core/lib/utils';

export function DataTableColumnSelector<TData>({
  columns,
  visibilityState,
  setVisibilityState,
  className,
  ...restOfProps
}: DataTableColumnSelectorProps<TData>) {
  const { t } = useTranslation();

  const hideableColumns = columns.filter(
    (column) =>
      column.enableHiding !== false &&
      (column.id ?? ('accessorKey' in column && column.accessorKey)),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'cursor-pointer animate-in fade-in duration-300',
            className,
          )}
          {...restOfProps}
        >
          <ColumnsPlusRightIcon />
          <span className="max-sm:hidden">{t('core:nouns.column_other')}</span>
          <CaretDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {hideableColumns.map((column) => {
          const columnId = (column.id ??
            ('accessorKey' in column && String(column.accessorKey))) as string;
          const isVisible = visibilityState[columnId] ?? true;

          return (
            <DropdownMenuCheckboxItem
              key={columnId}
              className="capitalize cursor-pointer"
              checked={isVisible}
              onCheckedChange={(value) =>
                setVisibilityState((prev) => ({ ...prev, [columnId]: value }))
              }
            >
              {t(column.meta?.headerI18nKey || columnId)}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataTableColumnSelectorProps<TData> = ComponentProps<'button'> & {
  columns: ColumnDef<TData>[];
  visibilityState: VisibilityState;
  setVisibilityState: Dispatch<SetStateAction<VisibilityState>>;
};
