import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { MenuButton, Dropdown, IconButton, Menu } from '@mui/joy';
import {
  AppBar,
  Box,
  Link,
  Stack,
  Toolbar,
  Typography,
  ClickAwayListener,
  Skeleton,
  Tooltip,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import loadingGif from '../../assets/1200x1200.gif';
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
          {!isFetching && (
            <Dropdown>
              <ClickAwayListener
                onClickAway={() => {
                  setIsMenuOpen(false);
                }}
              >
                <Box>
                  <Tooltip title="Open account menu" arrow>
                    <MenuButton
                      onClick={() => {
                        setIsMenuOpen(prev => !prev);
                      }}
                      sx={{
                        mr: 2,
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                          backgroundColor: 'inherit',
                          filter:
                            'drop-shadow(0px 2px 8px rgba(255,255,255,0.32))',
                        },
                      }}
                      slots={{ root: IconButton }}
                      slotProps={{
                        root: { variant: 'plain', color: 'neutral' },
                      }}
                    >
                      <UserInitialsLabel user={data} />
                    </MenuButton>
                  </Tooltip>
                  <Menu
                    open={isMenuOpen}
                    sx={{ zIndex: 5000 }}
                    placement="bottom"
                  >
                    <Stack sx={{ px: 1 }}>
                      <IconButton sx={{ color: 'gray' }}>
                        <AccountCircle sx={{ mr: 1 }} />
                        <Typography>Account</Typography>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          signout();
                          navigate('/login');
                        }}
                        sx={{
                          color: 'red',
                          '&:focus': { outline: 'none' },
                        }}
                      >
                        <ExitToApp sx={{ mr: 1 }} />
                        <Typography>Sign out</Typography>
                      </IconButton>
                    </Stack>
                  </Menu>
                </Box>
              </ClickAwayListener>
            </Dropdown>
          )}
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
