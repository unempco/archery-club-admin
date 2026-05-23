import type { TargetMaintenanceLogsSearchParams } from '@/modules/maintenance-logs/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { targetMaintenanceLogsQueryOptions } from '@/modules/maintenance-logs/api/query-options';
import { MaintenanceLogsHeader } from '@/modules/maintenance-logs/componentes/maintenance-logs-header';
import { maintenanceLogsTableColumns } from '@/modules/maintenance-logs/data/data-table-settings';
import { targetMaintenanceLogsSearchSchema } from '@/modules/maintenance-logs/schemas';

export const Route = createFileRoute('/app/targets/$targetId/maintenance-logs')(
  {
    validateSearch: targetMaintenanceLogsSearchSchema,
    loaderDeps: ({ search }): TargetMaintenanceLogsSearchParams => search,
    loader: ({ context: { queryClient }, params: { targetId }, deps }) =>
      queryClient.ensureQueryData(
        targetMaintenanceLogsQueryOptions(Number(targetId), deps),
      ),
    head: createRouteHead({
      type: 'index',
      titleI18nKey: 'maintenanceLogs:name',
    }),
    component: RouteComponent,
  },
);

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    targetMaintenanceLogsQueryOptions(Number(params.targetId), search),
  );

  return (
    <div className="contents">
      <MaintenanceLogsHeader asSubtitle />
      <DataView
        preferencesNamespace="targets.maintenanceLogs"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={maintenanceLogsTableColumns}
        dataTableDefaultVisibleColumns={{ targetId: false }}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
