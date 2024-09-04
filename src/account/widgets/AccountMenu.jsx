import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSignout } from '../../auth/api/useSignout';
import BaseMenu from '../../common/components/menu/BaseMenu';
import UserInitialsLabel from '../../users/components/UserInitialsLabel';

export default function AccountMenu({ user }) {
  const signout = useSignout();
  const navigate = useNavigate();

  return (
    <BaseMenu
      tooltipTitle="Open account menu"
      id="account-menu"
      MenuIcon={<UserInitialsLabel user={user} />}
      iconSx={{
        p: 0,
        '&:focus': { outline: 'none' },
        '&:hover': {
          backgroundColor: 'inherit',
          filter: 'drop-shadow(0px 2px 8px rgba(255,255,255,0.32))',
        },
      }}
    >
      <MenuItem
        onClick={() => {
          navigate('/account');
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
          navigate('/login', { replace: true });
        }}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        Sign out
      </MenuItem>
    </BaseMenu>
  );
}
