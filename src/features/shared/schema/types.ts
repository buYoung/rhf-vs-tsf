import type { Dayjs } from 'dayjs';

export interface SimpleFormValues {
  // Personal Information
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  age: number;
  birthDate: Dayjs;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  
  // Address Information
  country: string;
  city: string;
  addressLine1: string;
  zipCode: string;
  
  // Professional Information
  role: string;
  salary: number;
  startDate: Dayjs;
  website: string;
  bio: string;
  
  // Preferences & Agreement
  newsletter: boolean;
  acceptTerms: boolean;
}

export interface SectionAValues {
  // Personal Info (15 fields)
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  age: number;
  birthDate: Dayjs;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  city: string;
  addressLine1: string;
  zipCode: string;
  website: string;
  bio: string;
}

export interface SectionBValues {
  // Employment Info (15 fields)
  companyName: string;
  workEmail: string;
  role: string;
  department: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  salary: number;
  startDate: Dayjs;
  endDate?: Dayjs;
  isCurrent: boolean;
  remote: boolean;
  officeCountry?: string;
  officeCity?: string;
  skills: string[];
  certifications: string;
  newsletter: boolean;
}

export interface NestedFormValues {
  sectionA: SectionAValues;
  sectionB: SectionBValues;
}

// Handle type for section components
export interface SectionHandle<T> {
  validate: () => Promise<boolean>;
  getValues: () => T;
  reset: () => void;
}
