import { TextField } from '@mui/material';

interface TSFNumberFieldProps {
  form: any;
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
}

export default function TSFNumberField({ 
  form,
  name, 
  label, 
  min,
  max,
  step = 1,
  placeholder,
  disabled = false
}: TSFNumberFieldProps) {
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <TextField
          value={field.state.value ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            field.handleChange(value === '' ? '' : Number(value));
          }}
          onBlur={field.handleBlur}
          label={label}
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          error={field.state.meta.errors.length > 0}
          helperText={field.state.meta.errors.join(', ')}
          fullWidth
          size="small"
          variant="outlined"
          inputProps={{
            min,
            max,
            step
          }}
        />
      )}
    />
  );
}
