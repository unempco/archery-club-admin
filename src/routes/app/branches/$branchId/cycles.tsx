import type { BranchCyclesSearchParams } from '@/modules/cycles/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { branchCyclesQueryOptions } from '@/modules/cycles/api/query-options';
import { CyclesHeader } from '@/modules/cycles/components/cycles-header';
import { cyclesTableColumns } from '@/modules/cycles/data/data-table-settings';
import { branchCyclesSearchSchema } from '@/modules/cycles/schemas';

export const Route = createFileRoute('/app/branches/$branchId/cycles')({
  validateSearch: branchCyclesSearchSchema,
  loaderDeps: ({ search }): BranchCyclesSearchParams => search,
  loader: async ({ context: { queryClient }, params: { branchId }, deps }) =>
    queryClient.ensureQueryData(branchCyclesQueryOptions(branchId, deps)),
  head: createRouteHead({ type: 'generic', titleI18nKey: 'cycles:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    branchCyclesQueryOptions(params.branchId, search),
  );

  return (
    <>
      <CyclesHeader asSubtitle />
      <DataView
        preferencesNamespace="branches.cycles"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={cyclesTableColumns}
        dataTableDefaultVisibleColumns={{ branchId: false }}
        dataFiltersSlot={<DataSearch />}
      />
    </>
  );
}
