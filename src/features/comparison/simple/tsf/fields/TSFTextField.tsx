import { TextField, CircularProgress, InputAdornment } from '@mui/material';

interface TSFTextFieldProps {
  form: any;
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  validators?: {
    onChange?: any;
    onBlur?: any;
    onSubmit?: any;
  };
  onChangeAsyncDebounceMs?: number;
}

export default function TSFTextField({ 
  form,
  name, 
  label, 
  type = 'text', 
  multiline = false,
  rows = 1,
  placeholder,
  disabled = false,
  validators,
  onChangeAsyncDebounceMs
}: TSFTextFieldProps) {
  return (
    <form.Field
      name={name}
      validators={validators}
      onChangeAsyncDebounceMs={onChangeAsyncDebounceMs}
      children={(field: any) => {
        const hasError = (field.state.meta.isTouched || form.state.isSubmitted) && field.state.meta.errors?.length > 0;
        const isValidating = field.state.meta.isValidating;
        
        return (
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
            error={hasError}
            helperText={hasError ? field.state.meta.errors[0] : ''}
            fullWidth
            size="small"
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: isValidating ? (
                  <InputAdornment position="end">
                    <CircularProgress size={16} />
                  </InputAdornment>
                ) : undefined,
                'aria-invalid': hasError,
                'aria-describedby': hasError ? `${name}-error` : undefined
              },
              formHelperText: {
                id: hasError ? `${name}-error` : undefined
              }
            }}
          />
        );
      }}
    />
  );
}
