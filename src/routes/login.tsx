import { InfoIcon } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { z } from 'zod';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { sessionQueryOptions } from '@/modules/auth/api/query-options';
import { LoginForm } from '@/modules/auth/components/forms/login-form';
import { useAuth } from '@/modules/auth/hooks/use-auth';

const fallback = '/app/dashboard' as const;

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (user) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  head: createRouteHead({
    type: 'generic',
    titleI18nKey: 'auth:actions.login',
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const auth = useAuth();
  const router = useRouter();
  const { redirect: redirectTo } = Route.useSearch();
  const navigate = Route.useNavigate();

  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: async () => {
      await router.invalidate();
      await navigate({ to: redirectTo || fallback });
    },
    onError: (error) => console.error('Login error:', error),
  });

  return (
    <main className="bg-muted h-screen w-screen flex flex-col justify-center items-center">
      <Alert className="max-w-[24rem] mb-3 bg-blue-950/50 border-blue-500 text-blue-100 animate-in fade-in duration-1000">
        <InfoIcon />
        <AlertTitle>Example credentials:</AlertTitle>
        <AlertDescription>
          <b>User:</b> admin@example.com <br />
          <b>Password:</b> adminadmin
        </AlertDescription>
      </Alert>
      <LoginForm
        className="w-full max-w-[24rem] animate-in fade-in slide-in-from-top-5 duration-500"
        onSubmit={(data) => loginMutation.mutate(data)}
        isLoading={loginMutation.isPending}
      />
    </main>
  );
}
