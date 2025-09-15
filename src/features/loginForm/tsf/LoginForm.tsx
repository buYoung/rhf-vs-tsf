import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ACTION_LABELS, FIELD_LABELS } from '@/features/loginForm/constants';
import Grid from '@mui/material/Grid';
import { useForm, useStore } from '@tanstack/react-form';
import { LoginSchema, type LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';
import { type FormEventHandler, type Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LoginFormValidateCode } from '@/features/loginForm/tsf/LoginFormValidateCode';
import { LoginFormOptions } from '@/features/loginForm/tsf/shared-form';

export interface TsfLoginFormProps {
    ref: Ref<TsfLoginFormRef>;
    handleOnSubmit: (results: LoginSchemaType) => void;
}

export interface TsfLoginFormRef {
    handleSubmit: () => void;
}

export function LoginForm({ ref, handleOnSubmit }: TsfLoginFormProps) {
    const form = useForm({
        ...LoginFormOptions,
        onSubmit: async ({ value }) => {
            handleOnSubmit(value);
        },
    });

    const formRef = useRef<HTMLFormElement>(null);

    const handleOnSubmitForm: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await form.handleSubmit();
        },
        [form],
    );

    useImperativeHandle(
        ref,
        () => ({
            handleSubmit: async () => {
                if (formRef.current) {
                    formRef.current.requestSubmit();
                }
            },
        }),
        [],
    );

    return (
        <Box component="form" ref={formRef} sx={{ mt: 2 }} onSubmit={handleOnSubmitForm} noValidate>
            <form.Field name="email">
                {(field) => (
                    <TextField
                        fullWidth
                        label={FIELD_LABELS.id}
                        sx={{ mb: 1 }}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        helperText={field.state.meta.errors?.at(0)?.message ?? undefined}
                    />
                )}
            </form.Field>
            <form.Field name="password">
                {(field) => (
                    <TextField
                        fullWidth
                        label={FIELD_LABELS.password}
                        type="password"
                        sx={{ mb: 1 }}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        helperText={field.state.meta.errors?.at(0)?.message ?? undefined}
                    />
                )}
            </form.Field>

            <LoginFormValidateCode form={form} />
        </Box>
    );
}
