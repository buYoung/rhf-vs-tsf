import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormHelperText 
} from '@mui/material';
import type { ReactFormExtendedApi } from '@tanstack/react-form';

interface Option {
  value: string;
  label: string;
}

interface TSFRadioGroupProps {
  form: ReactFormExtendedApi<any, any>;
  name: string;
  label: string;
  options: Option[] | string[];
  disabled?: boolean;
  row?: boolean;
}

export default function TSFRadioGroup({ 
  form,
  name, 
  label, 
  options,
  disabled = false,
  row = false
}: TSFRadioGroupProps) {
  const normalizedOptions: Option[] = options.map(option => 
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <form.Field
      name={name}
      children={(field) => (
        <FormControl error={field.state.meta.errors.length > 0} disabled={disabled} fullWidth>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            row={row}
          >
            {normalizedOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio disabled={disabled} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
