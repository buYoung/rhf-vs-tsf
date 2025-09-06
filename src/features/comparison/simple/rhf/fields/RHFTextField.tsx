import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface RHFTextFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}

export default function RHFTextField({ 
  name, 
  label, 
  type = 'text', 
  multiline = false,
  rows = 1,
  placeholder,
  disabled = false
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          placeholder={placeholder}
          disabled={disabled}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          size="small"
          variant="outlined"
        />
      )}
    />
  );
}
