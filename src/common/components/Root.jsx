import { AppBar, Box, Button, Link, Stack, Toolbar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Outlet, redirect, NavLink, useNavigate } from 'react-router-dom';

import { useGetAccount } from '../../auth/api/useGetAccount';
import { useSignout } from '../../auth/api/useSignout';
import useUnauthorizedInterceptor from '../../auth/hooks/useUnauthorizedInterceptor';
import UserInitialsLabel from '../../users/components/UserInitialsLabel';
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

function AppNavBar() {
  const { isFetching, data } = useGetAccount();
  const signout = useSignout();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(defaultValues);

  if (isFetching) return null;

  return (
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
      <Stack direction="row">
        <UserInitialsLabel user={data} />
        <Button
          onClick={() => {
            signout();
            navigate('/login');
          }}
          sx={{
            textTransform: 'none',
            color: 'white',
            backgroundColor: blue[400],
            mr: 2,
            '&:focus': { outline: 'none' },
          }}
        >
          Sign out
        </Button>
      </Stack>
    </AppBar>
  );
}

export default function Root() {
  const { isSuccess } = useGetAccount({ enabled: false });

  useUnauthorizedInterceptor();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppNavBar />

      {isSuccess && <Outlet />}
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
