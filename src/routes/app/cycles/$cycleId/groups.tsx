import type { CycleGroupsSearchParams } from '@/modules/groups/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { cycleGroupsQueryOptions } from '@/modules/groups/api/query-options';
import { GroupsHeader } from '@/modules/groups/components/groups-header';
import { groupsTableColumns } from '@/modules/groups/data/data-table-settings';
import { cycleGroupsSearchSchema } from '@/modules/groups/schemas';

export const Route = createFileRoute('/app/cycles/$cycleId/groups')({
  validateSearch: cycleGroupsSearchSchema,
  loaderDeps: ({ search }): CycleGroupsSearchParams => search,
  loader: async ({ context: { queryClient }, params: { cycleId }, deps }) =>
    queryClient.ensureQueryData(cycleGroupsQueryOptions(cycleId, deps)),
  head: createRouteHead({ type: 'generic', titleI18nKey: 'groups:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    cycleGroupsQueryOptions(params.cycleId, search),
  );

  return (
    <>
      <GroupsHeader titleVariant="h3" />
      <DataView
        preferencesNamespace="cycles.groups"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={groupsTableColumns}
        dataTableDefaultVisibleColumns={{ cycleId: false }}
        dataFiltersSlot={<DataSearch />}
      />
    </>
  );
}
