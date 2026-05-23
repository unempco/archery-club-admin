import type { CreateMaintenanceLogFormData } from '@/modules/maintenance-logs/types';

import { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormDatePicker } from '@/core/components/form-fields/form-date-picker';
import { FormTextarea } from '@/core/components/form-fields/form-text-area';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Input } from '@/core/components/ui/input';
import { Spinner } from '@/core/components/ui/spinner';
import { mergeDateAndTime } from '@/core/lib/dates';
import { createMaintenanceLogFormSchema } from '@/modules/maintenance-logs/schemas';

export function UpdateMaintenanceLogForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: maintenanceLogFormProps) {
  const { t } = useTranslation();
  const timeInputId = useId();

  const form = useForm({
    resolver: zodResolver(createMaintenanceLogFormSchema),
    defaultValues: {
      performedAt: new Date(),
      ...defaultValues,
    },
  });

  function handleSubmit(data: CreateMaintenanceLogFormData) {
    const $timeInput = document.getElementById(timeInputId) as HTMLInputElement;
    data.performedAt = mergeDateAndTime(data.performedAt, $timeInput?.value);

    onSubmit(data);
  }

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form id="maintenance-log-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-4">
        <div className="grid grid-cols-2 items-end gap-4">
          <FormDatePicker
            control={form.control}
            name="performedAt"
            label={t('maintenanceLogs:fields.performedAt')}
            disabled={isSubmitting}
            required
          />
          <Input id={timeInputId} type="time" defaultValue="14:00" />
        </div>
        <FormTextarea
          control={form.control}
          name="notes"
          label={t('maintenanceLogs:fields.notes')}
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type maintenanceLogFormProps = {
  defaultValues?: Partial<CreateMaintenanceLogFormData>;
  onSubmit: (data: CreateMaintenanceLogFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
