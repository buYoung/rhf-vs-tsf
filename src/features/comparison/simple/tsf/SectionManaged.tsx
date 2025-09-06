import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography } from '@mui/material';
import { simpleSchema } from '../../../shared/schema/simpleSchema';
import { makeSimpleDefaults } from '../../../shared/mocks/makeSimpleDefaults';
import { countries, genders, roles } from '../../../shared/mocks/options';
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
      validatorAdapter: zodValidator(),
      validators: {
        onSubmit: simpleSchema,
      },
      onSubmit: async ({ value }) => {
        onSubmit?.(value);
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
            <Grid item xs={6}>
              <TSFTextField form={form} name="firstName" label="First Name" />
            </Grid>
            <Grid item xs={6}>
              <TSFTextField form={form} name="lastName" label="Last Name" />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFTextField form={form} name="username" label="Username" />
            </Grid>
            <Grid item xs={6}>
              <TSFTextField form={form} name="email" label="Email" type="email" />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFTextField form={form} name="password" label="Password" type="password" />
            </Grid>
            <Grid item xs={6}>
              <TSFNumberField form={form} name="age" label="Age" min={18} max={120} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFDatePicker form={form} name="birthDate" label="Birth Date" />
            </Grid>
            <Grid item xs={6}>
              <TSFTextField form={form} name="phoneNumber" label="Phone Number" />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={12}>
              <TSFRadioGroup 
                form={form}
                name="gender" 
                label="Gender" 
                options={genders}
                row
              />
            </Grid>
          </FieldRow>

          <SectionHeader title="Address Information" />
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFSelect form={form} name="country" label="Country" options={countries} />
            </Grid>
            <Grid item xs={6}>
              <TSFTextField form={form} name="city" label="City" />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={8}>
              <TSFTextField form={form} name="addressLine1" label="Address" />
            </Grid>
            <Grid item xs={4}>
              <TSFTextField form={form} name="zipCode" label="Zip Code" />
            </Grid>
          </FieldRow>

          <SectionHeader title="Professional Information" />
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFSelect form={form} name="role" label="Role" options={roles} />
            </Grid>
            <Grid item xs={6}>
              <TSFNumberField form={form} name="salary" label="Salary ($)" min={0} max={1000000} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFDatePicker form={form} name="startDate" label="Start Date" />
            </Grid>
            <Grid item xs={6}>
              <TSFTextField form={form} name="website" label="Website" />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid item xs={12}>
              <TSFTextField form={form} name="bio" label="Bio" multiline rows={3} />
            </Grid>
          </FieldRow>

          <SectionHeader title="Preferences" />
          
          <FieldRow>
            <Grid item xs={6}>
              <TSFCheckbox form={form} name="newsletter" label="Subscribe to newsletter" />
            </Grid>
            <Grid item xs={6}>
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
