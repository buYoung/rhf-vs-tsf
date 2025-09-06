import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip, Box } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface TSFSelectProps {
  form: any;
  name: string;
  label: string;
  options: Option[] | string[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function TSFSelect({ 
  form,
  name, 
  label, 
  options,
  multiple = false,
  disabled = false,
}: TSFSelectProps) {
  const normalizedOptions: Option[] = options.map(option => 
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <FormControl fullWidth size="small" error={field.state.meta.errors.length > 0} disabled={disabled}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={field.state.value ?? (multiple ? [] : '')}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
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
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
