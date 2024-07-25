import { AppBar, Link, Toolbar } from '@mui/material';
import { Outlet, redirect, Link as RouterLink } from 'react-router-dom';
import { defaultValues } from '../hooks/usePagination';

export default function Root() {
  const searchParams = new URLSearchParams(defaultValues);
  return (
    <>
      <AppBar style={{ width: '100vw', marginTop: 0 }} position="fixed">
        <Toolbar>
          <Link
            sx={{ color: 'white', marginRight: 12, marginLeft: 6 }}
            variant="body2"
            color={'inherit'}
            component={RouterLink}
            to={'/users?' + searchParams.toString()}
          >
            Users
          </Link>
          <Link
            style={{ color: 'white' }}
            variant="body2"
            color={'inherit'}
            component={RouterLink}
            to={'/posts?' + searchParams.toString()}
          >
            Posts
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export function rootLoader() {
  const searchParams = new URLSearchParams(defaultValues);
  return redirect('/users?' + searchParams.toString());
}
