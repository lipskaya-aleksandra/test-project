import * as z from 'zod';

export const emailValidationString = z
  .string()
  .min(1, { message: 'Email is required' })
  .email();
