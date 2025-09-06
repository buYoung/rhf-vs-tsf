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
  website?: string;
  bio?: string;
}

export interface SectionBValues {
  // Employment Info (15 fields)
  jobTitle: string;
  company: string;
  department: string;
  role: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  yearsOfExperience: number;
  startDate: Dayjs;
  salary: number;
  skills: string[];
  linkedinProfile?: string;
  managerName: string;
  workLocation: string;
  remote: boolean;
  flexible: boolean;
  benefits: boolean;
  notes?: string;
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
