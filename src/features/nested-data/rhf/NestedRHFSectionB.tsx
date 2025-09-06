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
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { sectionBSchema } from '../shared/schema';
import type { SectionBValues } from '../shared/types';
import { FieldErrorText, dayjsToIso, isoToDayjs } from '../shared/ui';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;

export interface NestedRHFSectionBProps {
    defaultValues: SectionBValues;
    onReady?: (api: { submit: () => Promise<SectionBValues | null>; validate: () => Promise<boolean> }) => void;
}

export default function NestedRHFSectionB({ defaultValues, onReady }: NestedRHFSectionBProps) {
    const methods = useForm<SectionBValues>({
        mode: 'onSubmit',
        resolver: zodResolver(sectionBSchema),
        defaultValues,
    });

    useEffect(() => {
        onReady?.({
            submit: async () => {
                let result: SectionBValues | null = null;
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
                const paths = [
                    'companyName',
                    'jobTitle',
                    'department',
                    'startDate',
                    'salary',
                    'workEmail',
                    'workPhone',
                    'officeLocation',
                    'remote',
                    'address.street',
                    'address.state',
                    'address.postalCode',
                    'address.country',
                    'website',
                    'teamSize',
                ] as const;
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
                    label="Company Name"
                    {...register('companyName')}
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                />
                <TextField
                    label="Job Title"
                    {...register('jobTitle')}
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                />
                <TextField
                    label="Department"
                    {...register('department')}
                    error={!!errors.department}
                    helperText={errors.department?.message}
                />

                <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                        <div>
                            <DatePicker
                                label="Start Date"
                                value={isoToDayjs(field.value)}
                                onChange={(v) => field.onChange(dayjsToIso(v))}
                            />
                            <FieldErrorText error={errors.startDate?.message} />
                        </div>
                    )}
                />

                <TextField
                    label="Salary"
                    type="number"
                    {...register('salary', { valueAsNumber: true })}
                    error={!!errors.salary}
                    helperText={errors.salary?.message}
                />

                <TextField
                    label="Work Email"
                    type="email"
                    {...register('workEmail')}
                    error={!!errors.workEmail}
                    helperText={errors.workEmail?.message}
                />
                <TextField
                    label="Work Phone"
                    {...register('workPhone')}
                    error={!!errors.workPhone}
                    helperText={errors.workPhone?.message}
                />

                <FormControl fullWidth>
                    <InputLabel id="office-label">Office Location</InputLabel>
                    <Controller
                        control={control}
                        name="officeLocation"
                        render={({ field }) => (
                            <Select
                                labelId="office-label"
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
                    <FieldErrorText error={errors.officeLocation?.message} />
                </FormControl>

                <Controller
                    control={control}
                    name="remote"
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox checked={!!field.value} onChange={(_, c) => field.onChange(c)} />}
                            label="Remote"
                        />
                    )}
                />

                <TextField
                    label="Street"
                    {...register('address.street')}
                    error={!!errors.address?.street}
                    helperText={errors.address?.street?.message}
                />
                <TextField
                    label="State"
                    {...register('address.state')}
                    error={!!errors.address?.state}
                    helperText={errors.address?.state?.message}
                />
                <TextField
                    label="Postal Code"
                    {...register('address.postalCode')}
                    error={!!errors.address?.postalCode}
                    helperText={errors.address?.postalCode?.message}
                />

                <FormControl fullWidth>
                    <InputLabel id="address-country-label">Country</InputLabel>
                    <Controller
                        control={control}
                        name="address.country"
                        render={({ field }) => (
                            <Select
                                labelId="address-country-label"
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
                    <FieldErrorText error={errors.address?.country?.message} />
                </FormControl>

                <TextField
                    label="Website"
                    {...register('website')}
                    error={!!errors.website}
                    helperText={errors.website?.message as string}
                />
                <TextField
                    label="Team Size"
                    type="number"
                    {...register('teamSize', { valueAsNumber: true })}
                    error={!!errors.teamSize}
                    helperText={errors.teamSize?.message}
                />
            </FormGroup>
        </FormProvider>
    );
}
