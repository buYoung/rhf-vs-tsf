import { zodResolver } from '@hookform/resolvers/zod';
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
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { sectionASchema } from '../shared/schema';
import type { SectionAValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs } from '../shared/ui';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;
const genders = ['male', 'female', 'other'] as const;
const contactMethods = ['email', 'phone', 'sms'] as const;
const interestsPool = ['music', 'sports', 'tech', 'travel', 'art', 'movies', 'books'];

export interface NestedRHFSectionAProps {
    defaultValues: SectionAValues;
    onReady?: (api: { submit: () => Promise<SectionAValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedRHFSectionA({ defaultValues, onReady }: NestedRHFSectionAProps) {
    const methods = useForm<SectionAValues>({
        mode: 'onSubmit',
        resolver: zodResolver(sectionASchema),
        defaultValues,
    });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                let result: SectionAValues | null = null;
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
                const paths: (keyof SectionAValues | `interests` | `contactMethod`)[] = [
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

                <FormControl component="fieldset">
                    <FormLabel component="legend">Contact Method</FormLabel>
                    <Controller
                        control={control}
                        name="contactMethod"
                        render={({ field }) => (
                            <RadioGroup row value={field.value} onChange={(e) => field.onChange(e.target.value)}>
                                {contactMethods.map((m) => (
                                    <FormControlLabel key={m} value={m} control={<Radio />} label={m} />
                                ))}
                            </RadioGroup>
                        )}
                    />
                    <FieldErrorText error={errors.contactMethod?.message} />
                </FormControl>

                <TextField
                    label="Website"
                    {...register('website')}
                    error={!!errors.website}
                    helperText={errors.website?.message as string}
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

                <TextField label="City" {...register('city')} error={!!errors.city} helperText={errors.city?.message} />

                <FormControl fullWidth>
                    <InputLabel id="interests-label">Interests</InputLabel>
                    <Controller
                        control={control}
                        name="interests"
                        render={({ field }) => (
                            <Select
                                multiple
                                labelId="interests-label"
                                label="Interests"
                                value={(field.value ?? []) as string[]}
                                onChange={(e) =>
                                    field.onChange(
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
                        )}
                    />
                    <FieldErrorText error={undefined} />
                </FormControl>

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
            </FormGroup>
        </FormProvider>
    );
}
