import { Box, Container, Typography } from '@mui/material';
import { Outlet, redirect } from 'react-router-dom';

import loadingGif from '../../assets/1200x1200.gif';
import sorryGif from '../../assets/sorry-penguin.gif';
import useUnauthorizedInterceptor from '../../auth/hooks/useUnauthorizedInterceptor';
import { defaultValues } from '../hooks/usePagination';

import NavBar from './NavBar';
import QueryWrapper from './QueryWrapper';

export default function Root() {
  useUnauthorizedInterceptor();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <QueryWrapper
        suspenseFallback={
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
        }
        errorFallback={
          <Container
            sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
          >
            <img
              style={{
                height: 300,
              }}
              src={sorryGif}
              alt="Sorry, some error occured."
            />
            <Typography variant="h4">
              Ooops, some error occured while loading your data. Please, try
              again.
            </Typography>
          </Container>
        }
      >
        <NavBar />
        <Outlet />
      </QueryWrapper>
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
