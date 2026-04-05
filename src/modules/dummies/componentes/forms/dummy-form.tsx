import type { DummyFormData } from '@/modules/dummies/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { FormSwitch } from '@/core/components/form-fields/form-switch';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { ItemStatus } from '@/core/constants/misc';
import { dummyFormSchema } from '@/modules/dummies/schemas';

export function DummyForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: DummyFormProps) {
  const { t } = useTranslation();

  const form = useForm<DummyFormData>({
    resolver: zodResolver(dummyFormSchema),
    defaultValues: {
      key: '',
      name: '',
      count: 0,
      description: '',
      status: ItemStatus.PENDING,
      email: '',
      website: '',
      image: '',
      special: false,
      price: 0,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = Object.values(ItemStatus).map((s) => ({
    value: s,
    label: t(`constants.status.${s}`),
  }));

  return (
    <form id="dummy-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="name"
            label={t('dummies:attribs.name')}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="key"
            label={t('dummies:attribs.key')}
            disabled={isSubmitting}
          />
        </div>

        <FormInput
          control={form.control}
          name="description"
          label={t('dummies:attribs.description')}
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="status"
            label={t('dummies:attribs.status')}
            options={statusOptions}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="count"
            label={t('dummies:attribs.count')}
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="email"
            label={t('dummies:attribs.email')}
            type="email"
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="price"
            label={t('dummies:attribs.price')}
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="website"
            label={t('dummies:attribs.website')}
            type="url"
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="image"
            label={t('dummies:attribs.image')}
            type="url"
            disabled={isSubmitting}
          />
        </div>

        <FormSwitch
          control={form.control}
          name="special"
          label={t('dummies:attribs.isSpecial')}
          disabled={isSubmitting}
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

export type DummyFormProps = {
  defaultValues?: Partial<DummyFormData>; // undefined = create, populated = update
  onSubmit: (data: DummyFormData) => void;
  onCancel?: () => void; // optional — useful in modals
  isLoading?: boolean;
  submitLabel?: string; // override "Save" if needed
};
