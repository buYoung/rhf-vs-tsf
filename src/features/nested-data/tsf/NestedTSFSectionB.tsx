import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { sectionBSchema } from '../shared/schema';
import type { SectionBValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs, getErrorMessage } from '../shared/ui';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;

export interface NestedTSFSectionBProps {
    defaultValues: SectionBValues;
    onReady?: (api: { submit: () => Promise<SectionBValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedTSFSectionB({ defaultValues, onReady }: NestedTSFSectionBProps) {
    const form = useForm({
        defaultValues,
        validators: {
            onChange: sectionBSchema,
            onSubmit: sectionBSchema,
        },
        onSubmit: async ({ value }) => value,
    });

    useEffect(() => {
        onReady?.({
submit: async () => {
                await form.validateAllFields('submit');
                return form.state.isValid ? (form.state.values as SectionBValues) : null;
            },
            validate: async () => {
                await form.validateAllFields('submit');
                return form.state.isValid;
            },
        });
    }, [form, onReady]);

    return (
        <FormGroup sx={{ gap: 2 }}>
            <form.Field name="companyName">
                {(f: any) => (
                    <TextField
                        label="Company Name"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
helperText={getErrorMessage(f.state.meta.errors?.[0])}
                    />
                )}
            </form.Field>
            <form.Field name="jobTitle">
                {(f: any) => (
                    <TextField
                        label="Job Title"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="department">
                {(f: any) => (
                    <TextField
                        label="Department"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="startDate">
                {(f: any) => (
                    <div>
                        <DatePicker
                            label="Start Date"
                            value={isoToDayjs(f.state.value)}
                            onChange={(v) => f.handleChange(dayjsToIso(v))}
                        />
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </div>
                )}
            </form.Field>

            <form.Field name="salary">
                {(f: any) => (
                    <TextField
                        label="Salary"
                        type="number"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="workEmail">
                {(f: any) => (
                    <TextField
                        label="Work Email"
                        type="email"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="workPhone">
                {(f: any) => (
                    <TextField
                        label="Work Phone"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="officeLocation">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="office-label">Office Location</InputLabel>
                        <Select
                            labelId="office-label"
                            label="Office Location"
                            value={f.state.value ?? ''}
                            onChange={(e) => f.handleChange(e.target.value)}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="remote">
                {(f: any) => (
                    <FormControlLabel
                        control={<Checkbox checked={!!f.state.value} onChange={(_, c) => f.handleChange(c)} />}
                        label="Remote"
                    />
                )}
            </form.Field>

            <form.Field name="address.street">
                {(f: any) => (
                    <TextField
                        label="Street"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="address.state">
                {(f: any) => (
                    <TextField
                        label="State"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="address.postalCode">
                {(f: any) => (
                    <TextField
                        label="Postal Code"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="address.country">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="address-country-label">Country</InputLabel>
                        <Select
                            labelId="address-country-label"
                            label="Country"
                            value={f.state.value ?? ''}
                            onChange={(e) => f.handleChange(e.target.value)}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="website">
                {(f: any) => (
                    <TextField
                        label="Website"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="teamSize">
                {(f: any) => (
                    <TextField
                        label="Team Size"
                        type="number"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
        </FormGroup>
    );
}
