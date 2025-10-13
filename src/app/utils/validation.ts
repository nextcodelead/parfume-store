import { FormData, FormErrors } from '../types/checkoutTypes';

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\+?[\d\s\-\(\)]{10,}$/;
  return re.test(phone);
};

export const validateZipCode = (zipCode: string): boolean => {
  return zipCode.length >= 4;
};

export const validateForm = (formData: FormData, step: number): FormErrors => {
  const errors: FormErrors = {};

  console.log('Validating form data for step:', step);

  if (step === 0) {
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }
  }

  if (step === 1) {
    if (!formData.country.trim()) errors.country = 'Country is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.zipCode.trim()) {
      errors.zipCode = 'Zip code is required';
    } else if (!validateZipCode(formData.zipCode)) {
      errors.zipCode = 'Invalid zip code';
    }
  }

  console.log('Validation errors:', errors);

  return errors;
};