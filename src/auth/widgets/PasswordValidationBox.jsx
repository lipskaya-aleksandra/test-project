import { CloseOutlined, DoneOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  AT_LEAST_ONE_DIGIT,
  AT_LEAST_ONE_LOWERCASE_LETTER,
  AT_LEAST_ONE_SYMBOL,
  AT_LEAST_ONE_UPPERCASE_LETTER,
  MIN_LENGTH,
} from '../utils/validation/passwordValidation';

const typographySx = {
  verticalAlign: 'middle',
  display: 'inline-flex',
  fontSize: 14,
};

export default function PasswordValidationBox() {
  const { control } = useFormContext();

  const password = useWatch({
    control,
    name: 'password',
  });

  const hasOneDigit = AT_LEAST_ONE_DIGIT.test(password);
  const hasOneLowercaseLetter = AT_LEAST_ONE_LOWERCASE_LETTER.test(password);
  const hasOneUppercaseLetter = AT_LEAST_ONE_UPPERCASE_LETTER.test(password);
  const hasOneSymbol = AT_LEAST_ONE_SYMBOL.test(password);
  const hasMinLength = password.length >= MIN_LENGTH;

  return (
    <Stack sx={{ my: 0.5 }}>
      <Typography
        sx={{ ...typographySx, color: hasMinLength ? green[800] : red[800] }}
      >
        {hasMinLength ? (
          <DoneOutlined fontSize="small" />
        ) : (
          <CloseOutlined fontSize="small" />
        )}
        At least 8 characters long
      </Typography>

      <Typography
        sx={{ ...typographySx, color: hasOneDigit ? green[800] : red[800] }}
      >
        {hasOneDigit ? (
          <DoneOutlined fontSize="small" />
        ) : (
          <CloseOutlined fontSize="small" />
        )}
        At least one digit
      </Typography>

      <Typography
        sx={{
          ...typographySx,
          color: hasOneLowercaseLetter ? green[800] : red[800],
        }}
      >
        {hasOneLowercaseLetter ? (
          <DoneOutlined fontSize="small" />
        ) : (
          <CloseOutlined fontSize="small" />
        )}
        At least one lowercase letter
      </Typography>

      <Typography
        sx={{
          ...typographySx,
          color: hasOneUppercaseLetter ? green[800] : red[800],
        }}
      >
        {hasOneUppercaseLetter ? (
          <DoneOutlined fontSize="small" />
        ) : (
          <CloseOutlined fontSize="small" />
        )}
        At least one uppercase letter
      </Typography>

      <Typography
        sx={{ ...typographySx, color: hasOneSymbol ? green[800] : red[800] }}
      >
        {hasOneSymbol ? (
          <DoneOutlined fontSize="small" />
        ) : (
          <CloseOutlined fontSize="small" />
        )}
        At least one symbol
      </Typography>
    </Stack>
  );
}
