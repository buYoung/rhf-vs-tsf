import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Grid, Paper, Typography } from '@mui/material';
import { sectionBSchema } from '../../../shared/schema/nestedSchema';
import { makeSectionBDefaults } from '../../../shared/mocks/makeNestedDefaults';
import { roles, departments, employmentTypes, skills } from '../../../shared/mocks/options';
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
              <form.Field name="jobTitle" validators={{ onChange: sectionBSchema.shape.jobTitle }}>
                {(field) => <TSFTextField field={field} label="Job Title" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="company" validators={{ onChange: sectionBSchema.shape.company }}>
                {(field) => <TSFTextField field={field} label="Company" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="department" validators={{ onChange: sectionBSchema.shape.department }}>
                {(field) => <TSFSelect field={field} label="Department" options={departments} />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="role" validators={{ onChange: sectionBSchema.shape.role }}>
                {(field) => <TSFSelect field={field} label="Role" options={roles} />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="employmentType" validators={{ onChange: sectionBSchema.shape.employmentType }}>
                {(field) => <TSFSelect field={field} label="Employment Type" options={employmentTypes} />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="yearsOfExperience" validators={{ onChange: sectionBSchema.shape.yearsOfExperience }}>
                {(field) => <TSFNumberField field={field} label="Years of Experience" min={0} max={50} />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="startDate" validators={{ onChange: sectionBSchema.shape.startDate }}>
                {(field) => <TSFDatePicker field={field} label="Start Date" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="salary" validators={{ onChange: sectionBSchema.shape.salary }}>
                {(field) => <TSFNumberField field={field} label="Expected Salary" min={0} />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <SectionHeader title="Skills & Preferences" />
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="skills" validators={{ onChange: sectionBSchema.shape.skills }}>
                {(field) => <TSFSelect field={field} label="Skills" options={skills} multiple />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="linkedinProfile" validators={{ onChange: sectionBSchema.shape.linkedinProfile }}>
                {(field) => <TSFTextField field={field} label="LinkedIn Profile" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={6}>
              <form.Field name="managerName" validators={{ onChange: sectionBSchema.shape.managerName }}>
                {(field) => <TSFTextField field={field} label="Manager Name" />}
              </form.Field>
            </Grid>
            <Grid size={6}>
              <form.Field name="workLocation" validators={{ onChange: sectionBSchema.shape.workLocation }}>
                {(field) => <TSFTextField field={field} label="Work Location" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={4}>
              <form.Field name="remote" validators={{ onChange: sectionBSchema.shape.remote }}>
                {(field) => <TSFCheckbox field={field} label="Remote Work Available" />}
              </form.Field>
            </Grid>
            <Grid size={4}>
              <form.Field name="flexible" validators={{ onChange: sectionBSchema.shape.flexible }}>
                {(field) => <TSFCheckbox field={field} label="Flexible Hours" />}
              </form.Field>
            </Grid>
            <Grid size={4}>
              <form.Field name="benefits" validators={{ onChange: sectionBSchema.shape.benefits }}>
                {(field) => <TSFCheckbox field={field} label="Benefits Package" />}
              </form.Field>
            </Grid>
          </FieldRow>
          
          <FieldRow>
            <Grid size={12}>
              <form.Field name="notes" validators={{ onChange: sectionBSchema.shape.notes }}>
                {(field) => <TSFTextField field={field} label="Additional Notes" multiline rows={3} />}
              </form.Field>
            </Grid>
          </FieldRow>
        </form>
      </Paper>
    );
  }
);

TSFSectionB.displayName = 'TSFSectionB';

export default TSFSectionB;
