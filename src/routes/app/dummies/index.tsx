import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataTable } from '@/core/components/data-table';
import { getDummiesList } from '@/modules/dummies/api';
import { dummiesTableColumns } from '@/modules/dummies/data/data-table-settings';

export const Route = createFileRoute('/app/dummies/')({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ['dummies'],
    queryFn: () => getDummiesList({ pageSize: 10 }),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      {query.data && (
        <DataTable data={query.data.items} columns={dummiesTableColumns} />
      )}
    </div>
  );
}
