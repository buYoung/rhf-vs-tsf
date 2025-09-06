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
import { nestedRootSchema } from '../shared/schema';
import type { NestedFormValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs } from '../shared/ui';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;
const genders = ['male', 'female', 'other'] as const;
const contactMethods = ['email', 'phone', 'sms'] as const;

export interface NestedRHFTopManagedProps {
    defaultValues: NestedFormValues;
    onReady?: (api: { submit: () => Promise<NestedFormValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedRHFTopManaged({ defaultValues, onReady }: NestedRHFTopManagedProps) {
    const methods = useForm<NestedFormValues>({
        mode: 'onSubmit',
        resolver: zodResolver(nestedRootSchema),
        defaultValues,
    });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                let result: NestedFormValues | null = null;
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
                const a = [
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
                ] as const;
                const b = [
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
                const okA = await methods.trigger(a as any);
                const okB = await methods.trigger(b as any);
                return okA && okB;
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
                {/* Section A */}
                <TextField
                    label="First Name"
                    {...register('sectionA.firstName')}
                    error={!!errors.sectionA?.firstName}
                    helperText={errors.sectionA?.firstName?.message}
                />
                <TextField
                    label="Last Name"
                    {...register('sectionA.lastName')}
                    error={!!errors.sectionA?.lastName}
                    helperText={errors.sectionA?.lastName?.message}
                />
                <TextField
                    label="Username"
                    {...register('sectionA.username')}
                    error={!!errors.sectionA?.username}
                    helperText={errors.sectionA?.username?.message}
                />
                <TextField
                    label="Email"
                    type="email"
                    {...register('sectionA.email')}
                    error={!!errors.sectionA?.email}
                    helperText={errors.sectionA?.email?.message}
                />
                <TextField
                    label="Phone"
                    {...register('sectionA.phone')}
                    error={!!errors.sectionA?.phone}
                    helperText={errors.sectionA?.phone?.message}
                />
                <TextField
                    label="Password"
                    type="password"
                    {...register('sectionA.password')}
                    error={!!errors.sectionA?.password}
                    helperText={errors.sectionA?.password?.message}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    {...register('sectionA.confirmPassword')}
                    error={!!errors.sectionA?.confirmPassword}
                    helperText={errors.sectionA?.confirmPassword?.message}
                />

                <Controller
                    control={control}
                    name="sectionA.birthDate"
                    render={({ field }) => (
                        <div>
                            <DatePicker
                                label="Birth Date"
                                value={isoToDayjs(field.value)}
                                onChange={(v) => field.onChange(dayjsToIso(v))}
                            />
                            <FieldErrorText error={errors.sectionA?.birthDate?.message as string | undefined} />
                        </div>
                    )}
                />

                <FormControl fullWidth>
                    <InputLabel id="gender-label-top">Gender</InputLabel>
                    <Controller
                        control={control}
                        name="sectionA.gender"
                        render={({ field }) => (
                            <Select
                                labelId="gender-label-top"
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
                    <FieldErrorText error={errors.sectionA?.gender?.message as string | undefined} />
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Contact Method</FormLabel>
                    <Controller
                        control={control}
                        name="sectionA.contactMethod"
                        render={({ field }) => (
                            <RadioGroup row value={field.value} onChange={(e) => field.onChange(e.target.value)}>
                                {contactMethods.map((m) => (
                                    <FormControlLabel key={m} value={m} control={<Radio />} label={m} />
                                ))}
                            </RadioGroup>
                        )}
                    />
                    <FieldErrorText error={errors.sectionA?.contactMethod?.message as string | undefined} />
                </FormControl>

                <TextField
                    label="Website"
                    {...register('sectionA.website')}
                    error={!!errors.sectionA?.website}
                    helperText={errors.sectionA?.website?.message as string | undefined}
                />

                <FormControl fullWidth>
                    <InputLabel id="country-a-label-top">Country</InputLabel>
                    <Controller
                        control={control}
                        name="sectionA.country"
                        render={({ field }) => (
                            <Select
                                labelId="country-a-label-top"
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
                    <FieldErrorText error={errors.sectionA?.country?.message as string | undefined} />
                </FormControl>

                <TextField
                    label="City"
                    {...register('sectionA.city')}
                    error={!!errors.sectionA?.city}
                    helperText={errors.sectionA?.city?.message}
                />

                {/* Section B */}
                <TextField
                    label="Company Name"
                    {...register('sectionB.companyName')}
                    error={!!errors.sectionB?.companyName}
                    helperText={errors.sectionB?.companyName?.message}
                />
                <TextField
                    label="Job Title"
                    {...register('sectionB.jobTitle')}
                    error={!!errors.sectionB?.jobTitle}
                    helperText={errors.sectionB?.jobTitle?.message}
                />
                <TextField
                    label="Department"
                    {...register('sectionB.department')}
                    error={!!errors.sectionB?.department}
                    helperText={errors.sectionB?.department?.message}
                />

                <Controller
                    control={control}
                    name="sectionB.startDate"
                    render={({ field }) => (
                        <div>
                            <DatePicker
                                label="Start Date"
                                value={isoToDayjs(field.value)}
                                onChange={(v) => field.onChange(dayjsToIso(v))}
                            />
                            <FieldErrorText error={errors.sectionB?.startDate?.message as string | undefined} />
                        </div>
                    )}
                />

                <TextField
                    label="Salary"
                    type="number"
                    {...register('sectionB.salary', { valueAsNumber: true })}
                    error={!!errors.sectionB?.salary}
                    helperText={errors.sectionB?.salary?.message}
                />

                <TextField
                    label="Work Email"
                    type="email"
                    {...register('sectionB.workEmail')}
                    error={!!errors.sectionB?.workEmail}
                    helperText={errors.sectionB?.workEmail?.message}
                />
                <TextField
                    label="Work Phone"
                    {...register('sectionB.workPhone')}
                    error={!!errors.sectionB?.workPhone}
                    helperText={errors.sectionB?.workPhone?.message}
                />

                <FormControl fullWidth>
                    <InputLabel id="office-label-top">Office Location</InputLabel>
                    <Controller
                        control={control}
                        name="sectionB.officeLocation"
                        render={({ field }) => (
                            <Select
                                labelId="office-label-top"
                                label="Office Location"
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
                    <FieldErrorText error={errors.sectionB?.officeLocation?.message as string | undefined} />
                </FormControl>

                <Controller
                    control={control}
                    name="sectionB.remote"
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox checked={!!field.value} onChange={(_, c) => field.onChange(c)} />}
                            label="Remote"
                        />
                    )}
                />

                <TextField
                    label="Street"
                    {...register('sectionB.address.street')}
                    error={!!errors.sectionB?.address?.street}
                    helperText={errors.sectionB?.address?.street?.message}
                />
                <TextField
                    label="State"
                    {...register('sectionB.address.state')}
                    error={!!errors.sectionB?.address?.state}
                    helperText={errors.sectionB?.address?.state?.message}
                />
                <TextField
                    label="Postal Code"
                    {...register('sectionB.address.postalCode')}
                    error={!!errors.sectionB?.address?.postalCode}
                    helperText={errors.sectionB?.address?.postalCode?.message}
                />

                <FormControl fullWidth>
                    <InputLabel id="addr-country-label-top">Country</InputLabel>
                    <Controller
                        control={control}
                        name="sectionB.address.country"
                        render={({ field }) => (
                            <Select
                                labelId="addr-country-label-top"
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
                    <FieldErrorText error={errors.sectionB?.address?.country?.message as string | undefined} />
                </FormControl>

                <TextField
                    label="Website"
                    {...register('sectionB.website')}
                    error={!!errors.sectionB?.website}
                    helperText={errors.sectionB?.website?.message as string | undefined}
                />
                <TextField
                    label="Team Size"
                    type="number"
                    {...register('sectionB.teamSize', { valueAsNumber: true })}
                    error={!!errors.sectionB?.teamSize}
                    helperText={errors.sectionB?.teamSize?.message}
                />
            </FormGroup>
        </FormProvider>
    );
}
