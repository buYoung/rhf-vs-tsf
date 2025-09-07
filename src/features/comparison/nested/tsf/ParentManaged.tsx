import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { makeNestedDefaults } from '../../../shared/mocks/makeNestedDefaults';
import { countries, genders, departments, roles, employmentTypes, skills } from '../../../shared/mocks/options';
import { nestedSchema } from '../../../shared/schema/nestedSchema';
import { nestedFieldValidators } from '../../../shared/validation/fieldValidators';
import type { NestedFormValues } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import TSF field components
import TSFTextField from '../../simple/tsf/fields/TSFTextField';
import TSFNumberField from '../../simple/tsf/fields/TSFNumberField';
import TSFDatePicker from '../../simple/tsf/fields/TSFDatePicker';
import TSFSelect from '../../simple/tsf/fields/TSFSelect';
import TSFCheckbox from '../../simple/tsf/fields/TSFCheckbox';
import TSFRadioGroup from '../../simple/tsf/fields/TSFRadioGroup';

interface TSFNestedParentManagedProps {
  onSubmit?: (data: NestedFormValues) => void;
  onValidate?: () => void;
  onReset?: () => void;
}

export default function TSFNestedParentManaged({ 
  onSubmit, 
  onValidate,
  onReset 
}: TSFNestedParentManagedProps) {
  const form = useForm({
    defaultValues: makeNestedDefaults(),
    onSubmit: async ({ value }) => {
      onSubmit?.(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onBlur: nestedSchema,
      onSubmit: nestedSchema,
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
        TanStack Form - Nested (Parent Managed)
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Parent manages all form state centrally • 30 Fields
      </Typography>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Section A - Personal Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Section A - Personal Information
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            TanStack Form • 15 Fields
          </Typography>
          
          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
            <SectionHeader title="Basic Information" />
            
            <FieldRow>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.firstName" label="First Name" validators={nestedFieldValidators.sectionA.firstName} />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.lastName" label="Last Name" validators={nestedFieldValidators.sectionA.lastName} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.username" label="Username" validators={nestedFieldValidators.sectionA.username} onChangeAsyncDebounceMs={500} />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.email" label="Email" type="email" validators={nestedFieldValidators.sectionA.email} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.password" label="Password" type="password" validators={nestedFieldValidators.sectionA.password} />
              </Grid>
              <Grid size={6}>
                <TSFNumberField form={form} name="sectionA.age" label="Age" min={18} max={120} validators={nestedFieldValidators.sectionA.age} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFDatePicker form={form} name="sectionA.birthDate" label="Birth Date" />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.phoneNumber" label="Phone Number" validators={nestedFieldValidators.sectionA.phoneNumber} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={12}>
                <TSFRadioGroup 
                  form={form}
                  name="sectionA.gender" 
                  label="Gender" 
                  options={genders as any}
                  row
                />
              </Grid>
            </FieldRow>

            <SectionHeader title="Address Information" />
            
            <FieldRow>
              <Grid size={6}>
                <TSFSelect form={form} name="sectionA.country" label="Country" options={countries} />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.city" label="City" validators={nestedFieldValidators.sectionA.city} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={8}>
                <TSFTextField form={form} name="sectionA.addressLine1" label="Address" validators={nestedFieldValidators.sectionA.addressLine1} />
              </Grid>
              <Grid size={4}>
                <TSFTextField form={form} name="sectionA.zipCode" label="Zip Code" validators={nestedFieldValidators.sectionA.zipCode} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.website" label="Website" validators={nestedFieldValidators.sectionA.website} />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionA.bio" label="Bio" multiline rows={2} validators={nestedFieldValidators.sectionA.bio} />
              </Grid>
            </FieldRow>
          </Box>
        </Box>

        {/* Section B - Professional Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Section B - Professional Information
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            TanStack Form • 15 Fields
          </Typography>
          
          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
            <SectionHeader title="Employment Details" />
            
            <FieldRow>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionB.jobTitle" label="Job Title" validators={nestedFieldValidators.sectionB.jobTitle} />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionB.company" label="Company" validators={nestedFieldValidators.sectionB.company} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFSelect form={form} name="sectionB.department" label="Department" options={departments as any} />
              </Grid>
              <Grid size={6}>
                <TSFSelect form={form} name="sectionB.role" label="Role" options={roles as any} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFSelect form={form} name="sectionB.employmentType" label="Employment Type" options={employmentTypes as any} />
              </Grid>
              <Grid size={6}>
                <TSFNumberField form={form} name="sectionB.yearsOfExperience" label="Years of Experience" min={0} max={50} validators={nestedFieldValidators.sectionB.yearsOfExperience} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFDatePicker form={form} name="sectionB.startDate" label="Start Date" />
              </Grid>
              <Grid size={6}>
                <TSFNumberField form={form} name="sectionB.salary" label="Expected Salary" min={0} validators={nestedFieldValidators.sectionB.salary} />
              </Grid>
            </FieldRow>

            <SectionHeader title="Skills & Preferences" />
            
            <FieldRow>
              <Grid size={6}>
                <TSFSelect form={form} name="sectionB.skills" label="Skills" options={skills as any} multiple />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionB.linkedinProfile" label="LinkedIn Profile" validators={nestedFieldValidators.sectionB.linkedinProfile} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionB.managerName" label="Manager Name" validators={nestedFieldValidators.sectionB.managerName} />
              </Grid>
              <Grid size={6}>
                <TSFTextField form={form} name="sectionB.workLocation" label="Work Location" validators={nestedFieldValidators.sectionB.workLocation} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={4}>
                <TSFCheckbox form={form} name="sectionB.remote" label="Remote Work Available" />
              </Grid>
              <Grid size={4}>
                <TSFCheckbox form={form} name="sectionB.flexible" label="Flexible Hours" />
              </Grid>
              <Grid size={4}>
                <TSFCheckbox form={form} name="sectionB.benefits" label="Benefits Package" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={12}>
                <TSFTextField form={form} name="sectionB.notes" label="Additional Notes" multiline rows={3} validators={nestedFieldValidators.sectionB.notes} />
              </Grid>
            </FieldRow>
          </Box>
        </Box>

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
