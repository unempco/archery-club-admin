import type { CyclesSearchParams } from '@/modules/cycles/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { cyclesIndexQueryOptions } from '@/modules/cycles/api/query-options';
import { CyclesHeader } from '@/modules/cycles/components/cycles-header';
import { cyclesTableColumns } from '@/modules/cycles/data/data-table-settings';
import { cyclesSearchSchema } from '@/modules/cycles/schemas';

export const Route = createFileRoute('/app/cycles/')({
  validateSearch: cyclesSearchSchema,
  loaderDeps: ({ search }): CyclesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(cyclesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'cycles:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(cyclesIndexQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <CyclesHeader />
      <DataView
        preferencesNamespace="cycles"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={cyclesTableColumns}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
