import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ACTION_LABELS, FIELD_LABELS } from '@/features/loginForm/constants';
import Button from '@mui/material/Button';
import { LoginSchema } from '@/features/loginForm/schemas/loginSchema';
import * as React from 'react';
import { type useForm, useStore, type ReactFormExtendedApi } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

export interface LoginFormValidateCodeProps {
    form: ReactFormExtendedApi<z.input<typeof LoginSchema>, any, any, any, any, any, any, any, any, any, any, any>;
}

export function LoginFormValidateCode({ form }: LoginFormValidateCodeProps) {
    // Track verification code validity via local state (validated by button)
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [codeError, setCodeError] = useState<string | undefined>(undefined);

    // Subscribe to verificationCode value to reset validation state when it changes
    const verificationCodeValue = useStore(form.store, (s) => s.values.verificationCode ?? '');
    useEffect(() => {
        setIsCodeValid(false);
        setCodeError(undefined);
    }, [verificationCodeValue]);

    return (
        <form.Field name="verificationCode">
            {(field) => (
                <Grid container spacing={2}>
                    <Grid
                        size={{
                            xs: 3,
                            sm: 3,
                            md: 6,
                            lg: 6,
                            xl: 6,
                        }}
                    ></Grid>
                    <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <TextField
                            type={'number'}
                            fullWidth
                            label={FIELD_LABELS.verificationCode}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            helperText={codeError || field.state.meta.errors?.at(0)?.message || undefined}
                        />
                    </Grid>
                    <Grid size={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ height: '100%' }}
                            disabled={isCodeValid}
                            onClick={() => {
                                const result = LoginSchema.pick({ verificationCode: true }).safeParse({
                                    verificationCode: field.state.value ?? '',
                                });
                                if (result.success) {
                                    setIsCodeValid(true);
                                    setCodeError(undefined);
                                } else {
                                    const message = result.error.issues?.[0]?.message ?? 'Invalid Verification code';
                                    setIsCodeValid(false);
                                    setCodeError(message);
                                }
                            }}
                        >
                            {ACTION_LABELS.fieldValidation}
                        </Button>
                    </Grid>
                </Grid>
            )}
        </form.Field>
    );
}
