import { Controller, useFormContext } from 'react-hook-form';
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormHelperText 
} from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface RHFRadioGroupProps {
  name: string;
  label: string;
  options: Option[] | string[];
  disabled?: boolean;
  row?: boolean;
}

export default function RHFRadioGroup({ 
  name, 
  label, 
  options,
  disabled = false,
  row = false
}: RHFRadioGroupProps) {
  const { control } = useFormContext();
  
  const normalizedOptions: Option[] = options.map(option => 
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} disabled={disabled} fullWidth>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            {...field}
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
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
