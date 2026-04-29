// modules/dummies/components/create-dummy-dialog.tsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { onMutationError, onMutationSuccess } from '@/core/lib/mutation-toast';
import { createDummyMutationOptions } from '@/modules/dummies/api/query-options';
import { DummyForm } from '@/modules/dummies/componentes/forms/dummy-form';

export function CreateDummyDialogTrigger({ children }: CreateDummyDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...createDummyMutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dummies'] });
      onOpenChange(false);
      onMutationSuccess(t, 'dialogs.wasCreated')();
    },
    onError: onMutationError(t),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('dummies:actions.addNew')}</DialogTitle>
        </DialogHeader>
        <DummyForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateDummyDialogProps = {
  children: React.ReactNode;
};
