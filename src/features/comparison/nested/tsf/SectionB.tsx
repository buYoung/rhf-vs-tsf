import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography } from '@mui/material';
import { makeSectionBDefaults } from '../../../shared/mocks/makeNestedDefaults';
import { roles, departments, employmentTypes, skills } from '../../../shared/mocks/options';
import { sectionBSchema } from '../../../shared/schema/nestedSchema';
import { sectionBFieldValidators } from '../../../shared/validation/fieldValidators';
import type { SectionBValues, SectionHandle } from '../../../shared/schema/types';
import SectionHeader from '../../../shared/ui/SectionHeader';
import FieldRow from '../../../shared/ui/FieldRow';

// Import TSF field components
import TSFTextField from '../../simple/tsf/fields/TSFTextField';
import TSFNumberField from '../../simple/tsf/fields/TSFNumberField';
import TSFDatePicker from '../../simple/tsf/fields/TSFDatePicker';
import TSFSelect from '../../simple/tsf/fields/TSFSelect';
import TSFCheckbox from '../../simple/tsf/fields/TSFCheckbox';

interface TSFSectionBProps {
  onSubmit?: (data: SectionBValues) => void;
}

const TSFSectionB = forwardRef<SectionHandle<SectionBValues>, TSFSectionBProps>(
  ({ onSubmit }, ref) => {
    const form = useForm({
      defaultValues: makeSectionBDefaults(),
      onSubmit: async ({ value }) => {
        onSubmit?.(value);
      },
      validatorAdapter: zodValidator(),
      validators: {
        onBlur: sectionBSchema,
        onSubmit: sectionBSchema,
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
          Section B - Professional Information
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
          <SectionHeader title="Employment Details" />
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="jobTitle" label="Job Title" validators={sectionBFieldValidators.jobTitle} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="company" label="Company" validators={sectionBFieldValidators.company} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFSelect form={form} name="department" label="Department" options={departments as any} />
            </Grid>
            <Grid size={6}>
              <TSFSelect form={form} name="role" label="Role" options={roles as any} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFSelect form={form} name="employmentType" label="Employment Type" options={employmentTypes as any} />
            </Grid>
            <Grid size={6}>
              <TSFNumberField form={form} name="yearsOfExperience" label="Years of Experience" min={0} max={50} validators={sectionBFieldValidators.yearsOfExperience} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFDatePicker form={form} name="startDate" label="Start Date" />
            </Grid>
            <Grid size={6}>
              <TSFNumberField form={form} name="salary" label="Expected Salary" min={0} validators={sectionBFieldValidators.salary} />
            </Grid>
          </FieldRow>
          
          <SectionHeader title="Skills & Preferences" />
          
          <FieldRow>
            <Grid size={6}>
              <TSFSelect form={form} name="skills" label="Skills" options={skills as any} multiple />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="linkedinProfile" label="LinkedIn Profile" validators={sectionBFieldValidators.linkedinProfile} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <TSFTextField form={form} name="managerName" label="Manager Name" validators={sectionBFieldValidators.managerName} />
            </Grid>
            <Grid size={6}>
              <TSFTextField form={form} name="workLocation" label="Work Location" validators={sectionBFieldValidators.workLocation} />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={4}>
              <TSFCheckbox form={form} name="remote" label="Remote Work Available" />
            </Grid>
            <Grid size={4}>
              <TSFCheckbox form={form} name="flexible" label="Flexible Hours" />
            </Grid>
            <Grid size={4}>
              <TSFCheckbox form={form} name="benefits" label="Benefits Package" />
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={12}>
              <TSFTextField form={form} name="notes" label="Additional Notes" multiline rows={3} validators={sectionBFieldValidators.notes} />
            </Grid>
          </FieldRow>
        </form>
      </Paper>
    );
  }
);

TSFSectionB.displayName = 'TSFSectionB';

export default TSFSectionB;
