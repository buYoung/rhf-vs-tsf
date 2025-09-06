import { zodResolver } from '@hookform/resolvers/zod';
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
import { forwardRef, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { simpleSchema } from '../shared/schema';
import type { SimpleFormValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs } from '../shared/ui';

export interface SimpleRHFSectionManagedProps {
    defaultValues: SimpleFormValues;
    onReady?: (api: { submit: () => Promise<SimpleFormValues | null>; validate: () => Promise<boolean> }) => void;
}

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'];
const genders = ['male', 'female', 'other'] as const;

function SimpleRHFSectionManagedInner(
    { defaultValues, onReady }: SimpleRHFSectionManagedProps,
    _ref: React.Ref<unknown>,
) {
    const methods = useForm<SimpleFormValues>({
        mode: 'onSubmit',
        resolver: zodResolver(simpleSchema),
        defaultValues,
    });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                let result: SimpleFormValues | null = null;
                await methods.handleSubmit(
                    (data) => {
                        result = data;
                    },
                    () => {
                        result = null;
                    },
                )();
                return result;
            },
            validate: async () => {
                const paths: (keyof SimpleFormValues)[] = [
                    'firstName',
                    'lastName',
                    'username',
                    'email',
                    'phone',
                    'password',
                    'confirmPassword',
                    'birthDate',
                    'age',
                    'website',
                    'street',
                    'city',
                    'state',
                    'postalCode',
                    'country',
                    'termsAccepted',
                ];
                const ok = await methods.trigger(paths as any);
                return ok;
            },
        });
    }, [methods, onReady]);

    const {
        register,
        control,
        formState: { errors },
    } = methods;

    return (
        <FormProvider {...methods}>
            <FormGroup sx={{ gap: 2 }}>
                <TextField
                    label="First Name"
                    {...register('firstName')}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    label="Last Name"
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
                <TextField
                    label="Username"
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Phone"
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
                <TextField
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />

                <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => (
                        <div>
                            <DatePicker
                                label="Birth Date"
                                value={isoToDayjs(field.value)}
                                onChange={(v) => field.onChange(dayjsToIso(v))}
                            />
                            <FieldErrorText error={errors.birthDate?.message} />
                        </div>
                    )}
                />

                <TextField
                    label="Age"
                    type="number"
                    inputProps={{ inputMode: 'numeric' }}
                    {...register('age', { valueAsNumber: true })}
                    error={!!errors.age}
                    helperText={errors.age?.message}
                />

                <TextField
                    label="Website"
                    {...register('website')}
                    error={!!errors.website}
                    helperText={errors.website?.message as string}
                />

                <TextField
                    label="Street"
                    {...register('street')}
                    error={!!errors.street}
                    helperText={errors.street?.message}
                />
                <TextField label="City" {...register('city')} error={!!errors.city} helperText={errors.city?.message} />
                <TextField
                    label="State"
                    {...register('state')}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                />
                <TextField
                    label="Postal Code"
                    {...register('postalCode')}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                />

                <FormControl fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                            <Select
                                labelId="country-label"
                                label="Country"
                                value={field.value ?? ''}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                {countries.map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {c}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    <FieldErrorText error={errors.country?.message} />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => (
                            <Select
                                labelId="gender-label"
                                label="Gender"
                                value={field.value ?? ''}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                {genders.map((g) => (
                                    <MenuItem key={g} value={g}>
                                        {g}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    <FieldErrorText error={errors.gender?.message} />
                </FormControl>

                <TextField
                    label="Job Title"
                    {...register('jobTitle')}
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                />
                <TextField
                    label="Company"
                    {...register('company')}
                    error={!!errors.company}
                    helperText={errors.company?.message}
                />

                <Controller
                    control={control}
                    name="newsletter"
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox checked={!!field.value} onChange={(_, c) => field.onChange(c)} />}
                            label="Subscribe to newsletter"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="termsAccepted"
                    render={({ field }) => (
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={!!field.value} onChange={(_, c) => field.onChange(c)} />}
                                label="I accept the terms"
                            />
                            <FieldErrorText error={errors.termsAccepted?.message} />
                        </div>
                    )}
                />
            </FormGroup>
        </FormProvider>
    );
}

const SimpleRHFSectionManaged = forwardRef(SimpleRHFSectionManagedInner);
export default SimpleRHFSectionManaged;
