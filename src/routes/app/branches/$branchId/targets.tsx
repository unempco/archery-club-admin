import type { BranchTargetsSearchParams } from '@/modules/targets/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { branchTargetsQueryOptions } from '@/modules/targets/api/query-options';
import { TargetCard } from '@/modules/targets/components/target-card';
import { TargetsHeader } from '@/modules/targets/components/targets-header';
import { targetsTableColumns } from '@/modules/targets/data/data-table-settings';
import { branchTargetsSearchSchema } from '@/modules/targets/schemas';

export const Route = createFileRoute('/app/branches/$branchId/targets')({
  validateSearch: branchTargetsSearchSchema,
  loaderDeps: ({ search }): BranchTargetsSearchParams => search,
  loader: async ({ context: { queryClient }, params: { branchId }, deps }) =>
    queryClient.ensureQueryData(branchTargetsQueryOptions(branchId, deps)),
  head: createRouteHead({ type: 'index', titleI18nKey: 'targets:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    branchTargetsQueryOptions(params.branchId, search),
  );

  return (
    <>
      <TargetsHeader asSubtitle />
      <DataView
        preferencesNamespace="branches.targets"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={targetsTableColumns}
        dataTableDefaultVisibleColumns={{ branchId: false }}
        dataFiltersSlot={<DataSearch />}
        dataGridCardSlot={(target) => (
          <TargetCard target={target} key={target.id} />
        )}
      />
    </>
  );
}
