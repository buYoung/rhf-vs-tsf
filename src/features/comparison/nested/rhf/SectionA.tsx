import { forwardRef, useImperativeHandle } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper, Typography } from '@mui/material';
import { sectionASchema } from '../../../shared/schema/nestedSchema';
import { makeSectionADefaults } from '../../../shared/mocks/makeNestedDefaults';
import { countries, genders } from '../../../shared/mocks/options';
import type { SectionAValues, SectionHandle } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import RHF field components
import RHFTextField from '../../simple/rhf/fields/RHFTextField';
import RHFNumberField from '../../simple/rhf/fields/RHFNumberField';
import RHFDatePicker from '../../simple/rhf/fields/RHFDatePicker';
import RHFSelect from '../../simple/rhf/fields/RHFSelect';
import RHFRadioGroup from '../../simple/rhf/fields/RHFRadioGroup';

interface RHFSectionAProps {
  onSubmit?: (data: SectionAValues) => void;
}

const RHFSectionA = forwardRef<SectionHandle<SectionAValues>, RHFSectionAProps>(
  ({ onSubmit }, ref) => {
    const methods = useForm<SectionAValues>({
      resolver: zodResolver(sectionASchema),
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: makeSectionADefaults()
    });

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const result = await methods.trigger();
        return result;
      },
      getValues: () => methods.getValues(),
      reset: () => methods.reset(makeSectionADefaults())
    }));

    const handleFormSubmit = (data: SectionAValues) => {
      onSubmit?.(data);
    };

    return (
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Section A - Personal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          React Hook Form • 15 Fields
        </Typography>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <SectionHeader title="Basic Information" />
            
            <FieldRow>
              <Grid size={6}>
                <RHFTextField name="firstName" label="First Name" />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="lastName" label="Last Name" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFTextField name="username" label="Username" />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="email" label="Email" type="email" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFTextField name="password" label="Password" type="password" />
              </Grid>
              <Grid size={6}>
                <RHFNumberField name="age" label="Age" min={18} max={120} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFDatePicker name="birthDate" label="Birth Date" />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="phoneNumber" label="Phone Number" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={12}>
                <RHFRadioGroup 
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
                <RHFSelect name="country" label="Country" options={countries} />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="city" label="City" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={8}>
                <RHFTextField name="addressLine1" label="Address" />
              </Grid>
              <Grid size={4}>
                <RHFTextField name="zipCode" label="Zip Code" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFTextField name="website" label="Website" />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="bio" label="Bio" multiline rows={2} />
              </Grid>
            </FieldRow>
          </form>
        </FormProvider>
      </Paper>
    );
  }
);

RHFSectionA.displayName = 'RHFSectionA';

export default RHFSectionA;
