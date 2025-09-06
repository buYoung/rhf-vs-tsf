import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper, Typography } from '@mui/material';
import { simpleSchema } from '../../../shared/schema/simpleSchema';
import { makeSimpleDefaults } from '../../../shared/mocks/makeSimpleDefaults';
import { countries, genders, roles } from '../../../shared/mocks/options';
import type { SimpleFormValues, SectionHandle } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import RHF field components
import RHFTextField from './fields/RHFTextField';
import RHFNumberField from './fields/RHFNumberField';
import RHFDatePicker from './fields/RHFDatePicker';
import RHFSelect from './fields/RHFSelect';
import RHFCheckbox from './fields/RHFCheckbox';
import RHFRadioGroup from './fields/RHFRadioGroup';

interface RHFSectionManagedProps {
  onSubmit?: (data: SimpleFormValues) => void;
}

const RHFSectionManaged = forwardRef<SectionHandle<SimpleFormValues>, RHFSectionManagedProps>(
  ({ onSubmit }, ref) => {
    const methods = useForm<SimpleFormValues>({
      resolver: zodResolver(simpleSchema),
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: makeSimpleDefaults()
    });

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const result = await methods.trigger();
        return result;
      },
      getValues: () => methods.getValues(),
      reset: () => methods.reset(makeSimpleDefaults())
    }));

    const handleFormSubmit = (data: SimpleFormValues) => {
      onSubmit?.(data);
    };

    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          React Hook Form
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Section Managed • 20 Fields
        </Typography>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <SectionHeader title="Personal Information" />
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFTextField name="firstName" label="First Name" />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="lastName" label="Last Name" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFTextField name="username" label="Username" />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="email" label="Email" type="email" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFTextField name="password" label="Password" type="password" />
              </Grid>
              <Grid item xs={6}>
                <RHFNumberField name="age" label="Age" min={18} max={120} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFDatePicker name="birthDate" label="Birth Date" />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="phoneNumber" label="Phone Number" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={12}>
                <RHFRadioGroup 
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
                <RHFSelect name="country" label="Country" options={countries} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="city" label="City" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={8}>
                <RHFTextField name="addressLine1" label="Address" />
              </Grid>
              <Grid item xs={4}>
                <RHFTextField name="zipCode" label="Zip Code" />
              </Grid>
            </FieldRow>

            <SectionHeader title="Professional Information" />
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFSelect name="role" label="Role" options={roles} />
              </Grid>
              <Grid item xs={6}>
                <RHFNumberField name="salary" label="Salary ($)" min={0} max={1000000} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFDatePicker name="startDate" label="Start Date" />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="website" label="Website" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid item xs={12}>
                <RHFTextField name="bio" label="Bio" multiline rows={3} />
              </Grid>
            </FieldRow>

            <SectionHeader title="Preferences" />
            
            <FieldRow>
              <Grid item xs={6}>
                <RHFCheckbox name="newsletter" label="Subscribe to newsletter" />
              </Grid>
              <Grid item xs={6}>
                <RHFCheckbox name="acceptTerms" label="Accept terms and conditions" />
              </Grid>
            </FieldRow>
          </form>
        </FormProvider>
      </Paper>
    );
  }
);

RHFSectionManaged.displayName = 'RHFSectionManaged';

export default RHFSectionManaged;
