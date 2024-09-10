import { Box, Typography } from '@mui/material';

import errorImg from '../../../assets/pngwing.com.png';

export default function Error404Fallback() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <img style={{ height: 300 }} src={errorImg} alt="ERROR 404" />
      <Typography color="#5893b0" variant="h5">
        Record not found.
      </Typography>
    </Box>
  );
}
