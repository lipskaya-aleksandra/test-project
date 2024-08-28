import * as z from 'zod';

import { passwordValidationString } from './passwordValidation';

export const passwordResetFormSchema = z
  .object({
    password: passwordValidationString,
    confirmedPassword: z
      .string()
      .min(1, { message: 'Confirmed password is required' }),
  })
  .refine(data => data.password === data.confirmedPassword, {
    message: "Passwords don't match",
    path: ['confirmedPassword'],
  });
