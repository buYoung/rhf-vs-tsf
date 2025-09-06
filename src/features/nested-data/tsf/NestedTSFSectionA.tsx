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
import { sectionASchema } from '../shared/schema';
import type { SectionAValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs } from '../shared/ui';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;
const genders = ['male', 'female', 'other'] as const;
const contactMethods = ['email', 'phone', 'sms'] as const;
const interestsPool = ['music', 'sports', 'tech', 'travel', 'art', 'movies', 'books'];

export interface NestedTSFSectionAProps {
    defaultValues: SectionAValues;
    onReady?: (api: { submit: () => Promise<SectionAValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedTSFSectionA({ defaultValues, onReady }: NestedTSFSectionAProps) {
    const form = useForm({ defaultValues, onSubmit: async ({ value }) => value });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                const values = form.state.values as SectionAValues;
                const parsed = sectionASchema.safeParse(values);
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
                const values = form.state.values as SectionAValues;
                const parsed = sectionASchema.safeParse(values);
                const fields = [
                    'firstName',
                    'lastName',
                    'username',
                    'email',
                    'phone',
                    'password',
                    'confirmPassword',
                    'birthDate',
                    'gender',
                    'contactMethod',
                    'website',
                    'interests',
                    'newsletter',
                    'country',
                    'city',
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
            <form.Field name="firstName">
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
            <form.Field name="lastName">
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
            <form.Field name="username">
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
            <form.Field name="email">
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
            <form.Field name="phone">
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
            <form.Field name="password">
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
            <form.Field name="confirmPassword">
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

            <form.Field name="birthDate">
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

            <form.Field name="gender">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
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

            <form.Field name="contactMethod">
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

            <form.Field name="country">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
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

            <form.Field name="city">
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

            <form.Field name="interests">
                {(f: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="interests-label">Interests</InputLabel>
                        <Select
                            multiple
                            labelId="interests-label"
                            label="Interests"
                            value={(f.state.value ?? []) as string[]}
                            onChange={(e) =>
                                f.handleChange(
                                    typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                                )
                            }
                        >
                            {interestsPool.map((i) => (
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldErrorText error={f.state.meta.errors?.[0]} />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="newsletter">
                {(f: any) => (
                    <FormControlLabel
                        control={<Checkbox checked={!!f.state.value} onChange={(_, c) => f.handleChange(c)} />}
                        label="Subscribe to newsletter"
                    />
                )}
            </form.Field>
        </FormGroup>
    );
}
