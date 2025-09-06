import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

interface TSFDatePickerProps {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export default function TSFDatePicker({ 
  form,
  name, 
  label, 
  disabled = false,
  minDate,
  maxDate
}: TSFDatePickerProps) {
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <DatePicker
          value={field.state.value || null}
          onChange={(newValue) => field.handleChange(newValue)}
          onClose={() => field.handleBlur()}
          label={label}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              error: field.state.meta.errors.length > 0,
              helperText: field.state.meta.errors.join(', '),
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
