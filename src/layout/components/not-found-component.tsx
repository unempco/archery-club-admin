import { ArrowLeftIcon, HouseIcon } from '@phosphor-icons/react';
import { Link, useCanGoBack, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { Card, CardContent } from '@/core/components/ui/card';
import { Typography } from '@/core/components/ui/typography';

export function NotFoundComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const finalErrorStatus = 404;
  const finalErrorStatusText = t('statusCodes:404.large');

  return (
    <Card className="animate-in slide-in-from-top-5 fade-in duration-250 ease-out">
      <CardContent className="flex flex-col items-center gap-4 py-16">
        <div className="flex flex-col items-center px-4 text-center">
          <Typography className="text-7xl sm:text-9xl">
            {finalErrorStatus}
          </Typography>
          <Typography variant="lead" as="h1">
            {finalErrorStatusText}
          </Typography>
        </div>
        <div className="flex gap-1">
          {canGoBack && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => router.history.back()}
            >
              <ArrowLeftIcon />
            </Button>
          )}
          <Link to="/app">
            <Button>
              <HouseIcon weight="bold" />
              {t('actions.backToHome')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
