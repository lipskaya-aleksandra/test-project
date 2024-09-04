import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function CenteredContentLayout() {
  return (
    <Stack
      sx={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        margin: '0 auto',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Stack>
  );
}
