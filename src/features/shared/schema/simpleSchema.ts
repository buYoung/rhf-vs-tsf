import { z } from 'zod';
import dayjs from 'dayjs';
import { checkUsernameUnique } from '../mocks/api';

// Password strength validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const simpleSchema = z.object({
  // Personal Information - Required fields validation
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  
  // Username with unique validation (Custom async validation)
  username: z.string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .refine(async (username) => {
      try {
        return await checkUsernameUnique(username);
      } catch {
        // If API fails, allow the username (don't block user)
        return true;
      }
    }, 'This username is already taken'),
    
  // Email format validation
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
    
  // Password strength validation (regex + length)
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  // Number range validation
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age'),
    
  // Date validation
  birthDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), 'Invalid date')
    .refine((date) => date.isBefore(dayjs()), 'Birth date cannot be in the future')
    .refine((date) => date.isAfter(dayjs().subtract(120, 'years')), 'Please enter a valid birth date'),
    
  phoneNumber: z.string().min(1, 'Phone number is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender'
  }),
  
  // Address Information
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  
  // Professional Information
  role: z.string().min(1, 'Role is required'),
  
  // Salary range validation
  salary: z.number()
    .min(0, 'Salary cannot be negative')
    .max(1000000, 'Please enter a realistic salary amount'),
    
  startDate: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), 'Invalid date'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  
  // Preferences & Agreement
  newsletter: z.boolean(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine(
  // Conditional validation: if newsletter is true, email is required
  (data) => {
    if (data.newsletter && (!data.email || data.email.trim() === '')) {
      return false;
    }
    return true;
  },
  {
    message: 'Email is required when subscribing to newsletter',
    path: ['email']
  }
);
