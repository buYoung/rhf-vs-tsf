import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.email('Invalid email'),
    password: z
        .string()
        .min(6)
        .regex(/[^A-Za-z0-9]/, 'At least 1 special character'),
    verificationCode: z.string().regex(/^\d{6}$/, 'Invalid Verification code'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
