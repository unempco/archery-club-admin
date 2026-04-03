// modules/dummies/components/create-dummy-dialog.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { onMutationError, onMutationSuccess } from '@/core/lib/mutation-toast';
import { createDummyMutationOptions } from '@/modules/dummies/api/query-options';
import { DummyForm } from '@/modules/dummies/componentes/forms/dummy-form';

type CreateDummyDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function CreateDummyDialog({
  open,
  onOpenChange,
}: CreateDummyDialogProps) {
  const { t } = useTranslation();
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
