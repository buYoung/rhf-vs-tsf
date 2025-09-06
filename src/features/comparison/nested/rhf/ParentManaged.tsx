import { useForm, FormProvider } from 'react-hook-form';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { makeNestedDefaults } from '../../../shared/mocks/makeNestedDefaults';
import { countries, genders, departments, roles, employmentTypes, skills } from '../../../shared/mocks/options';
import type { NestedFormValues } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import RHF field components
import RHFTextField from '../../simple/rhf/fields/RHFTextField';
import RHFNumberField from '../../simple/rhf/fields/RHFNumberField';
import RHFDatePicker from '../../simple/rhf/fields/RHFDatePicker';
import RHFSelect from '../../simple/rhf/fields/RHFSelect';
import RHFCheckbox from '../../simple/rhf/fields/RHFCheckbox';
import RHFRadioGroup from '../../simple/rhf/fields/RHFRadioGroup';

interface RHFNestedParentManagedProps {
  onSubmit?: (data: NestedFormValues) => void;
  onValidate?: () => void;
  onReset?: () => void;
}

export default function RHFNestedParentManaged({ 
  onSubmit, 
  onValidate,
  onReset 
}: RHFNestedParentManagedProps) {
  const methods = useForm<NestedFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: makeNestedDefaults()
  });

  const handleFormSubmit = (data: NestedFormValues) => {
    onSubmit?.(data);
  };

  const handleValidate = async () => {
    await methods.trigger();
    onValidate?.();
  };

  const handleReset = () => {
    methods.reset(makeNestedDefaults());
    onReset?.();
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        React Hook Form - Nested (Parent Managed)
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Parent manages all form state centrally • 30 Fields
      </Typography>
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          {/* Section A - Personal Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Section A - Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              React Hook Form • 15 Fields
            </Typography>
            
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
              <SectionHeader title="Basic Information" />
              
              <FieldRow>
                <Grid size={6}>
                  <RHFTextField name="sectionA.firstName" label="First Name" />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionA.lastName" label="Last Name" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFTextField name="sectionA.username" label="Username" />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionA.email" label="Email" type="email" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFTextField name="sectionA.password" label="Password" type="password" />
                </Grid>
                <Grid size={6}>
                  <RHFNumberField name="sectionA.age" label="Age" min={18} max={120} />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFDatePicker name="sectionA.birthDate" label="Birth Date" />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionA.phoneNumber" label="Phone Number" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={12}>
                  <RHFRadioGroup 
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
                  <RHFSelect name="sectionA.country" label="Country" options={countries} />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionA.city" label="City" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={8}>
                  <RHFTextField name="sectionA.addressLine1" label="Address" />
                </Grid>
                <Grid size={4}>
                  <RHFTextField name="sectionA.zipCode" label="Zip Code" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFTextField name="sectionA.website" label="Website" />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionA.bio" label="Bio" multiline rows={2} />
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
              React Hook Form • 15 Fields
            </Typography>
            
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
              <SectionHeader title="Employment Details" />
              
              <FieldRow>
                <Grid size={6}>
                  <RHFTextField name="sectionB.jobTitle" label="Job Title" />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionB.company" label="Company" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFSelect name="sectionB.department" label="Department" options={departments as any} />
                </Grid>
                <Grid size={6}>
                  <RHFSelect name="sectionB.role" label="Role" options={roles as any} />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFSelect name="sectionB.employmentType" label="Employment Type" options={employmentTypes as any} />
                </Grid>
                <Grid size={6}>
                  <RHFNumberField name="sectionB.yearsOfExperience" label="Years of Experience" min={0} max={50} />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFDatePicker name="sectionB.startDate" label="Start Date" />
                </Grid>
                <Grid size={6}>
                  <RHFNumberField name="sectionB.salary" label="Expected Salary" min={0} />
                </Grid>
              </FieldRow>

              <SectionHeader title="Skills & Preferences" />
              
              <FieldRow>
                <Grid size={6}>
                  <RHFSelect name="sectionB.skills" label="Skills" options={skills as any} multiple />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionB.linkedinProfile" label="LinkedIn Profile" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={6}>
                  <RHFTextField name="sectionB.managerName" label="Manager Name" />
                </Grid>
                <Grid size={6}>
                  <RHFTextField name="sectionB.workLocation" label="Work Location" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={4}>
                  <RHFCheckbox name="sectionB.remote" label="Remote Work Available" />
                </Grid>
                <Grid size={4}>
                  <RHFCheckbox name="sectionB.flexible" label="Flexible Hours" />
                </Grid>
                <Grid size={4}>
                  <RHFCheckbox name="sectionB.benefits" label="Benefits Package" />
                </Grid>
              </FieldRow>
              
              <FieldRow>
                <Grid size={12}>
                  <RHFTextField name="sectionB.notes" label="Additional Notes" multiline rows={3} />
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
      </FormProvider>
    </Paper>
  );
}
