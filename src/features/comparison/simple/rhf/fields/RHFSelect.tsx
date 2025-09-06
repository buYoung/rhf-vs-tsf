import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip, Box } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface RHFSelectProps {
  name: string;
  label: string;
  options: Option[] | string[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function RHFSelect({ 
  name, 
  label, 
  options,
  multiple = false,
  disabled = false,
}: RHFSelectProps) {
  const { control } = useFormContext();
  
  const normalizedOptions: Option[] = options.map(option => 
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth size="small" error={!!fieldState.error} disabled={disabled}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            multiple={multiple}
            renderValue={multiple ? (selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => {
                  const option = normalizedOptions.find(opt => opt.value === value);
                  return (
                    <Chip key={value} label={option?.label || value} size="small" />
                  );
                })}
              </Box>
            ) : undefined}
          >
            {normalizedOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
