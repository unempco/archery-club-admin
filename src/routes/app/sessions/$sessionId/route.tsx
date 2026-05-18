import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';
import { sessionQueryOptions } from '@/modules/sessions/api/query-options';
import { SessionDetails } from '@/modules/sessions/components/session-details';
import { SessionHeader } from '@/modules/sessions/components/session-header';

export const Route = createFileRoute('/app/sessions/$sessionId')({
  loader: ({ context: { queryClient }, params: { sessionId } }) =>
    queryClient.ensureQueryData(sessionQueryOptions(Number(sessionId))),
  head: createRouteHead({ type: 'item', titleAccessorKey: 'name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: session } = useSuspenseQuery(
    sessionQueryOptions(Number(params.sessionId)),
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <SessionHeader session={session} />
      <SessionDetails session={session} />
      <Outlet />
    </div>
  );
}
