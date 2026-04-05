import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';
import { Textarea } from '@/core/components/ui/textarea';

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  placeholder,
  rows,
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type FormTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
};
