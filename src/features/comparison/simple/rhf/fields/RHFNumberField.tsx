import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface RHFNumberFieldProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
}

export default function RHFNumberField({ 
  name, 
  label, 
  min,
  max,
  step = 1,
  placeholder,
  disabled = false
}: RHFNumberFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          size="small"
          variant="outlined"
          inputProps={{
            min,
            max,
            step
          }}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === '' ? '' : Number(value));
          }}
        />
      )}
    />
  );
}
