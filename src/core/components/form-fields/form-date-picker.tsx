import type { DateFormat } from '@/core/constants/dates';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { DatePicker } from '@/core/components/ui/date-picker';
import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';

export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  placeholder,
  dateFormat,
}: FormDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            dateFormat={dateFormat}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export type FormDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  dateFormat?: DateFormat;
};
