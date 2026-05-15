import type { GroupSessionsSearchParams } from '@/modules/sessions/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { groupSessionsQueryOptions } from '@/modules/sessions/api/query-options';
import { SessionsHeader } from '@/modules/sessions/components/sessions-header';
import { sessionsTableColumns } from '@/modules/sessions/data/data-table-settings';
import { groupSessionsSearchSchema } from '@/modules/sessions/schemas';

export const Route = createFileRoute('/app/groups/$groupId/sessions')({
  validateSearch: groupSessionsSearchSchema,
  loaderDeps: ({ search }): GroupSessionsSearchParams => search,
  loader: async ({ context: { queryClient }, params: { groupId }, deps }) =>
    queryClient.ensureQueryData(groupSessionsQueryOptions(groupId, deps)),
  head: createRouteHead({ type: 'generic', titleI18nKey: 'sessions:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    groupSessionsQueryOptions(params.groupId, search),
  );

  return (
    <>
      <SessionsHeader titleVariant="h3" />
      <DataView
        preferencesNamespace="groups.sessions"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={sessionsTableColumns}
        dataTableDefaultVisibleColumns={{ groupId: false }}
        dataFiltersSlot={<DataSearch />}
      />
    </>
  );
}
