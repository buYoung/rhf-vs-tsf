import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import type { SimpleFormValues } from './types';

export function makeSimpleInitialValues(): SimpleFormValues {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName });
    const password = 'Aa1!' + faker.internet.password({ length: 8 });
    const birthDate = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });

    const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Korea'] as const;

    return {
        firstName,
        lastName,
        username,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        phone: `+1-${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
        password,
        confirmPassword: password,
        birthDate: dayjs(birthDate).toISOString(),
        age: faker.number.int({ min: 18, max: 60 }),
        website: faker.internet.url(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.helpers.arrayElement(countries),
        newsletter: faker.datatype.boolean(),
        gender: faker.helpers.arrayElement(['male', 'female', 'other'] as const),
        jobTitle: faker.person.jobTitle(),
        company: faker.company.name(),
        termsAccepted: true,
    };
}
