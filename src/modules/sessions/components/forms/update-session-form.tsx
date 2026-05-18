import type { UpdateSessionFormData } from '@/modules/sessions/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormSelect } from '@/core/components/form-fields/form-select';
import { FormTextarea } from '@/core/components/form-fields/form-text-area';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { convertCase } from '@/core/lib/utils';
import { sessionStatuses } from '@/modules/sessions/constants';
import { updateSessionFormSchema } from '@/modules/sessions/schemas';

export function UpdateSessionForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: SessionFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(updateSessionFormSchema),
    defaultValues: {
      ...defaultValues,
      status: convertCase(
        defaultValues?.status ?? sessionStatuses[0],
      ) as UpdateSessionFormData['status'],
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = sessionStatuses.map((s) => ({
    value: s,
    label: t(`sessions:constants.status.${s}`),
  }));

  return (
    <form id="session-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormSelect
          control={form.control}
          name="status"
          label={t('sessions:fields.status')}
          placeholder={t('sessions:forms.placeholders.status')}
          options={statusOptions}
          required
        />
        <FormTextarea
          control={form.control}
          name="notes"
          label={t('sessions:fields.notes')}
        />

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isDirty}
          >
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type SessionFormProps = {
  defaultValues: UpdateSessionFormData;
  onSubmit: (data: UpdateSessionFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
