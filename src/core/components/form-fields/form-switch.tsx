// core/components/ui/form-switch.tsx
import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldLabel } from '@/core/components/ui/field';
import { Switch } from '@/core/components/ui/switch';

export function FormSwitch<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
}: FormSwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field className="flex-row items-center gap-3">
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
          <FieldLabel className="mb-0">{label}</FieldLabel>
        </Field>
      )}
    />
  );
}

export type FormSwitchProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  disabled?: boolean;
};
