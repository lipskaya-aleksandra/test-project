import * as z from 'zod';

import { emailValidationString } from '../../auth/utils/validation/emailValidation';
import { passwordValidationString } from '../../auth/utils/validation/passwordValidation';

export const schema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: emailValidationString,
    password: passwordValidationString,
    confirmedPassword: z
      .string()
      .min(1, { message: 'Confirmed password is required' }),
  })
  .refine(data => data.password === data.confirmedPassword, {
    message: "Passwords don't match",
    path: ['confirmedPassword'],
  });
