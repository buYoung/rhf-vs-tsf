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
    companyName,
    workEmail: faker.internet.email({
      provider: companyName.toLowerCase().replace(/\s+/g, '') + '.com'
    }),
    role: faker.helpers.arrayElement(roles),
    department: faker.helpers.arrayElement(departments),
    employmentType: faker.helpers.arrayElement(employmentTypes).value,
    salary: faker.number.int({ min: 40000, max: 250000 }),
    startDate: dayjs(faker.date.past({ years: 3 })),
    endDate: isCurrentJob ? undefined : dayjs(faker.date.recent({ days: 365 })),
    isCurrent: isCurrentJob,
    remote: isRemote,
    officeCountry: isRemote ? undefined : faker.helpers.arrayElement(countries),
    officeCity: isRemote ? undefined : faker.location.city(),
    skills: faker.helpers.arrayElements(skills, { min: 3, max: 7 }),
    certifications: faker.lorem.sentence(),
    newsletter: faker.datatype.boolean()
  };
}

export function makeNestedDefaults(): NestedFormValues {
  return {
    sectionA: makeSectionADefaults(),
    sectionB: makeSectionBDefaults()
  };
}
