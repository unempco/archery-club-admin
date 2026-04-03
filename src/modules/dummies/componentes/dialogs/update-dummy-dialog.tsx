// modules/dummies/components/update-dummy-dialog.tsx
import type { Dummy } from '@/modules/dummies/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { onMutationError, onMutationSuccess } from '@/core/lib/mutation-toast';
import { updateDummyMutationOptions } from '@/modules/dummies/api/query-options';
import { DummyForm } from '@/modules/dummies/componentes/forms/dummy-form';

export function UpdateDummyDialog({
  dummy,
  open,
  onOpenChange,
}: UpdateDummyDialogProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...updateDummyMutationOptions(dummy.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dummies'] });
      onOpenChange(false);
      onMutationSuccess(t)();
    },
    onError: onMutationError(t),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('dummies:actions.edit')}</DialogTitle>
        </DialogHeader>
        <DummyForm
          defaultValues={dummy}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateDummyDialogProps = {
  dummy: Dummy;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
