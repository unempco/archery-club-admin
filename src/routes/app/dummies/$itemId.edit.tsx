import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';

import { NotFoundComponent } from '@/layout/components/not-found-component';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { dummyQueryOptions } from '@/modules/dummies/api/query-options';

export const Route = createFileRoute('/app/dummies/$itemId/edit')({
  loader: async ({ context: { queryClient }, params: { itemId } }) => {
    const data = await queryClient.ensureQueryData(
      dummyQueryOptions(Number(itemId)),
    );
    if (!data) throw notFound();

    return data;
  },
  head: createRouteHead({ type: 'item', titleAccessorKey: 'name' }),
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();
  const { data } = useSuspenseQuery(dummyQueryOptions(Number(itemId)));

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
