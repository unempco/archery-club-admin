import type { CreateCycleFormData } from '@/modules/cycles/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormDatePicker } from '@/core/components/form-fields/form-date-picker';
import { FormInput } from '@/core/components/form-fields/form-input';
import { FormInputNumber } from '@/core/components/form-fields/form-input-number';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { branchesLookupQueryOptions } from '@/modules/branches/api/query-options';
import { BranchStatus } from '@/modules/branches/constants';
import { createCycleFormSchema } from '@/modules/cycles/schemas';

export function CreateCycleForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: CycleFormProps) {
  const { t } = useTranslation();
  const { data: branches, isSuccess: branchesSuccess } = useQuery(
    branchesLookupQueryOptions({ status: BranchStatus.ACTIVE }),
  );

  const form = useForm({
    resolver: zodResolver(createCycleFormSchema),
    defaultValues: {
      name: '',
      startDate: new Date(),
      sessionCount: 8,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const branchesOptions = branchesSuccess
    ? branches?.map((b) => ({
        value: String(b.id),
        label: b.name,
      }))
    : [];

  return (
    <form id="cycle-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('cycles:fields.name')}
          placeholder={t('cycles:forms.placeholders.name')}
          disabled={isSubmitting}
          required
        />
        <FormSelect
          control={form.control}
          name="branchId"
          label={t('cycles:fields.branch')}
          placeholder={t('cycles:forms.placeholders.branch')}
          options={branchesOptions}
          disabled={
            isSubmitting || !branchesSuccess || !!defaultValues?.branchId
          }
          required
        />
        <FormDatePicker
          control={form.control}
          name="startDate"
          label={t('cycles:fields.startDate')}
          required
        />
        <FormInputNumber
          control={form.control}
          name="sessionCount"
          label={t('cycles:fields.sessionCount')}
          disabled={isSubmitting}
          min={0}
          step={1}
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

export type CycleFormProps = {
  defaultValues?: Partial<CreateCycleFormData>;
  onSubmit: (data: CreateCycleFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
