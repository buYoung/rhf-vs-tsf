import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Checkbox, FormControl, FormHelperText } from '@mui/material';

interface RHFCheckboxProps {
  name: string;
  label: string;
  disabled?: boolean;
}

export default function RHFCheckbox({ 
  name, 
  label, 
  disabled = false
}: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} disabled={disabled} fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value || false}
                disabled={disabled}
              />
            }
            label={label}
          />
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
