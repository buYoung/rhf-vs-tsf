import { formOptions } from '@tanstack/react-form';
import { LoginSchema } from '@/features/loginForm/schemas/loginSchema';
import type { z } from 'zod';

export const LoginFormOptions = formOptions({
    defaultValues: {
        email: '',
        password: '',
        verificationCode: '',
    } as z.input<typeof LoginSchema>,
    validators: {
        onSubmit: LoginSchema,
    },
});
