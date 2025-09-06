import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { countries, genders, roles, departments, employmentTypes, skills } from './options';
import type { NestedFormValues, SectionAValues, SectionBValues } from '../schema/types';

export function makeSectionADefaults(): SectionAValues {
  const country = faker.helpers.arrayElement(countries);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    firstName,
    lastName,
    username: faker.internet.username({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }),
    password: '', // Keep empty for demo purposes
    age: faker.number.int({ min: 18, max: 65 }),
    birthDate: dayjs(faker.date.birthdate({ min: 18, max: 65, mode: 'age' })),
    phoneNumber: faker.phone.number(),
    gender: faker.helpers.arrayElement(genders).value,
    country,
    city: faker.location.city(),
    addressLine1: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
    website: faker.internet.url(),
    bio: faker.lorem.paragraph()
  };
}

export function makeSectionBDefaults(): SectionBValues {
  const companyName = faker.company.name();
  const isCurrentJob = faker.datatype.boolean();
  const isRemote = faker.datatype.boolean();
  
  return {
    jobTitle: faker.person.jobTitle(),
    company: companyName,
    department: faker.helpers.arrayElement(departments).value,
    role: faker.helpers.arrayElement(roles).value,
    employmentType: faker.helpers.arrayElement(employmentTypes).value,
    yearsOfExperience: faker.number.int({ min: 0, max: 20 }),
    startDate: dayjs(faker.date.past({ years: 3 })),
    salary: faker.number.int({ min: 40000, max: 250000 }),
    skills: faker.helpers.arrayElements(skills, { min: 3, max: 7 }).map(s => s.value),
    linkedinProfile: faker.internet.url(),
    managerName: faker.person.fullName(),
    workLocation: faker.location.city(),
    remote: isRemote,
    flexible: faker.datatype.boolean(),
    benefits: faker.datatype.boolean(),
    notes: faker.lorem.paragraph()
  };
}

export function makeNestedDefaults(): NestedFormValues {
  return {
    sectionA: makeSectionADefaults(),
    sectionB: makeSectionBDefaults()
  };
}
