import type { TargetsSearchParams } from '@/modules/targets/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { targetsIndexQueryOptions } from '@/modules/targets/api/query-options';
import { TargetsHeader } from '@/modules/targets/components/targets-header';
import { targetsTableColumns } from '@/modules/targets/data/data-table-settings';
import { targetsSearchSchema } from '@/modules/targets/schemas';

export const Route = createFileRoute('/app/targets/')({
  validateSearch: targetsSearchSchema,
  loaderDeps: ({ search }): TargetsSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(targetsIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'targets:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(targetsIndexQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <TargetsHeader />
      <DataView
        preferencesNamespace="targets"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={targetsTableColumns}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
