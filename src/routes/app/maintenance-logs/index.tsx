import type { MaintenanceLogsSearchParams } from '@/modules/maintenance-logs/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { maintenanceLogsQueryOptions } from '@/modules/maintenance-logs/api/query-options';
import { MaintenanceLogsHeader } from '@/modules/maintenance-logs/componentes/maintenance-logs-header';
import { maintenanceLogsTableColumns } from '@/modules/maintenance-logs/data/data-table-settings';
import { maintenanceLogsSearchSchema } from '@/modules/maintenance-logs/schemas';

export const Route = createFileRoute('/app/maintenance-logs/')({
  validateSearch: maintenanceLogsSearchSchema,
  loaderDeps: ({ search }): MaintenanceLogsSearchParams => search,
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(maintenanceLogsQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'maintenanceLogs:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(maintenanceLogsQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <MaintenanceLogsHeader />
      <DataView
        preferencesNamespace="maintenanceLogs"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={maintenanceLogsTableColumns}
        dataFiltersSlot={<DataSearch />}
      />
    </div>
  );
}
