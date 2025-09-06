import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography } from '@mui/material';
import { sectionASchema } from '../../../shared/schema/nestedSchema';
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
              <form.Field name="firstName" validators={{ onChange: sectionASchema.shape.firstName }}>
                {(field) => <TSFTextField field={field} label="First Name" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="lastName" validators={{ onChange: sectionASchema.shape.lastName }}>
                {(field) => <TSFTextField field={field} label="Last Name" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="username" validators={{ onChange: sectionASchema.shape.username }}>
                {(field) => <TSFTextField field={field} label="Username" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="email" validators={{ onChange: sectionASchema.shape.email }}>
                {(field) => <TSFTextField field={field} label="Email" type="email" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="password" validators={{ onChange: sectionASchema.shape.password }}>
                {(field) => <TSFTextField field={field} label="Password" type="password" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="age" validators={{ onChange: sectionASchema.shape.age }}>
                {(field) => <TSFNumberField field={field} label="Age" min={18} max={120} />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="birthDate" validators={{ onChange: sectionASchema.shape.birthDate }}>
                {(field) => <TSFDatePicker field={field} label="Birth Date" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="phoneNumber" validators={{ onChange: sectionASchema.shape.phoneNumber }}>
                {(field) => <TSFTextField field={field} label="Phone Number" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={12}>
              <form.Field name="gender" validators={{ onChange: sectionASchema.shape.gender }}>
                {(field) => (
                  <TSFRadioGroup 
                    field={field}
                    label="Gender" 
                    options={genders}
                    row
                  />
                )}
              </form.Field>
            </Grid>
          </FieldRow>

          <SectionHeader title="Address Information" />
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="country" validators={{ onChange: sectionASchema.shape.country }}>
                {(field) => <TSFSelect field={field} label="Country" options={countries} />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="city" validators={{ onChange: sectionASchema.shape.city }}>
                {(field) => <TSFTextField field={field} label="City" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={8}>
              <form.Field name="addressLine1" validators={{ onChange: sectionASchema.shape.addressLine1 }}>
                {(field) => <TSFTextField field={field} label="Address" />}
              </form.Field>
            </Grid>
            <Grid size={4}>
              <form.Field name="zipCode" validators={{ onChange: sectionASchema.shape.zipCode }}>
                {(field) => <TSFTextField field={field} label="Zip Code" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="website" validators={{ onChange: sectionASchema.shape.website }}>
                {(field) => <TSFTextField field={field} label="Website" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="bio" validators={{ onChange: sectionASchema.shape.bio }}>
                {(field) => <TSFTextField field={field} label="Bio" multiline rows={2} />}
              </form.Field>
            </Grid>
          </FieldRow>
        </form>
      </Paper>
    );
  }
);

TSFSectionA.displayName = 'TSFSectionA';

export default TSFSectionA;
