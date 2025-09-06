import { FormControlLabel, Checkbox, FormControl, FormHelperText } from '@mui/material';

interface TSFCheckboxProps {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
}

export default function TSFCheckbox({ 
  form,
  name, 
  label, 
  disabled = false
}: TSFCheckboxProps) {
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <FormControl error={field.state.meta.errors.length > 0} disabled={disabled} fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={field.state.value || false}
                onChange={(e) => field.handleChange(e.target.checked)}
                onBlur={field.handleBlur}
                disabled={disabled}
              />
            }
            label={label}
          />
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
