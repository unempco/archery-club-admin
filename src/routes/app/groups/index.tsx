import type { GroupsSearchParams } from '@/modules/groups/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { groupsIndexQueryOptions } from '@/modules/groups/api/query-options';
import { GroupsHeader } from '@/modules/groups/components/groups-header';
import { groupsTableColumns } from '@/modules/groups/data/data-table-settings';
import { groupsSearchSchema } from '@/modules/groups/schemas';

export const Route = createFileRoute('/app/groups/')({
  validateSearch: groupsSearchSchema,
  loaderDeps: ({ search }): GroupsSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(groupsIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'groups:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(groupsIndexQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <GroupsHeader />
      <DataView
        preferencesNamespace="groups"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={groupsTableColumns}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
