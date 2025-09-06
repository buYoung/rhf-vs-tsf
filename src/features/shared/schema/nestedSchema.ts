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
})
.refine(
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
)
.refine(
  // Cross-validation: salary should be reasonable for the role and experience
  (data) => {
    const { sectionB } = data;
    const { employmentType, yearsOfExperience, salary } = sectionB;
    
    // Salary expectations based on role and experience
    if (employmentType === 'intern' && salary > 60000) {
      return false;
    }
    
    if (employmentType === 'full-time') {
      const minSalary = 30000 + (yearsOfExperience * 3000);
      const maxSalary = 200000 + (yearsOfExperience * 5000);
      return salary >= minSalary && salary <= maxSalary;
    }
    
    return true;
  },
  {
    message: 'Salary should be appropriate for the role and experience level',
    path: ['sectionB', 'salary']
  }
)
.refine(
  // Cross-validation: remote work location consistency
  (data) => {
    const { sectionB } = data;
    const { remote, workLocation } = sectionB;
    
    // If remote is true, work location can be anywhere
    // If remote is false, work location should be more specific
    if (!remote && workLocation.toLowerCase().includes('remote')) {
      return false;
    }
    
    return true;
  },
  {
    message: 'Work location should be consistent with remote work preference',
    path: ['sectionB', 'workLocation']
  }
)
.refine(
  // Cross-validation: start date should not be too far in the future for experienced roles
  (data) => {
    const { sectionB } = data;
    const { startDate, yearsOfExperience } = sectionB;
    
    // Experienced professionals shouldn't have start dates too far in the future
    if (yearsOfExperience > 5) {
      const monthsFromNow = startDate.diff(dayjs(), 'month');
      return monthsFromNow <= 6; // Max 6 months for experienced professionals
    }
    
    return true;
  },
  {
    message: 'Start date should not be more than 6 months in the future for experienced roles',
    path: ['sectionB', 'startDate']
  }
)
.refine(
  // Async cross-validation: email domain should match company for known companies
  async (data) => {
    const { sectionA, sectionB } = data;
    const { email } = sectionA;
    const { company } = sectionB;
    
    try {
      return await checkEmailDomain(email, company);
    } catch {
      // If API fails, allow the combination (don't block user)
      return true;
    }
  },
  {
    message: 'Email domain should match the company domain for major companies',
    path: ['sectionA', 'email']
  }
);
