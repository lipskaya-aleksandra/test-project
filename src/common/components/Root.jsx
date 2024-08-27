import { AppBar, Box, Link, Toolbar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Outlet, redirect, NavLink } from 'react-router-dom';

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar sx={{ width: '100%', mb: 3 }} position="sticky">
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
      </AppBar>
      <Outlet />
    </Box>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);

  return redirect(`/users?${searchParams.toString()}`);
}
