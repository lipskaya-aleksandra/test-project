import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignout } from '../../auth/api/useSignout';
import BaseMenu from '../../common/components/menu/BaseMenu';
import UserInitialsLabel from '../../users/components/UserInitialsLabel';

export default function AccountMenu({ user }) {
  const signout = useSignout();
  const navigate = useNavigate();

  return (
    <Fragment>
      <BaseMenu
        tooltipTitle="Open account menu"
        id="account-menu"
        MenuIcon={<UserInitialsLabel user={user} />}
        iconSx={{
          mr: 2,
          '&:focus': { outline: 'none' },
          '&:hover': {
            backgroundColor: 'inherit',
            filter: 'drop-shadow(0px 2px 8px rgba(255,255,255,0.32))',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/users/account');
          }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            signout();
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </BaseMenu>
      {/* <Tooltip title="Open account menu" arrow>
        <IconButton
          onClick={onClick}
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          sx={{
            mr: 2,
            '&:focus': { outline: 'none' },
            '&:hover': {
              backgroundColor: 'inherit',
              filter: 'drop-shadow(0px 2px 8px rgba(255,255,255,0.32))',
            },
          }}
        >
          <UserInitialsLabel user={user} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={onClose}
        onClick={onClose}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            navigate('/users/account');
          }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            signout();
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Sign out
        </MenuItem> */}
      {/* <Stack sx={{ px: 1 }}>
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
            </Stack> */}
      {/* </Menu> */}
      {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={onClose}
        onClick={onClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu> */}
    </Fragment>
    // <Dropdown>
    //   <ClickAwayListener
    //     onClickAway={() => {
    //       setIsMenuOpen(false);
    //     }}
    //   >
    //     <Box>

    //       <Menu open={isMenuOpen} sx={{ zIndex: 5000 }} placement="top">
    //         <Stack sx={{ px: 1 }}>
    //           <IconButton sx={{ color: 'gray' }}>
    //             <AccountCircle sx={{ mr: 1 }} />
    //             <Typography>Account</Typography>
    //           </IconButton>
    //           <IconButton
    //             onClick={() => {
    //               signout();
    //               navigate('/login');
    //             }}
    //             sx={{
    //               color: 'red',
    //               '&:focus': { outline: 'none' },
    //             }}
    //           >
    //             <ExitToApp sx={{ mr: 1 }} />
    //             <Typography>Sign out</Typography>
    //           </IconButton>
    //         </Stack>
    //       </Menu>
    //     </Box>
    //   </ClickAwayListener>
    // </Dropdown>
  );
}
