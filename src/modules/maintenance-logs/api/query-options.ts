import type {
  MaintenanceLogsSearchParams,
  TargetMaintenanceLogsSearchParams,
} from '@/modules/maintenance-logs/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getMaintenanceLogsList,
  getTargetMaintenanceLogs,
} from '@/modules/maintenance-logs/api/query-fns';

export const maintenanceLogsQueryOptions = (
  params: MaintenanceLogsSearchParams,
) =>
  queryOptions({
    queryKey: ['maintenanceLogs', params],
    queryFn: () => getMaintenanceLogsList(params),
  });

//==================>By Target<====================//

export const targetMaintenanceLogsQueryOptions = (
  targetId: number,
  params: TargetMaintenanceLogsSearchParams,
) =>
  queryOptions({
    queryKey: ['maintenanceLogs', targetId, params],
    queryFn: () => getTargetMaintenanceLogs(targetId, params),
  });
