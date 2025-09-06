import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import type { NestedFormValues, SectionAValues, SectionBValues } from './types';

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;
const genders = ['male', 'female', 'other'] as const;
const contactMethods = ['email', 'phone', 'sms'] as const;
const interestsPool = ['music', 'sports', 'tech', 'travel', 'art', 'movies', 'books'];

function makeSectionA(): SectionAValues {
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    const username = faker.internet.username({ firstName: first, lastName: last });
    const password = 'Aa1!' + faker.internet.password({ length: 8 });
    const birthDate = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });

    const pickInterests = faker.helpers.arrayElements(interestsPool, { min: 1, max: 3 });

    return {
        firstName: first,
        lastName: last,
        username,
        email: faker.internet.email({ firstName: first, lastName: last }).toLowerCase(),
        phone: `+1-${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
        password,
        confirmPassword: password,
        birthDate: dayjs(birthDate).toISOString(),
        gender: faker.helpers.arrayElement(genders),
        contactMethod: faker.helpers.arrayElement(contactMethods),
        website: faker.internet.url(),
        interests: pickInterests,
        newsletter: faker.datatype.boolean(),
        country: faker.helpers.arrayElement(countries),
        city: faker.location.city(),
    };
}

function makeSectionB(): SectionBValues {
    const startDate = faker.date.past({ years: 5 });

    return {
        companyName: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
        startDate: dayjs(startDate).toISOString(),
        salary: faker.number.int({ min: 30000, max: 200000 }),
        workEmail: faker.internet.email().toLowerCase(),
        workPhone: `+1-${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
        officeLocation: faker.helpers.arrayElement(countries),
        remote: faker.datatype.boolean(),
        address: {
            street: faker.location.streetAddress(),
            state: faker.location.state(),
            postalCode: faker.location.zipCode(),
            country: faker.helpers.arrayElement(countries),
        },
        website: faker.internet.url(),
        teamSize: faker.number.int({ min: 1, max: 200 }),
    };
}

export function makeNestedInitialValues(): NestedFormValues {
    return {
        sectionA: makeSectionA(),
        sectionB: makeSectionB(),
    };
}
