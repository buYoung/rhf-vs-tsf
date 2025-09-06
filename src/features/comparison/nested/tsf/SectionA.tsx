import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { Grid, Paper, Typography } from '@mui/material';
import { makeSectionADefaults } from '../../../shared/mocks/makeNestedDefaults';
import { countries, genders } from '../../../shared/mocks/options';
import type { SectionAValues, SectionHandle } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import TSF field components
import TSFTextField from '../../simple/tsf/fields/TSFTextField';
import TSFNumberField from '../../simple/tsf/fields/TSFNumberField';
import TSFDatePicker from '../../simple/tsf/fields/TSFDatePicker';
import TSFSelect from '../../simple/tsf/fields/TSFSelect';
import TSFRadioGroup from '../../simple/tsf/fields/TSFRadioGroup';

interface TSFSectionAProps {
  onSubmit?: (data: SectionAValues) => void;
}

const TSFSectionA = forwardRef<SectionHandle<SectionAValues>, TSFSectionAProps>(
  ({ onSubmit }, ref) => {
    const form = useForm({
      defaultValues: makeSectionADefaults(),
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
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Section A - Personal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          TanStack Form • 15 Fields
        </Typography>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <SectionHeader title="Basic Information" />
          
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
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="website" label="Website" />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="bio" label="Bio" multiline rows={2} />
            </Grid>
          </FieldRow>
        </form>
      </Paper>
    );
  }
);

TSFSectionA.displayName = 'TSFSectionA';

export default TSFSectionA;
