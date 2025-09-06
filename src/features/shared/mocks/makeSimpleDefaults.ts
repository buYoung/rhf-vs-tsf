import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { countries, genders, roles } from './options';
import type { SimpleFormValues } from '../schema/types';

export function makeSimpleDefaults(): SimpleFormValues {
  const country = faker.helpers.arrayElement(countries);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    // Personal Information
    firstName,
    lastName,
    username: faker.internet.username({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }),
    password: '', // Keep empty for demo purposes
    age: faker.number.int({ min: 18, max: 65 }),
    birthDate: dayjs(faker.date.birthdate({ min: 18, max: 65, mode: 'age' })),
    phoneNumber: faker.phone.number(),
    gender: faker.helpers.arrayElement(genders).value,
    
    // Address Information
    country,
    city: faker.location.city(),
    addressLine1: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
    
    // Professional Information
    role: faker.helpers.arrayElement(roles),
    salary: faker.number.int({ min: 30000, max: 200000 }),
    startDate: dayjs(faker.date.past({ years: 5 })),
    website: faker.internet.url(),
    bio: faker.lorem.paragraph(),
    
    // Preferences & Agreement
    newsletter: faker.datatype.boolean(),
    acceptTerms: false // Keep false for validation testing
  };
}
