import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ACTION_LABELS, FIELD_LABELS } from '@/features/loginForm/constants';
import Grid from '@mui/material/Grid';
import { useForm } from '@tanstack/react-form';
import { LoginSchema, type LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';
import { type FormEventHandler, type Ref, useCallback, useImperativeHandle, useRef } from 'react';

export interface TsfLoginFormProps {
    ref: Ref<TsfLoginFormRef>;
    handleOnSubmit: (results: LoginSchemaType) => void;
}

export interface TsfLoginFormRef {
    handleSubmit: () => void;
}

export function LoginForm({ ref, handleOnSubmit }: TsfLoginFormProps) {
    const form = useForm({
        validators: {
            onChange: LoginSchema,
            onSubmit: LoginSchema,
        },
        onSubmit: async (submit) => {
            console.log('Form Submitted:', submit);
        },
    });

    const formRef = useRef<HTMLFormElement>(null);

    const handleOnSubmitForm: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            console.log('Form onSubmit Event Triggered');
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
                console.log('Imperative Handle Submit Called');
                if (formRef.current) {
                    formRef.current.requestSubmit();
                }
            },
        }),
        [],
    );

    return (
        <form ref={formRef} onSubmit={handleOnSubmitForm}>
            <form.Field
                name="email"
                children={(field) => (
                    <TextField
                        fullWidth
                        label={FIELD_LABELS.id}
                        sx={{ mb: 1 }}
                        defaultValue={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={() => field.handleBlur()}
                    />
                )}
            />
            <form.Field name="password">
                {(field) => (
                    <TextField
                        fullWidth
                        label={FIELD_LABELS.password}
                        type="password"
                        sx={{ mb: 1 }}
                        defaultValue={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={() => field.handleBlur()}
                    />
                )}
            </form.Field>

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
                    <TextField fullWidth label={FIELD_LABELS.verificationCode} />
                </Grid>
                <Grid size={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
                    <Button fullWidth variant="outlined" sx={{ height: '100%' }}>
                        {ACTION_LABELS.fieldValidation}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
