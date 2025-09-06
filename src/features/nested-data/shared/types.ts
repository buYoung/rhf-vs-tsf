export type Gender = 'male' | 'female' | 'other';
export type ContactMethod = 'email' | 'phone' | 'sms';
export type OfficeLocation = 'United States' | 'Canada' | 'United Kingdom' | 'Germany' | 'France' | 'Korea';

export interface SectionAValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    birthDate: string; // ISO
    gender?: Gender;
    contactMethod: ContactMethod;
    website?: string | '';
    interests?: string[];
    newsletter?: boolean;
    country: OfficeLocation;
    city: string;
}

export interface AddressValues {
    street: string;
    state: string;
    postalCode: string;
    country: OfficeLocation;
}

export interface SectionBValues {
    companyName: string;
    jobTitle: string;
    department?: string;
    startDate: string; // ISO
    salary: number;
    workEmail: string;
    workPhone: string;
    officeLocation: OfficeLocation;
    remote?: boolean;
    address: AddressValues;
    website?: string | '';
    teamSize?: number;
}

export interface NestedFormValues {
    sectionA: SectionAValues;
    sectionB: SectionBValues;
}
