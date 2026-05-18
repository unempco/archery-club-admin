import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/sessions/$sessionId/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/sessions' });
  },
});
