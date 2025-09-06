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
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  department: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'intern'], {
    required_error: 'Please select employment type'
  }),
  yearsOfExperience: z.number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Please enter a realistic number of years'),
  startDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), 'Invalid start date'),
  salary: z.number()
    .min(0, 'Salary cannot be negative')
    .max(1000000, 'Please enter a realistic salary amount'),
  skills: z.array(z.string())
    .min(1, 'Please select at least one skill')
    .max(10, 'Please select no more than 10 skills'),
  linkedinProfile: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  managerName: z.string().min(1, 'Manager name is required'),
  workLocation: z.string().min(1, 'Work location is required'),
  remote: z.boolean(),
  flexible: z.boolean(),
  benefits: z.boolean(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional()
});

// Full nested schema with cross-section validation
export const nestedSchema = z.object({
  sectionA: sectionASchema,
  sectionB: sectionBSchema
}).refine(
  // Cross-validation: age should match birth date approximately
  (data) => {
    const { sectionA } = data;
    const calculatedAge = dayjs().diff(sectionA.birthDate, 'year');
    const ageDifference = Math.abs(calculatedAge - sectionA.age);
    return ageDifference <= 1; // Allow 1 year difference
  },
  {
    message: 'Age should match the birth date',
    path: ['sectionA', 'age']
  }
);
