import { Box } from '@mui/material';
import { Outlet, redirect, Navigate } from 'react-router-dom';

import loadingGif from '../../assets/1200x1200.gif';
import { useGetAccount } from '../../auth/api/useGetAccount';
import useUnauthorizedInterceptor from '../../auth/hooks/useUnauthorizedInterceptor';
import { defaultValues } from '../hooks/usePagination';

import NavBar from './NavBar';

export default function Root() {
  const { isSuccess, isFetching, isError } = useGetAccount({ enabled: false });

  useUnauthorizedInterceptor();

  if (isError) {
    return <Navigate to="error" />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar />

      {isFetching && (
        <img
          style={{
            height: '100%',
            margin: '0 auto',
            position: 'absolute',
            alignSelf: 'center',
          }}
          src={loadingGif}
          alt="loading..."
        />
      )}
      {isSuccess && <Outlet />}
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
