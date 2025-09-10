import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ACTION_LABELS, FIELD_LABELS } from '@/features/loginForm/constants';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { LoginSchema, type LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormEventHandler, type Ref, useCallback, useImperativeHandle, useRef } from 'react';
import { LoginFormValidateCode } from '@/features/loginForm/rhf/LoginFormValidateCode';

export interface RhfLoginFormProps {
    ref: Ref<RhfLoginFormRef>;
}

export interface RhfLoginFormRef {
    handleSubmit: () => void;
}

export function LoginForm({ ref }: RhfLoginFormProps) {
    const { register, handleSubmit, formState, control, watch, trigger, setValue, setError } = useForm<LoginSchemaType>(
        {
            resolver: zodResolver(LoginSchema),
        },
    );

    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = useCallback((form: LoginSchemaType) => {
        console.log(form);
    }, []);

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            console.log('onSubmit');
            e.preventDefault();
            e.stopPropagation();
            void handleSubmit(handleFormSubmit, (errors) => {
                console.log('invalid', errors);
            })(e);
            return false;
        },
        [handleSubmit, handleFormSubmit],
    );

    useImperativeHandle<RhfLoginFormRef, RhfLoginFormRef>(
        ref,
        () => {
            return {
                handleSubmit: () => {
                    if (formRef.current) {
                        formRef.current.requestSubmit();
                    }
                },
            };
        },
        [],
    );

    return (
        <Box component="form" ref={formRef} sx={{ mt: 2 }} onSubmit={onSubmit} noValidate>
            <TextField
                fullWidth
                label={FIELD_LABELS.id}
                sx={{ mb: 1 }}
                {...register('email')}
                helperText={formState.errors.email?.message}
            />
            <TextField
                fullWidth
                label={FIELD_LABELS.password}
                type="password"
                sx={{ mb: 1 }}
                {...register('password')}
                helperText={formState.errors.password?.message}
            />

            <LoginFormValidateCode control={control} watch={watch} trigger={trigger} setValue={setValue} />
        </Box>
    );
}
