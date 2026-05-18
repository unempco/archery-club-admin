import type { Session } from '@/modules/sessions/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { AssignSessionTargetsForm } from '@/modules/sessions/components/forms/assign-session-targets-form';
import { useSessionTargetsMutation } from '@/modules/sessions/hooks/mutations';

export function AssignSessionTargetsDialog({
  session,
  open,
  onOpenChange,
}: UpdateSessionDialogProps) {
  const { t } = useTranslation();

  const mutation = useSessionTargetsMutation({
    sessionId: session.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('sessions:dialogs.assignTargets.title')}</DialogTitle>
        </DialogHeader>
        <AssignSessionTargetsForm
          branchId={session.branchId}
          defaultValues={session}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateSessionDialogProps = {
  session: Session;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
