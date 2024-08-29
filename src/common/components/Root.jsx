import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Outlet, redirect, NavLink } from 'react-router-dom';
import stc from 'string-to-color';

import { useGetAccount } from '../../auth/api/useGetAccount';
import useUnauthorizedInterceptor from '../../auth/hooks/useUnauthorizedInterceptor';
import { defaultValues } from '../hooks/usePagination';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: 16,
  '&:hover': {
    color: blue[200],
  },
  padding: '6px 12px',
  borderRadius: 2,
  marginRight: 6,
  marginLeft: 6,

  '&.active': {
    backgroundColor: blue[400],
  },
};

export default function Root() {
  const searchParams = new URLSearchParams(defaultValues);

  useUnauthorizedInterceptor();

  const { data } = useGetAccount();
  let userInitials;

  if (data.firstName && data.lastName) {
    userInitials = data.firstName[0] + data.lastName[0];
  } else {
    userInitials = data.email.slice(0, 2);
  }
  const userColor = stc(userInitials);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar
        sx={{
          width: '100%',
          mb: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        position="sticky"
      >
        <Toolbar>
          <Link
            className={({ isActive }) => (isActive ? 'active' : '')}
            component={NavLink}
            to={`/users?${searchParams.toString()}`}
            end
            sx={linkStyle}
          >
            Users
          </Link>
          <Link
            className={({ isActive }) => (isActive ? 'active' : '')}
            component={NavLink}
            to={`/posts?${searchParams.toString()}`}
            end
            sx={linkStyle}
          >
            Posts
          </Link>
        </Toolbar>
        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: userColor,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <Typography>{userInitials}</Typography>
        </Box>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
