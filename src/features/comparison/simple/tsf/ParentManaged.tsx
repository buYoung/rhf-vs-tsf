import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { makeSimpleDefaults } from '../../../shared/mocks/makeSimpleDefaults';
import { countries, genders, roles } from '../../../shared/mocks/options';
import { simpleSchema } from '../../../shared/schema/simpleSchema';
import type { SimpleFormValues } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import TSF field components
import TSFTextField from './fields/TSFTextField';
import TSFNumberField from './fields/TSFNumberField';
import TSFDatePicker from './fields/TSFDatePicker';
import TSFSelect from './fields/TSFSelect';
import TSFCheckbox from './fields/TSFCheckbox';
import TSFRadioGroup from './fields/TSFRadioGroup';

interface TSFParentManagedProps {
  onSubmit?: (data: SimpleFormValues) => void;
  onValidate?: () => void;
  onReset?: () => void;
}

export default function TSFParentManaged({ 
  onSubmit, 
  onValidate,
  onReset 
}: TSFParentManagedProps) {
  const form = useForm({
    defaultValues: makeSimpleDefaults(),
    onSubmit: async ({ value }) => {
      onSubmit?.(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onBlur: simpleSchema,
      onSubmit: simpleSchema,
    },
  });

  const handleValidate = async () => {
    await form.validateAllFields('submit');
    onValidate?.();
  };

  const handleReset = () => {
    form.reset();
    onReset?.();
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        TanStack Form
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Parent Managed • 20 Fields
      </Typography>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <SectionHeader title="Personal Information" />
        
        <FieldRow>
          <Grid size={6}>
            <TSFTextField form={form} name="firstName" label="First Name" />
          </Grid>
          <Grid size={6}>
            <TSFTextField form={form} name="lastName" label="Last Name" />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={6}>
            <TSFTextField form={form} name="username" label="Username" />
          </Grid>
          <Grid size={6}>
            <TSFTextField form={form} name="email" label="Email" type="email" />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={6}>
            <TSFTextField form={form} name="password" label="Password" type="password" />
          </Grid>
          <Grid size={6}>
            <TSFNumberField form={form} name="age" label="Age" min={18} max={120} />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={6}>
            <TSFDatePicker form={form} name="birthDate" label="Birth Date" />
          </Grid>
          <Grid size={6}>
            <TSFTextField form={form} name="phoneNumber" label="Phone Number" />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={12}>
            <TSFRadioGroup 
              form={form}
              name="gender" 
              label="Gender" 
              options={genders as any}
              row
            />
          </Grid>
        </FieldRow>

        <SectionHeader title="Address Information" />
        
        <FieldRow>
          <Grid size={6}>
            <TSFSelect form={form} name="country" label="Country" options={countries} />
          </Grid>
          <Grid size={6}>
            <TSFTextField form={form} name="city" label="City" />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={8}>
            <TSFTextField form={form} name="addressLine1" label="Address" />
          </Grid>
          <Grid size={4}>
            <TSFTextField form={form} name="zipCode" label="Zip Code" />
          </Grid>
        </FieldRow>

        <SectionHeader title="Professional Information" />
        
        <FieldRow>
          <Grid size={6}>
            <TSFSelect form={form} name="role" label="Role" options={roles} />
          </Grid>
          <Grid size={6}>
            <TSFNumberField form={form} name="salary" label="Salary ($)" min={0} max={1000000} />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={6}>
            <TSFDatePicker form={form} name="startDate" label="Start Date" />
          </Grid>
          <Grid size={6}>
            <TSFTextField form={form} name="website" label="Website" />
          </Grid>
        </FieldRow>
        
        <FieldRow>
          <Grid size={12}>
            <TSFTextField form={form} name="bio" label="Bio" multiline rows={3} />
          </Grid>
        </FieldRow>

        <SectionHeader title="Preferences" />
        
        <FieldRow>
          <Grid size={6}>
            <TSFCheckbox form={form} name="newsletter" label="Subscribe to newsletter" />
          </Grid>
          <Grid size={6}>
            <TSFCheckbox form={form} name="acceptTerms" label="Accept terms and conditions" />
          </Grid>
        </FieldRow>

        {/* Control buttons integrated into parent managed form */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={handleValidate}>
            Validate
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="text" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
