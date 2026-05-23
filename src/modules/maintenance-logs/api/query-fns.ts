import type {
  CreateMaintenanceLogFormData,
  MaintenanceLog,
  MaintenanceLogsSearchParams,
  TargetMaintenanceLogsSearchParams,
} from '@/modules/maintenance-logs/types';

import api from '@/core/api';
import { TARGETS_MODULE_NAME } from '@/modules/targets/api/query-fns';

export const MAINTENANCE_LOGS_MODULE_NAME = 'maintenance-logs';

export function getMaintenanceLogsList(params: MaintenanceLogsSearchParams) {
  return api.getList<MaintenanceLog>(MAINTENANCE_LOGS_MODULE_NAME, {
    query: params,
  });
}

//====================>By target<========================//

export function getTargetMaintenanceLogs(
  targetId: number,
  params: TargetMaintenanceLogsSearchParams,
) {
  return api.getList<MaintenanceLog>(
    `/${TARGETS_MODULE_NAME}/${targetId}/${MAINTENANCE_LOGS_MODULE_NAME}`,
    { query: params },
  );
}

export function createMaintenanceLog(
  maintenanceLog: CreateMaintenanceLogFormData,
) {
  return api.post<MaintenanceLog>(
    `/${TARGETS_MODULE_NAME}/${maintenanceLog.targetId}/${MAINTENANCE_LOGS_MODULE_NAME}`,
    { body: maintenanceLog },
  );
}
