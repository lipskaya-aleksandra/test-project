import { Typography } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

const typographyStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  px: 1,
  borderRadius: 2,
};

export const statusColorMap = {
  active: green[800],
  pending: yellow[900],
  blocked: red[900],
  all: 'black',
};

export const statusMap = {
  active: (
    <Typography
      sx={{ ...typographyStyle, backgroundColor: green[100] }}
      color={statusColorMap['active']}
    >
      Active
    </Typography>
  ),
  pending: (
    <Typography
      sx={{ ...typographyStyle, backgroundColor: yellow[100] }}
      color={statusColorMap['pending']}
    >
      Pending
    </Typography>
  ),
  blocked: (
    <Typography
      sx={{ ...typographyStyle, backgroundColor: red[100] }}
      color={statusColorMap['blocked']}
    >
      Blocked
    </Typography>
  ),
};
