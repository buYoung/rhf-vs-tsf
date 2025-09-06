import { forwardRef, useImperativeHandle } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper, Typography } from '@mui/material';
import { sectionBSchema } from '../../../shared/schema/nestedSchema';
import { makeSectionBDefaults } from '../../../shared/mocks/makeNestedDefaults';
import { roles, departments, employmentTypes, skills } from '../../../shared/mocks/options';
import type { SectionBValues, SectionHandle } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import RHF field components
import RHFTextField from '../../simple/rhf/fields/RHFTextField';
import RHFNumberField from '../../simple/rhf/fields/RHFNumberField';
import RHFDatePicker from '../../simple/rhf/fields/RHFDatePicker';
import RHFSelect from '../../simple/rhf/fields/RHFSelect';
import RHFCheckbox from '../../simple/rhf/fields/RHFCheckbox';

interface RHFSectionBProps {
  onSubmit?: (data: SectionBValues) => void;
}

const RHFSectionB = forwardRef<SectionHandle<SectionBValues>, RHFSectionBProps>(
  ({ onSubmit }, ref) => {
    const methods = useForm<SectionBValues>({
      resolver: zodResolver(sectionBSchema),
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: makeSectionBDefaults()
    });

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const result = await methods.trigger();
        return result;
      },
      getValues: () => methods.getValues(),
      reset: () => methods.reset(makeSectionBDefaults())
    }));

    const handleFormSubmit = (data: SectionBValues) => {
      onSubmit?.(data);
    };

    return (
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Section B - Professional Information
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          React Hook Form • 15 Fields
        </Typography>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <SectionHeader title="Employment Details" />
            
            <FieldRow>
              <Grid size={6}>
                <RHFTextField name="jobTitle" label="Job Title" />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="company" label="Company" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFSelect name="department" label="Department" options={departments} />
              </Grid>
              <Grid size={6}>
                <RHFSelect name="role" label="Role" options={roles} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFSelect name="employmentType" label="Employment Type" options={employmentTypes as any} />
              </Grid>
              <Grid size={6}>
                <RHFNumberField name="yearsOfExperience" label="Years of Experience" min={0} max={50} />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFDatePicker name="startDate" label="Start Date" />
              </Grid>
              <Grid size={6}>
                <RHFNumberField name="salary" label="Expected Salary" min={0} />
              </Grid>
            </FieldRow>
            
            <SectionHeader title="Skills & Preferences" />
            
            <FieldRow>
              <Grid size={6}>
                <RHFSelect name="skills" label="Skills" options={skills} multiple />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="linkedinProfile" label="LinkedIn Profile" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={6}>
                <RHFTextField name="managerName" label="Manager Name" />
              </Grid>
              <Grid size={6}>
                <RHFTextField name="workLocation" label="Work Location" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={4}>
                <RHFCheckbox name="remote" label="Remote Work Available" />
              </Grid>
              <Grid size={4}>
                <RHFCheckbox name="flexible" label="Flexible Hours" />
              </Grid>
              <Grid size={4}>
                <RHFCheckbox name="benefits" label="Benefits Package" />
              </Grid>
            </FieldRow>
            
            <FieldRow>
              <Grid size={12}>
                <RHFTextField name="notes" label="Additional Notes" multiline rows={3} />
              </Grid>
            </FieldRow>
          </form>
        </FormProvider>
      </Paper>
    );
  }
);

RHFSectionB.displayName = 'RHFSectionB';

export default RHFSectionB;
