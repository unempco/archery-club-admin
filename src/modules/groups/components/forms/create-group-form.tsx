import type { CreateGroupFormData } from '@/modules/groups/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormInputNumber } from '@/core/components/form-fields/form-input-number';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { cyclesLookupQueryOptions } from '@/modules/cycles/api/query-options';
import { CycleStatus } from '@/modules/cycles/constants';
import { createGroupFormSchema } from '@/modules/groups/schemas';

export function CreateGroupForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: GroupFormProps) {
  const { t } = useTranslation();
  const { data: cycles, isSuccess: cyclesSuccess } = useQuery(
    cyclesLookupQueryOptions({ status: CycleStatus.ACTIVE }),
  );

  const form = useForm({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: '',
      weekday: '0',
      startTime: '14:00',
      durationMinutes: 120,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const weekdayOptions = Array.from({ length: 7 }).map((_, i) => ({
    value: String(i),
    label: t(`groups:constants.weekdays.${i}`),
  }));
  const cyclesOptions = cyclesSuccess
    ? cycles?.map((c) => ({
        value: String(c.id),
        label: c.name,
      }))
    : [];

  return (
    <form id="group-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('groups:fields.name')}
          placeholder={t('groups:forms.placeholders.name')}
          disabled={isSubmitting}
          required
        />
        <FormSelect
          control={form.control}
          name="cycleId"
          label={t('groups:fields.cycle')}
          placeholder={t('groups:forms.placeholders.cycle')}
          options={cyclesOptions}
          disabled={isSubmitting || !cyclesSuccess || !!defaultValues?.cycleId}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="weekday"
            label={t('groups:fields.weekday')}
            placeholder={t('groups:forms.placeholders.weekday')}
            options={weekdayOptions}
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="startTime"
            label={t('groups:fields.startTime')}
            type="time"
            required
          />
        </div>

        <FormInputNumber
          control={form.control}
          name="durationMinutes"
          label={t('groups:fields.duration')}
          min={0}
          max={24 * 60}
          step={15}
          unit="min"
          required
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

export type GroupFormProps = {
  defaultValues?: Partial<CreateGroupFormData>;
  onSubmit: (data: CreateGroupFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
