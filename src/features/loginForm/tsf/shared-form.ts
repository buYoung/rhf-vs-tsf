import { formOptions } from '@tanstack/react-form';
import { LoginSchema, type LoginSchemaType } from '@/features/loginForm/schemas/loginSchema';

export const LoginFormOptions = formOptions({
    defaultValues: {
        email: '',
        password: '',
        verificationCode: '',
    },
    validators: {
        onSubmit: LoginSchema,
    },
});
