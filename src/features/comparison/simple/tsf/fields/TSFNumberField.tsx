import { TextField, CircularProgress, InputAdornment } from '@mui/material';

interface TSFNumberFieldProps {
  form: any;
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  validators?: {
    onChange?: any;
    onBlur?: any;
    onSubmit?: any;
  };
  onChangeAsyncDebounceMs?: number;
}

export default function TSFNumberField({ 
  form,
  name, 
  label, 
  min,
  max,
  step = 1,
  placeholder,
  disabled = false,
  validators,
  onChangeAsyncDebounceMs
}: TSFNumberFieldProps) {
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
            onChange={(e) => {
              const value = e.target.value;
              field.handleChange(value === '' ? '' : Number(value));
            }}
            onBlur={field.handleBlur}
            label={label}
            type="number"
            placeholder={placeholder}
            disabled={disabled}
            error={hasError}
            helperText={hasError ? field.state.meta.errors[0] : ''}
            fullWidth
            size="small"
            variant="outlined"
            inputProps={{
              min,
              max,
              step
            }}
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
