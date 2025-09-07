import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography } from '@mui/material';
import { makeSimpleDefaults } from '../../../shared/mocks/makeSimpleDefaults';
import { countries, genders, roles } from '../../../shared/mocks/options';
import { simpleSchema } from '../../../shared/schema/simpleSchema';
import { simpleFieldValidators } from '../../../shared/validation/fieldValidators';
import type { SimpleFormValues, SectionHandle } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import TSF field components
import TSFTextField from './fields/TSFTextField';
import TSFNumberField from './fields/TSFNumberField';
import TSFDatePicker from './fields/TSFDatePicker';
import TSFSelect from './fields/TSFSelect';
import TSFCheckbox from './fields/TSFCheckbox';
import TSFRadioGroup from './fields/TSFRadioGroup';

interface TSFSectionManagedProps {
  onSubmit?: (data: SimpleFormValues) => void;
}

const TSFSectionManaged = forwardRef<SectionHandle<SimpleFormValues>, TSFSectionManagedProps>(
  ({ onSubmit }, ref) => {
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

    useImperativeHandle(ref, () => ({
      validate: async () => {
        await form.validateAllFields('submit');
        return form.state.isValid;
      },
      getValues: () => form.state.values,
      reset: () => form.reset()
    }));

    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          TanStack Form
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Section Managed • 20 Fields
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
              <TSFTextField form={form} name="firstName" label="First Name" validators={simpleFieldValidators.firstName} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="lastName" label="Last Name" validators={simpleFieldValidators.lastName} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="username" label="Username" validators={simpleFieldValidators.username} onChangeAsyncDebounceMs={500} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="email" label="Email" type="email" validators={simpleFieldValidators.email} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="password" label="Password" type="password" validators={simpleFieldValidators.password} />
            </Grid>
            <Grid size={6}>
              <TSFNumberField form={form} name="age" label="Age" min={18} max={120} validators={simpleFieldValidators.age} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFDatePicker form={form} name="birthDate" label="Birth Date" />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="phoneNumber" label="Phone Number" validators={simpleFieldValidators.phoneNumber} />
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
              <TSFTextField form={form} name="city" label="City" validators={simpleFieldValidators.city} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={8}>
              <TSFTextField form={form} name="addressLine1" label="Address" validators={simpleFieldValidators.addressLine1} />
            </Grid>
            <Grid size={4}>
              <TSFTextField form={form} name="zipCode" label="Zip Code" validators={simpleFieldValidators.zipCode} />
            </Grid>
          </FieldRow>

          <SectionHeader title="Professional Information" />
          
          <FieldRow>
            <Grid size={6}>
              <TSFSelect form={form} name="role" label="Role" options={roles} />
            </Grid>
            <Grid size={6}>
              <TSFNumberField form={form} name="salary" label="Salary ($)" min={0} max={1000000} validators={simpleFieldValidators.salary} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFDatePicker form={form} name="startDate" label="Start Date" />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="website" label="Website" validators={simpleFieldValidators.website} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={12}>
              <TSFTextField form={form} name="bio" label="Bio" multiline rows={3} validators={simpleFieldValidators.bio} />
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
        </form>
      </Paper>
    );
  }
);

TSFSectionManaged.displayName = 'TSFSectionManaged';

export default TSFSectionManaged;
