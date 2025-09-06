import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { nestedRootSchema } from '../shared/schema';
import type { NestedFormValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs } from '../shared/ui';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;
const genders = ['male', 'female', 'other'] as const;
const contactMethods = ['email', 'phone', 'sms'] as const;

export interface NestedTSFTopManagedProps {
    defaultValues: NestedFormValues;
    onReady?: (api: { submit: () => Promise<NestedFormValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedTSFTopManaged({ defaultValues, onReady }: NestedTSFTopManagedProps) {
    const form = useForm<NestedFormValues>({ defaultValues, onSubmit: async ({ value }) => value });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                const values = form.state.values as NestedFormValues;
                const parsed = nestedRootSchema.safeParse(values);
                if (!parsed.success) {
                    for (const issue of parsed.error.issues) {
                        const path = issue.path.join('.');
                        form.setFieldMeta(path as any, (prev: any) => ({ ...prev, errors: [issue.message] }));
                    }
                    return null;
                }
                return parsed.data;
            },
            validate: async () => {
                const values = form.state.values as NestedFormValues;
                const parsed = nestedRootSchema.safeParse(values);
                const fields = [
                    'sectionA.firstName',
                    'sectionA.lastName',
                    'sectionA.username',
                    'sectionA.email',
                    'sectionA.phone',
                    'sectionA.password',
                    'sectionA.confirmPassword',
                    'sectionA.birthDate',
                    'sectionA.gender',
                    'sectionA.contactMethod',
                    'sectionA.website',
                    'sectionA.country',
                    'sectionA.city',
                    'sectionB.companyName',
                    'sectionB.jobTitle',
                    'sectionB.department',
                    'sectionB.startDate',
                    'sectionB.salary',
                    'sectionB.workEmail',
                    'sectionB.workPhone',
                    'sectionB.officeLocation',
                    'sectionB.remote',
                    'sectionB.address.street',
                    'sectionB.address.state',
                    'sectionB.address.postalCode',
                    'sectionB.address.country',
                    'sectionB.website',
                    'sectionB.teamSize',
                ] as const;
                const errorsByField = new Map<string, string>();
                if (!parsed.success) {
                    for (const issue of parsed.error.issues) {
                        const path = issue.path.join('.');
                        if (fields.includes(path as any)) {
                            errorsByField.set(path, issue.message);
                        }
                    }
                }
                for (const f of fields) {
                    const msg = errorsByField.get(f);
                    form.setFieldMeta(f as any, (prev: any) => ({ ...prev, errors: msg ? [msg] : [] }));
                }
                return errorsByField.size === 0;
            },
        });
    }, [form, onReady]);

    return (
        <FormGroup sx={{ gap: 2 }}>
            {/* Section A */}
            <form.Field name="sectionA.firstName">
                {(f: any) => (
                    <TextField
                        label="First Name"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionA.lastName">
                {(f: any) => (
                    <TextField
                        label="Last Name"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionA.username">
                {(f: any) => (
                    <TextField
                        label="Username"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionA.email">
                {(f: any) => (
                    <TextField
                        label="Email"
                        type="email"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionA.phone">
                {(f: any) => (
                    <TextField
                        label="Phone"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionA.password">
                {(f: any) => (
                    <TextField
                        label="Password"
                        type="password"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionA.confirmPassword">
                {(f: any) => (
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="sectionA.birthDate">
                {(f: any) => (
                    <div>
                        <DatePicker
                            label="Birth Date"
                            value={isoToDayjs(f.state.value)}
                            onChange={(v) => f.handleChange(dayjsToIso(v))}
                        />
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </div>
                )}
            </form.Field>

            <form.Field name="sectionA.gender">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="gender-label-top">Gender</InputLabel>
                        <Select
                            labelId="gender-label-top"
                            label="Gender"
                            value={f.state.value ?? ''}
                            onChange={(e) => f.handleChange(e.target.value)}
                        >
                            {genders.map((g) => (
                                <MenuItem key={g} value={g}>
                                    {g}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="sectionA.contactMethod">
                {(f: any) => (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Contact Method</FormLabel>
                        <RadioGroup row value={f.state.value} onChange={(e) => f.handleChange(e.target.value)}>
                            {contactMethods.map((m) => (
                                <FormControlLabel key={m} value={m} control={<Radio />} label={m} />
                            ))}
                        </RadioGroup>
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="sectionA.website">
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

            <form.Field name="sectionA.country">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="country-a-label-top">Country</InputLabel>
                        <Select
                            labelId="country-a-label-top"
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

            <form.Field name="sectionA.city">
                {(f: any) => (
                    <TextField
                        label="City"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            {/* Section B */}
            <form.Field name="sectionB.companyName">
                {(f: any) => (
                    <TextField
                        label="Company Name"
                        value={f.state.value ?? ''}
                        onChange={(e) => f.handleChange(e.target.value)}
                        error={!!f.state.meta.errors?.length}
                        helperText={f.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>
            <form.Field name="sectionB.jobTitle">
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
            <form.Field name="sectionB.department">
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

            <form.Field name="sectionB.startDate">
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

            <form.Field name="sectionB.salary">
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

            <form.Field name="sectionB.workEmail">
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
            <form.Field name="sectionB.workPhone">
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

            <form.Field name="sectionB.officeLocation">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="office-label-top">Office Location</InputLabel>
                        <Select
                            labelId="office-label-top"
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

            <form.Field name="sectionB.remote">
                {(f: any) => (
                    <FormControlLabel
                        control={<Checkbox checked={!!f.state.value} onChange={(_, c) => f.handleChange(c)} />}
                        label="Remote"
                    />
                )}
            </form.Field>

            <form.Field name="sectionB.address.street">
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
            <form.Field name="sectionB.address.state">
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
            <form.Field name="sectionB.address.postalCode">
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

            <form.Field name="sectionB.address.country">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="addr-country-label-top">Country</InputLabel>
                        <Select
                            labelId="addr-country-label-top"
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

            <form.Field name="sectionB.website">
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
            <form.Field name="sectionB.teamSize">
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
