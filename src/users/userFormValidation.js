import * as z from 'zod';

export const schema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().min(1, { message: 'Email is required' }).email(),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmedPassword: z
      .string()
      .min(1, { message: 'Confirmed password is required' }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords don't match",
    path: ['confirmedPassword', 'password'],
  });

export const AT_LEAST_ONE_DIGIT = /\d/;
export const AT_LEAST_ONE_LOWERCASE_LETTER = /[a-z]/;
export const AT_LEAST_ONE_UPPERCASE_LETTER = /[A-Z]/;
export const AT_LEAST_ONE_SYMBOL = /[W_@]/;
