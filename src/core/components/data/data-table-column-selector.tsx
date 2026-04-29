import type { Table } from '@tanstack/react-table';

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
  table,
  className,
  ...restOfProps
}: DataTableColumnSelectorProps<TData>) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn('cursor-pointer', className)}
          {...restOfProps}
        >
          <ColumnsPlusRightIcon />
          {t('nouns.column_other')}
          <CaretDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize cursor-pointer"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                {t(column.columnDef.meta?.headerI18nKey || column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataTableColumnSelectorProps<TData> =
  React.ComponentProps<'button'> & {
    table: Table<TData>;
  };
