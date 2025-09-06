const EXISTING_USERNAMES = ['admin', 'test', 'user123', 'johndoe', 'janedoe', 'demo'];

const COMPANY_DOMAINS = {
  'Google': 'google.com',
  'Microsoft': 'microsoft.com',
  'Apple': 'apple.com',
  'Amazon': 'amazon.com',
  'Meta': 'meta.com',
  'Netflix': 'netflix.com',
  'Spotify': 'spotify.com',
  'Uber': 'uber.com',
  'Airbnb': 'airbnb.com',
  'Tesla': 'tesla.com'
};

/**
 * Mock API to check if username is unique
 * Simulates network delay and random failures
 */
export async function checkUsernameUnique(username: string): Promise<boolean> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  
  // Random network error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Network error: Unable to check username availability');
  }
  
  // Check against existing usernames
  const isUnique = !EXISTING_USERNAMES.includes(username.toLowerCase());
  
  return isUnique;
}

/**
 * Mock API to check if email domain matches company
 * Used for cross-field validation in nested forms
 */
export async function checkEmailDomain(email: string, company: string): Promise<boolean> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
  
  // Random network error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Network error: Unable to verify email domain');
  }
  
  if (!email.includes('@')) {
    return false;
  }
  
  const emailDomain = email.split('@')[1];
  const expectedDomain = COMPANY_DOMAINS[company as keyof typeof COMPANY_DOMAINS];
  
  if (!expectedDomain) {
    // If company is not in our predefined list, allow any domain
    return true;
  }
  
  return emailDomain === expectedDomain;
}

/**
 * Mock API to validate business rules
 * Simulates server-side validation
 */
export async function validateBusinessRules(data: Record<string, unknown>): Promise<{
  isValid: boolean;
  errors: Record<string, string>;
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));
  
  const errors: Record<string, string> = {};
  
  // Example business rule: salary should be reasonable for the role
  if (data.role === 'Intern' && typeof data.salary === 'number' && data.salary > 60000) {
    errors.salary = 'Intern salary cannot exceed $60,000';
  }
  
  // Example: Remote workers don't need office location
  if (data.remote === false && (!data.officeCity || !data.officeCountry)) {
    errors.officeCity = 'Office location is required for non-remote positions';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
