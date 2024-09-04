import { Box } from '@mui/material';
import { Outlet, redirect } from 'react-router-dom';

import useUnauthorizedInterceptor from '../../auth/hooks/useUnauthorizedInterceptor';
import { defaultValues } from '../hooks/usePagination';

import NavBar from './NavBar';
import QueryWrapper from './QueryWrapper';
import ErrorFallback from './fallbacks/ErrorFallback';
import LoadingFallback from './fallbacks/LoadingFallback';

export default function Root() {
  useUnauthorizedInterceptor();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar />

      <QueryWrapper
        suspenseFallback={<LoadingFallback />}
        errorFallback={<ErrorFallback />}
      >
        <Outlet />
      </QueryWrapper>
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
