import { TextField } from '@mui/material';

interface TSFTextFieldProps {
  form: any;
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}

export default function TSFTextField({ 
  form,
  name, 
  label, 
  type = 'text', 
  multiline = false,
  rows = 1,
  placeholder,
  disabled = false
}: TSFTextFieldProps) {
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <TextField
          value={field.state.value ?? ''}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          label={label}
          type={type}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          placeholder={placeholder}
          disabled={disabled}
          error={field.state.meta.errors.length > 0}
          helperText={field.state.meta.errors.join(', ')}
          fullWidth
          size="small"
          variant="outlined"
        />
      )}
    />
  );
}
