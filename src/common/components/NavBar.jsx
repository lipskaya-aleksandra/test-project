import { AppBar, Link, Stack, Toolbar, Skeleton } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Fragment } from 'react';

import AccountMenu from '../../account/widgets/AccountMenu';
import loadingGif from '../../assets/1200x1200.gif';
import { useGetAccount } from '../../auth/api/useGetAccount';
import { defaultValues } from '../hooks/usePagination';

import NavLink from './NavLink';

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

export default function NavBar() {
  const { isFetching, data } = useGetAccount();

  const searchParams = new URLSearchParams(defaultValues);

  return (
    <Fragment>
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
            component={NavLink}
            to={`/users?${searchParams.toString()}`}
            sx={linkStyle}
          >
            Users
          </Link>
          <Link
            component={NavLink}
            to={`/posts?${searchParams.toString()}`}
            sx={linkStyle}
          >
            Posts
          </Link>
        </Toolbar>

        <Stack direction="row">
          {isFetching && (
            <Skeleton
              height={40}
              width={40}
              sx={{ mr: 2 }}
              animation="pulse"
              variant="circular"
            />
          )}
          {!isFetching && <AccountMenu user={data} />}
        </Stack>
      </AppBar>
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
    </Fragment>
  );
}
