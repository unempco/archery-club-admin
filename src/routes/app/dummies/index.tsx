import type { DummiesSearchParams } from '@/modules/dummies/types';
import type { RowSelectionState, VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { dummiesIndexQueryOptions } from '@/modules/dummies/api/query-options';
import { DummiesHeader } from '@/modules/dummies/componentes/dummies-header';
import {
  dummiesColumnsDefaultState,
  dummiesTableColumns,
} from '@/modules/dummies/data/data-table-settings';
import { dummiesSearchSchema } from '@/modules/dummies/schemas';

export const Route = createFileRoute('/app/dummies/')({
  validateSearch: dummiesSearchSchema,
  loaderDeps: ({ search }): DummiesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(dummiesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navItems.dummies',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ from: '/app/dummies/' });
  const { data } = useSuspenseQuery(dummiesIndexQueryOptions(search));

  // Should be part of columns settings schema
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    dummiesColumnsDefaultState,
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  console.log(rowSelection);

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DummiesHeader selectedItems={Object.keys(rowSelection)} />
      <DataTable
        data={data.items}
        columns={dummiesTableColumns}
        columnVisibility={columnVisibility}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        setColumnVisibility={setColumnVisibility}
        headerSlot={<DataSearch />}
      />
      <DataPaginator
        className="mt-auto"
        currentPage={search.page}
        pageSize={search.pageSize}
        totalItems={data.meta.total}
      />
    </div>
  );
}
