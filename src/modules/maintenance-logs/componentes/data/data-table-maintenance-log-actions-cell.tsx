import type { MaintenanceLog } from '@/modules/maintenance-logs/types';
import type { CellContext } from '@tanstack/react-table';

import { MaintenanceLogActions } from '@/modules/maintenance-logs/componentes/maintenance-log-actions';

export function DataTableMaintenanceLogActionsCell({
  row,
}: DataTableMaintenanceLogActionsCellProps) {
  return <MaintenanceLogActions maintenanceLog={row.original} />;
}

export type DataTableMaintenanceLogActionsCellProps = CellContext<
  MaintenanceLog,
  unknown
>;
