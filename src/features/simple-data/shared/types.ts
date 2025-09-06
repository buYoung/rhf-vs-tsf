export type Gender = 'male' | 'female' | 'other';

export interface SimpleFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    birthDate: string; // ISO string
    age?: number;
    website?: string | '';
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    newsletter?: boolean;
    gender?: Gender;
    jobTitle?: string;
    company?: string;
    termsAccepted: boolean;
}
