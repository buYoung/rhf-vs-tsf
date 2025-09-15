import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FIELD_LABELS } from '@/features/loginForm/constants';
import { useForm } from 'react-hook-form';
import { LoginSchema, type LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormEventHandler, type Ref, useCallback, useImperativeHandle, useRef } from 'react';
import { LoginFormValidateCode } from '@/features/loginForm/rhf/LoginFormValidateCode';
import { toast } from 'react-toastify';

export interface RhfLoginFormProps {
    ref: Ref<RhfLoginFormRef>;
    handleOnSubmit: (results: LoginSchemaType) => void;
}

export interface RhfLoginFormRef {
    handleSubmit: () => void;
}

export function LoginForm({ ref, handleOnSubmit }: RhfLoginFormProps) {
    const {
        register,
        handleSubmit: formHandleSubmit,
        formState,
        control,
        watch,
        trigger,
        setValue,
        setError,
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
    });

    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = useCallback(
        (form: LoginSchemaType) => {
            handleOnSubmit(form);
        },
        [handleOnSubmit],
    );

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            void formHandleSubmit(handleFormSubmit, (errors) => {
                const errorMessageSize = Object.values(errors).map((err) => err.message).length;
                toast(
                    <>
                        <Box>
                            Validation errors occurred. Please check your input. <em>{errorMessageSize}</em>
                        </Box>
                    </>,
                    { type: 'error' },
                );
            })(e);
            return false;
        },
        [formHandleSubmit, handleFormSubmit],
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
