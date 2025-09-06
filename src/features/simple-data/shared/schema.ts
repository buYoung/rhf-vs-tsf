import dayjs from 'dayjs';
import { z } from 'zod';

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
export const phoneRegex = /^\+?[0-9\s\-().]{7,}$/;

export const simpleSchema = z
    .object({
        firstName: z.string().min(1, { error: 'First name is required' }),
        lastName: z.string().min(1, { error: 'Last name is required' }),
        username: z.string().min(1, { error: 'Username is required' }),
        email: z.email({ error: 'Invalid email' }),
        phone: z.string().regex(phoneRegex, { error: 'Invalid phone number' }),
        password: z.string().regex(passwordRegex, { error: 'Password too weak' }),
        confirmPassword: z.string(),
        birthDate: z
            .string()
            .refine((v) => dayjs(v).isValid(), 'Invalid date')
            .refine((v) => !dayjs(v).isAfter(dayjs()), 'Date cannot be in the future'),
        age: z.number().int({ error: 'Age must be an integer' }).min(0, { error: 'Age cannot be negative' }).optional(),
        website: z.union([z.string().url({ error: 'Invalid URL' }), z.literal('')]).optional(),
        street: z.string().min(1, { error: 'Street is required' }),
        city: z.string().min(1, { error: 'City is required' }),
        state: z.string().min(1, { error: 'State is required' }),
        postalCode: z.string().min(1, { error: 'Postal code is required' }),
        country: z.string().min(1, { error: 'Country is required' }),
        newsletter: z.boolean().optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        jobTitle: z.string().optional(),
        company: z.string().optional(),
        termsAccepted: z.boolean().refine((v) => v === true, 'You must accept the terms'),
    })
    .refine((obj) => obj.password === obj.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type SimpleFormSchema = z.infer<typeof simpleSchema>;
