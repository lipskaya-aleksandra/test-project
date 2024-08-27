import * as z from 'zod';

export const passwordValidationString = z
  .string()
  .min(1, { message: 'Password is required' })
  .email();

export const AT_LEAST_ONE_DIGIT = /\d/;
export const AT_LEAST_ONE_LOWERCASE_LETTER = /[a-z]/;
export const AT_LEAST_ONE_UPPERCASE_LETTER = /[A-Z]/;
export const AT_LEAST_ONE_SYMBOL = /[W_@]/;
export const MIN_LENGTH = 8;
