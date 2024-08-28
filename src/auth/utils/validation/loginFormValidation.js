import * as z from 'zod';

import { emailValidationString } from './emailValidation';
import { passwordValidationString } from './passwordValidation';

export const loginFormSchema = z.object({
  email: emailValidationString,
  password: passwordValidationString,
});
