import { z } from 'zod';
import dayjs from 'dayjs';
import { checkUsernameUnique, checkEmailDomain } from '../mocks/api';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Section A Schema - Personal Information (15 fields)
export const sectionASchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  
  // Username with async unique validation
  username: z.string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .refine(async (username) => {
      try {
        return await checkUsernameUnique(username);
      } catch {
        return true; // Allow if API fails
      }
    }, 'This username is already taken'),
    
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
    
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age'),
    
  birthDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), 'Invalid date')
    .refine((date) => date.isBefore(dayjs()), 'Birth date cannot be in the future')
    .refine((date) => date.isAfter(dayjs().subtract(120, 'years')), 'Please enter a valid birth date'),
    
  phoneNumber: z.string().min(1, 'Phone number is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender'
  }),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
});

// Section B Schema - Employment Information (15 fields)
export const sectionBSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  
  // Work email with domain validation
  workEmail: z.string()
    .min(1, 'Work email is required')
    .email('Please enter a valid email address'),
    
  role: z.string().min(1, 'Role is required'),
  department: z.string().min(1, 'Department is required'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'intern'], {
    required_error: 'Please select employment type'
  }),
  
  salary: z.number()
    .min(0, 'Salary cannot be negative')
    .max(1000000, 'Please enter a realistic salary amount'),
    
  startDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), 'Invalid start date'),
  
  endDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), 'Invalid end date').optional(),
  
  isCurrent: z.boolean(),
  remote: z.boolean(),
  officeCountry: z.string().optional(),
  officeCity: z.string().optional(),
  
  skills: z.array(z.string())
    .min(1, 'Please select at least one skill')
    .max(10, 'Please select no more than 10 skills'),
    
  certifications: z.string().optional(),
  newsletter: z.boolean()
}).refine(
  // If not remote, office location is required
  (data) => {
    if (!data.remote && (!data.officeCountry || !data.officeCity)) {
      return false;
    }
    return true;
  },
  {
    message: 'Office location is required for non-remote positions',
    path: ['officeCity']
  }
).refine(
  // If current job, end date should not be provided
  (data) => {
    if (data.isCurrent && data.endDate) {
      return false;
    }
    return true;
  },
  {
    message: 'End date should not be provided for current position',
    path: ['endDate']
  }
);

// Full nested schema with cross-section validation
export const nestedSchema = z.object({
  sectionA: sectionASchema,
  sectionB: sectionBSchema
}).refine(
  // Cross-validation: start date should be before end date
  (data) => {
    const { sectionB } = data;
    if (sectionB.endDate && sectionB.startDate) {
      return sectionB.startDate.isBefore(sectionB.endDate);
    }
    return true;
  },
  {
    message: 'Start date must be before end date',
    path: ['sectionB', 'endDate']
  }
).refine(
  // Cross-validation: work email domain should match company (async)
  async (data) => {
    const { sectionB } = data;
    try {
      return await checkEmailDomain(sectionB.workEmail, sectionB.companyName);
    } catch {
      // If API fails, allow the validation to pass
      return true;
    }
  },
  {
    message: 'Work email domain does not match the company',
    path: ['sectionB', 'workEmail']
  }
);
