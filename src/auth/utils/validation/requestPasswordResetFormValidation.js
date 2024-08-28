import * as z from 'zod';

import { emailValidationString } from './emailValidation';

export const requestPasswordResetFormSchema = z.object({
  email: emailValidationString,
});
