import type { BranchesSearchParams } from '@/modules/branches/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { branchesIndexQueryOptions } from '@/modules/branches/api/query-options';
import { BranchesHeader } from '@/modules/branches/components/branches-header';
import { branchesTableColumns } from '@/modules/branches/data/data-table-settings';
import { branchesSearchSchema } from '@/modules/branches/schemas';

export const Route = createFileRoute('/app/branches/')({
  validateSearch: branchesSearchSchema,
  loaderDeps: ({ search }): BranchesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(branchesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'branches:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(branchesIndexQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchesHeader />
      <DataView
        preferencesNamespace="branches"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={branchesTableColumns}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
