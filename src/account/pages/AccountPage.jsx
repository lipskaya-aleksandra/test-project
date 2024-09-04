import { EditOutlined } from '@mui/icons-material';
import { Alert, ListItemIcon, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useGetAccount } from '../../auth/api/useGetAccount';
import QueryWrapper from '../../common/components/QueryWrapper';
import UserCard from '../../users/components/UserCard';
import UserCardFallback from '../../users/components/UserCardFallback';

export default function AccountPage() {
  const { data } = useGetAccount();
  const navigate = useNavigate();

  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={
        <Alert severity="error">Could not load account details</Alert>
      }
    >
      <UserCard
        menuOptions={
          <MenuItem
            onClick={() => {
              navigate('/account/reset-password');
            }}
          >
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            Reset password
          </MenuItem>
        }
        userId={data.id}
      />
    </QueryWrapper>
  );
}
