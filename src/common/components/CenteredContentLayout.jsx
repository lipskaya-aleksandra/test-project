import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function CenteredContentLayout() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Outlet />
    </Box>
  );
}
