import type { PaginationParams } from '@/core/types/search-params';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data-paginator';
import { DataTable } from '@/core/components/data-table';
import { paginationParamsSchema } from '@/core/types/search-params';
import { dummiesQueryOptions } from '@/modules/dummies/api/query-options';
import {
  dummiesColumnsDefaultState,
  dummiesTableColumns,
} from '@/modules/dummies/data/data-table-settings';

export const Route = createFileRoute('/app/dummies/')({
  validateSearch: paginationParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(dummiesQueryOptions(deps)),
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ from: '/app/dummies/' });
  const navigate = useNavigate({ from: '/app/dummies/' });
  const { data } = useSuspenseQuery(dummiesQueryOptions(search));

  // Should be part of columns settings schema
  const [columnVisibility, setColumnVisibility] = useState(
    dummiesColumnsDefaultState,
  );

  function setPagination(updates: Partial<PaginationParams>) {
    navigate({
      search: (prev) => ({ ...prev, ...updates }),
    });
  }

  return (
    <div className="min-h-full flex flex-col gap-2">
      <DataTable
        data={data.items}
        columns={dummiesTableColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />
      <DataPaginator
        className="mt-auto"
        currentPage={search.page}
        pageSize={search.pageSize}
        totalItems={data.meta.total}
        setPage={(page) => setPagination({ page })}
        setPageSize={(pageSize) => setPagination({ pageSize, page: 1 })}
      />
    </div>
  );
}
