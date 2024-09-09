import { Typography } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

const typographyStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  px: 1,
  borderRadius: 2,
};

export const statusColorMap = {
  active: { color: green[800], backgroundColor: green[100] },
  pending: { color: yellow[900], backgroundColor: yellow[100] },
  blocked: { color: red[900], backgroundColor: red[100] },
  all: { color: 'black', backgroundColor: 'black' },
};

export default function StatusLabel({ value }) {
  return (
    <Typography sx={{ ...typographyStyle, ...statusColorMap[value] }}>
      {value}
    </Typography>
  );
}
