import type { SessionsSearchParams } from '@/modules/sessions/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { sessionsIndexQueryOptions } from '@/modules/sessions/api/query-options';
import { SessionsHeader } from '@/modules/sessions/components/sessions-header';
import { sessionsTableColumns } from '@/modules/sessions/data/data-table-settings';
import { sessionsSearchSchema } from '@/modules/sessions/schemas';

export const Route = createFileRoute('/app/sessions/')({
  validateSearch: sessionsSearchSchema,
  loaderDeps: ({ search }): SessionsSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(sessionsIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'sessions:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(sessionsIndexQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <SessionsHeader />
      <DataView
        preferencesNamespace="sessions"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={sessionsTableColumns}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
