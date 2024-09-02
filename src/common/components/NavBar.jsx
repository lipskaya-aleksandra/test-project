import { AccountCircle } from '@mui/icons-material';
import { MenuButton, Dropdown, IconButton, Menu, MenuItem } from '@mui/joy';
import {
  AppBar,
  Box,
  Button,
  Link,
  Stack,
  Toolbar,
  Typography,
  ClickAwayListener,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAccount } from '../../auth/api/useGetAccount';
import { useSignout } from '../../auth/api/useSignout';
import UserInitialsLabel from '../../users/components/UserInitialsLabel';
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
  const signout = useSignout();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Dropdown>
          <ClickAwayListener
            onClickAway={() => {
              setIsMenuOpen(false);
            }}
          >
            <Box>
              <MenuButton
                onClick={() => {
                  setIsMenuOpen(prev => !prev);
                }}
                sx={{
                  mr: 2,
                  '&:focus': { outline: 'none' },
                  '&:hover': {
                    backgroundColor: 'inherit',
                    filter: 'drop-shadow(0px 2px 8px rgba(255,255,255,0.32))',
                  },
                }}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
              >
                <UserInitialsLabel user={data} />
              </MenuButton>
              <Menu open={isMenuOpen} sx={{ zIndex: 5000 }} placement="bottom">
                <Stack>
                  {/* <MenuItem> */}
                  <IconButton sx={{ color: 'gray', mx: 1 }}>
                    <AccountCircle sx={{ mr: 1 }} />
                    <Typography>Account</Typography>
                  </IconButton>
                  {/* </MenuItem> */}
                </Stack>
              </Menu>
            </Box>
          </ClickAwayListener>
        </Dropdown>
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
