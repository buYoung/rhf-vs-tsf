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
import { simpleSchema, simpleSchemaOnChange } from '../shared/schema';
import type { SimpleFormValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs, getErrorMessage } from '../shared/ui';

export interface SimpleTSFTopManagedProps {
    defaultValues: SimpleFormValues;
    onReady?: (api: { submit: () => Promise<SimpleFormValues | null>; validate: () => Promise<boolean> }) => void;
}

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'];
const genders = ['male', 'female', 'other'] as const;

export default function SimpleTSFTopManaged({ defaultValues, onReady }: SimpleTSFTopManagedProps) {
    const form = useForm({
        defaultValues,
        validators: {
            onChange: simpleSchemaOnChange,
            onSubmit: simpleSchema,
        },
        onSubmit: async ({ value }) => value,
    });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                await form.validateAllFields('submit');
                return form.state.isValid ? (form.state.values as SimpleFormValues) : null;
            },
            validate: async () => {
                await form.validateAllFields('submit');
                return form.state.isValid;
            },
        });
    }, [form, onReady]);

    return (
        <FormGroup sx={{ gap: 2 }}>
            <form.Field name="firstName">
                {(field: any) => (
                    <TextField
                        label="First Name"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
helperText={getErrorMessage(field.state.meta.errors?.[0])}
                    />
                )}
            </form.Field>

            <form.Field name="lastName">
                {(field: any) => (
                    <TextField
                        label="Last Name"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="username">
                {(field: any) => (
                    <TextField
                        label="Username"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="email">
                {(field: any) => (
                    <TextField
                        label="Email"
                        type="email"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="phone">
                {(field: any) => (
                    <TextField
                        label="Phone"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="password">
                {(field: any) => (
                    <TextField
                        label="Password"
                        type="password"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="confirmPassword">
                {(field: any) => (
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="birthDate">
                {(field: any) => (
                    <div>
                        <DatePicker
                            label="Birth Date"
                            value={isoToDayjs(field.state.value)}
                            onChange={(v) => field.handleChange(dayjsToIso(v))}
                        />
                        <FieldErrorText error={field.state.meta.errors?.[0]} />
                    </div>
                )}
            </form.Field>

            <form.Field name="age">
                {(field: any) => (
                    <TextField
                        label="Age"
                        type="number"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="website">
                {(field: any) => (
                    <TextField
                        label="Website"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="street">
                {(field: any) => (
                    <TextField
                        label="Street"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="city">
                {(field: any) => (
                    <TextField
                        label="City"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="state">
                {(field: any) => (
                    <TextField
                        label="State"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="postalCode">
                {(field: any) => (
                    <TextField
                        label="Postal Code"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="country">
                {(field: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="country-label-top">Country</InputLabel>
                        <Select
                            labelId="country-label-top"
                            label="Country"
                            value={field.state.value ?? ''}
                            onChange={(e) => field.handleChange(e.target.value)}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldErrorText error={field.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="gender">
                {(field: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="gender-label-top">Gender</InputLabel>
                        <Select
                            labelId="gender-label-top"
                            label="Gender"
                            value={field.state.value ?? ''}
                            onChange={(e) => field.handleChange(e.target.value)}
                        >
                            {genders.map((g) => (
                                <MenuItem key={g} value={g}>
                                    {g}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldErrorText error={field.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="jobTitle">
                {(field: any) => (
                    <TextField
                        label="Job Title"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="company">
                {(field: any) => (
                    <TextField
                        label="Company"
                        value={field.state.value ?? ''}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!field.state.meta.errors?.length}
                        helperText={field.state.meta.errors?.[0]}
                    />
                )}
            </form.Field>

            <form.Field name="newsletter">
                {(field: any) => (
                    <FormControlLabel
                        control={<Checkbox checked={!!field.state.value} onChange={(_, c) => field.handleChange(c)} />}
                        label="Subscribe to newsletter"
                    />
                )}
            </form.Field>

            <form.Field name="termsAccepted">
                {(field: any) => (
                    <FormControl component="fieldset" variant="standard" error={!!field.state.meta.errors?.length}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!field.state.value}
                                    onChange={(_, c) => field.handleChange(c)}
                                    onBlur={field.handleBlur}
                                />
                            }
                            label="I accept the terms"
                        />
                        <FieldErrorText error={field.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>
        </FormGroup>
    );
}
