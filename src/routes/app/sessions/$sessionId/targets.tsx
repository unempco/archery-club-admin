import type { SessionTargetsSearchParams } from '@/modules/targets/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { sessionTargetsQueryOptions } from '@/modules/targets/api/query-options';
import { TargetCard } from '@/modules/targets/components/target-card';
import { TargetsHeader } from '@/modules/targets/components/targets-header';
import { targetsTableColumns } from '@/modules/targets/data/data-table-settings';
import { sessionTargetsSearchSchema } from '@/modules/targets/schemas';

export const Route = createFileRoute('/app/sessions/$sessionId/targets')({
  validateSearch: sessionTargetsSearchSchema,
  loaderDeps: ({ search }): SessionTargetsSearchParams => search,
  loader: async ({ context: { queryClient }, params: { sessionId }, deps }) =>
    queryClient.ensureQueryData(sessionTargetsQueryOptions(sessionId, deps)),
  head: createRouteHead({ type: 'index', titleI18nKey: 'targets:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    sessionTargetsQueryOptions(params.sessionId, search),
  );

  return (
    <>
      <TargetsHeader asSubtitle enableCreate={false} />
      <DataView
        preferencesNamespace="sessions.targets"
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
