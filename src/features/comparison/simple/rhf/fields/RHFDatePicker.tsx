import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

interface RHFDatePickerProps {
  name: string;
  label: string;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export default function RHFDatePicker({ 
  name, 
  label, 
  disabled = false,
  minDate,
  maxDate
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          label={label}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
              fullWidth: true,
              size: 'small',
              variant: 'outlined'
            }
          }}
        />
      )}
    />
  );
}
