import type { DataTableColumnVisibilityState } from '@/core/types/data-table';
import type { ColumnDef } from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { DataTableColumnSelector } from '@/core/components/date-table/data-table-column-selector';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';

export function DataTable<TData>({
  data,
  columns,
  columnVisibility,
  setColumnVisibility,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // @ts-expect-error It works as documentation says
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <>
      <div className="flex justify-end">
        <DataTableColumnSelector table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  columnVisibility: DataTableColumnVisibilityState<TData>;
  setColumnVisibility: (
    visibilityState: DataTableColumnVisibilityState<TData>,
  ) => void;
};
