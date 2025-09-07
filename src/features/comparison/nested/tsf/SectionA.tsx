import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography } from '@mui/material';
import { makeSectionADefaults } from '../../../shared/mocks/makeNestedDefaults';
import { countries, genders } from '../../../shared/mocks/options';
import { sectionASchema } from '../../../shared/schema/nestedSchema';
import { sectionAFieldValidators } from '../../../shared/validation/fieldValidators';
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
      validatorAdapter: zodValidator(),
      validators: {
        onBlur: sectionASchema,
        onSubmit: sectionASchema,
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
              <TSFTextField form={form} name="firstName" label="First Name" validators={sectionAFieldValidators.firstName} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="lastName" label="Last Name" validators={sectionAFieldValidators.lastName} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="username" label="Username" validators={sectionAFieldValidators.username} onChangeAsyncDebounceMs={500} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="email" label="Email" type="email" validators={sectionAFieldValidators.email} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="password" label="Password" type="password" validators={sectionAFieldValidators.password} />
            </Grid>
            <Grid size={6}>
              <TSFNumberField form={form} name="age" label="Age" min={18} max={120} validators={sectionAFieldValidators.age} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFDatePicker form={form} name="birthDate" label="Birth Date" />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="phoneNumber" label="Phone Number" validators={sectionAFieldValidators.phoneNumber} />
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
              <TSFTextField form={form} name="city" label="City" validators={sectionAFieldValidators.city} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={8}>
              <TSFTextField form={form} name="addressLine1" label="Address" validators={sectionAFieldValidators.addressLine1} />
            </Grid>
            <Grid size={4}>
              <TSFTextField form={form} name="zipCode" label="Zip Code" validators={sectionAFieldValidators.zipCode} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="website" label="Website" validators={sectionAFieldValidators.website} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="bio" label="Bio" multiline rows={2} validators={sectionAFieldValidators.bio} />
            </Grid>
          </FieldRow>
        </form>
      </Paper>
    );
  }
);

TSFSectionA.displayName = 'TSFSectionA';

export default TSFSectionA;
