import { AppBar, Toolbar, Skeleton, Box } from '@mui/material';
import { blue } from '@mui/material/colors';

import AccountMenu from '../../account/widgets/AccountMenu';
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

  borderRadius: 2,

  padding: '6px 12px',
  '&.active': {
    backgroundColor: blue[400],
  },
};

export default function NavBar() {
  const { isFetching, data } = useGetAccount();

  const searchParams = new URLSearchParams(defaultValues);

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
      <Toolbar sx={{ width: '100%' }}>
        <Box display="flex" gap={4}>
          <NavLink to={`/users?${searchParams.toString()}`} sx={linkStyle}>
            Users
          </NavLink>

          <NavLink to={`/posts?${searchParams.toString()}`} sx={linkStyle}>
            Posts
          </NavLink>
        </Box>

        <Box sx={{ ml: 'auto' }}>
          {isFetching && (
            <Skeleton
              height={40}
              width={40}
              animation="pulse"
              variant="circular"
            />
          )}
          {!isFetching && <AccountMenu user={data} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
