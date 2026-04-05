import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';
import { Input } from '@/core/components/ui/input';

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  disabled,
  placeholder,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={
              type === 'number'
                ? (e) => field.onChange(e.target.valueAsNumber)
                : field.onChange
            }
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  placeholder?: string;
};
