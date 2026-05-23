import type { AssignTargetsFormData } from '@/modules/sessions/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormComboboxMultiple } from '@/core/components/form-fields/form-combobox-multiple';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { assignTargetsFormSchema } from '@/modules/sessions/schemas';
import { targetsLookupQueryOptions } from '@/modules/targets/api/query-options';
import { TargetStatus } from '@/modules/targets/constants';

export function AssignSessionTargetsForm({
  branchId,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: SessionFormProps) {
  const { t } = useTranslation();
  const { data: targets, isSuccess: targetsSuccess } = useQuery(
    targetsLookupQueryOptions({ branchId, status: TargetStatus.ACTIVE }),
  );

  const form = useForm({
    resolver: zodResolver(assignTargetsFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const targetsOptions = targetsSuccess
    ? targets?.map((b) => ({
        value: b.id,
        label: b.name,
      }))
    : [];

  return (
    <form id="session-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormComboboxMultiple
          control={form.control}
          name="targetIds"
          label={t('sessions:fields.targets')}
          placeholder={t('sessions:forms.placeholders.targets')}
          options={targetsOptions}
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
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isDirty}
          >
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('sessions:actions.assignTargets')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type SessionFormProps = {
  /* Necessary for branch scoped Targets */
  branchId: number;
  defaultValues: AssignTargetsFormData;
  onSubmit: (data: AssignTargetsFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
