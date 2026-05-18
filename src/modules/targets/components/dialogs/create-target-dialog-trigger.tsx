import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateTargetForm } from '@/modules/targets/components/forms/create-target-form';
import { useCreateTargetMutation } from '@/modules/targets/hooks/mutations';

export function CreateTargetDialogTrigger({
  children,
}: CreateTargetDialogProps) {
  const { t } = useTranslation();
  const { branchId } = useParams({ strict: false });

  const [open, onOpenChange] = useState(false);

  const mutation = useCreateTargetMutation({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('targets:dialogs.create.title')}</DialogTitle>
        </DialogHeader>
        <CreateTargetForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          defaultValues={{ branchId }}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateTargetDialogProps = {
  children: React.ReactNode;
};
