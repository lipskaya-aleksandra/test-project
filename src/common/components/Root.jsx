import { AppBar, Toolbar } from '@mui/material';
import { Outlet, redirect, Link as RouterLink } from 'react-router-dom';
import { defaultValues } from '../hooks/usePagination';
import { Link } from 'react-router-dom';

export default function Root() {
  const searchParams = new URLSearchParams(defaultValues);
  return (
    <>
      <AppBar style={{ width: '100vw', marginTop: 0 }} position="fixed">
        <Toolbar>
          <Link
            style={{ color: 'white', marginRight: 12, marginLeft: 6 }}
            variant="body2"
            color={'inherit'}
            component={<RouterLink />}
            to={'/users?' + searchParams.toString()}
          >
            Users
          </Link>
          <Link
            style={{ color: 'white' }}
            variant="body2"
            color={'inherit'}
            component={<RouterLink />}
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
  return redirect('/users');
}
