import { Close } from '@mui/icons-material';
import { CloseOutlined } from '@mui/icons-material';
import { DoneOutlined } from '@mui/icons-material';
import { Done } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

const typographySx = {
  verticalAlign: 'middle',
  display: 'inline-flex',
  fontSize: 14,
};

export default function PasswordValidationBox({
  hasOneDigit,
  hasOneLowercaseLetter,
  hasOneUppercaseLetter,
  hasOneSymbol,
  hasMinLength8,
}) {
  return (
    <Stack sx={{ my: 0.5 }}>
      <Typography
        sx={{ ...typographySx, color: hasMinLength8 ? green[800] : red[800] }}
      >
        {hasMinLength8 ? (
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
