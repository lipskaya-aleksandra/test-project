import { Box } from '@mui/material';
import { Outlet, redirect } from 'react-router-dom';

import { useGetAccount } from '../../auth/api/useGetAccount';
import useUnauthorizedInterceptor from '../../auth/hooks/useUnauthorizedInterceptor';
import { defaultValues } from '../hooks/usePagination';

import NavBar from './NavBar';

export default function Root() {
  const { isSuccess } = useGetAccount({ enabled: false });

  useUnauthorizedInterceptor();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar />

      {isSuccess && <Outlet />}
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
