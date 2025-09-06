import { faker } from '@faker-js/faker';

export const countries = [
  'United States',
  'United Kingdom', 
  'Canada',
  'Germany',
  'France',
  'Australia',
  'Japan',
  'South Korea',
  'Netherlands',
  'Sweden',
  'Switzerland',
  'Singapore',
  'New Zealand'
];

export const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
] as const;

export const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'UI/UX Designer',
  'Data Scientist',
  'Software Architect',
  'Technical Lead',
  'QA Engineer'
];

export const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Customer Support',
  'Data & Analytics'
];

export const employmentTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'intern', label: 'Intern' }
] as const;

export const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'Docker',
  'Kubernetes',
  'AWS',
  'GraphQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Git'
];

export const generateCities = (country: string): string[] => {
  switch (country) {
    case 'United States':
      return ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Seattle', 'Boston'];
    case 'United Kingdom':
      return ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Bristol'];
    case 'Canada':
      return ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'];
    case 'Germany':
      return ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'];
    case 'France':
      return ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'];
    case 'Australia':
      return ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'];
    case 'Japan':
      return ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'];
    case 'South Korea':
      return ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Gwangju'];
    default:
      return [faker.location.city(), faker.location.city(), faker.location.city()];
  }
};
