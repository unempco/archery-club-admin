import type { CreateTargetFormData } from '@/modules/targets/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { branchesLookupQueryOptions } from '@/modules/branches/api/query-options';
import { BranchStatus } from '@/modules/branches/constants';
import { createTargetFormSchema } from '@/modules/targets/schemas';

export function CreateTargetForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: TargetFormProps) {
  const { t } = useTranslation();
  const { data: branches, isSuccess: branchesSuccess } = useQuery(
    branchesLookupQueryOptions({ status: BranchStatus.ACTIVE }),
  );

  const form = useForm({
    resolver: zodResolver(createTargetFormSchema),
    defaultValues: {
      name: '',
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
    <form id="target-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('targets:fields.name')}
          placeholder={t('targets:forms.placeholders.name')}
          disabled={isSubmitting}
          required
        />
        <FormSelect
          control={form.control}
          name="branchId"
          label={t('targets:fields.branch')}
          placeholder={t('targets:forms.placeholders.branch')}
          options={branchesOptions}
          disabled={
            isSubmitting || !branchesSuccess || !!defaultValues?.branchId
          }
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

export type TargetFormProps = {
  defaultValues?: Partial<CreateTargetFormData>;
  onSubmit: (data: CreateTargetFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
