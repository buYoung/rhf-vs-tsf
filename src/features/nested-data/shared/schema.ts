import dayjs from 'dayjs';
import { z } from 'zod';

export const phoneRegex = /^\+?[0-9\s\-().]{7,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;
const genders = ['male', 'female', 'other'] as const;
const contactMethods = ['email', 'phone', 'sms'] as const;

export const addressSchema = z.object({
    street: z.string().min(1, { error: 'Street is required' }),
    state: z.string().min(1, { error: 'State is required' }),
    postalCode: z.string().min(1, { error: 'Postal code is required' }),
    country: z.enum(countries, { error: 'Country is required' }),
});

export const sectionASchema = z
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
        gender: z.enum(genders).optional(),
        contactMethod: z.enum(contactMethods, { error: 'Contact method is required' }),
        website: z.union([z.string().url({ error: 'Invalid URL' }), z.literal('')]).optional(),
        interests: z.array(z.string()).optional(),
        newsletter: z.boolean().optional(),
        country: z.enum(countries, { error: 'Country is required' }),
        city: z.string().min(1, { error: 'City is required' }),
    })
    .refine((obj) => obj.password === obj.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const sectionBSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    department: z.string().optional(),
    startDate: z
        .string()
        .refine((v) => dayjs(v).isValid(), 'Invalid date')
        .refine((v) => !dayjs(v).isAfter(dayjs()), 'Date cannot be in the future'),
    salary: z.number().min(0, { error: 'Salary cannot be negative' }),
    workEmail: z.email({ error: 'Invalid email' }),
    workPhone: z.string().regex(phoneRegex, { error: 'Invalid phone number' }),
    officeLocation: z.enum(countries, { error: 'Office location is required' }),
    remote: z.boolean().optional(),
    address: addressSchema,
    website: z.union([z.string().url({ error: 'Invalid URL' }), z.literal('')]).optional(),
    teamSize: z
        .number()
        .int({ error: 'Team size must be an integer' })
        .min(1, { error: 'Team size must be at least 1' })
        .optional(),
});

export const nestedRootSchema = z.object({
    sectionA: sectionASchema,
    sectionB: sectionBSchema,
});

export type AddressSchema = z.infer<typeof addressSchema>;
export type SectionASchema = z.infer<typeof sectionASchema>;
export type SectionBSchema = z.infer<typeof sectionBSchema>;
export type NestedRootSchema = z.infer<typeof nestedRootSchema>;
