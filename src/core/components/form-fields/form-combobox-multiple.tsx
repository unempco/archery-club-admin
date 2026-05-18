import type { FormField, FormOption } from '@/core/types/components';
import type { FieldValues } from 'react-hook-form';

import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/core/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/core/components/ui/field';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/core/components/ui/item';

export type FormComboboxMultipleProps<T extends FieldValues> = FormField<T> & {
  options: FormOption[];
  emptyText?: string;
};

export function FormComboboxMultiple<T extends FieldValues>({
  control,
  name,
  label,
  options = [],
  placeholder,
  disabled,
  required,
  emptyText,
}: FormComboboxMultipleProps<T>) {
  const { t } = useTranslation();

  const anchor = useComboboxAnchor();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel required={required}>{label}</FieldLabel>
          <Combobox<FormOption, true>
            multiple
            items={options}
            itemToStringValue={(item) => String(item.value)}
            itemToStringLabel={(item) => item.label}
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <ComboboxChips
              ref={anchor}
              aria-disabled={disabled}
              className="w-full"
            >
              <ComboboxValue>
                {!!options.length && (
                  <>
                    {field.value.map((value: unknown) => (
                      <ComboboxChip key={String(value)}>
                        {options.find((opt) => opt.value === value)?.label}
                      </ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                      placeholder={!field.value.length ? placeholder : ''}
                    />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>
                {emptyText ?? t('core:messages.noAvailableOptions')}
              </ComboboxEmpty>
              <ComboboxList>
                {(item: FormOption) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    <Item size="xs" className="p-0">
                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">
                          {item.label}
                        </ItemTitle>
                        {!!item?.description && (
                          <ItemDescription>{item.description}</ItemDescription>
                        )}
                      </ItemContent>
                    </Item>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
