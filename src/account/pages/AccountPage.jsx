import { EditOutlined } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useGetAccount } from '../../auth/api/useGetAccount';
import ErrorFallback from '../../common/components/fallbacks/ErrorFallback';
import UserCard from '../../users/components/UserCard';
import UserCardFallback from '../../users/components/UserCardFallback';

export default function AccountPage() {
  const { data, isFetching, isError } = useGetAccount();
  const navigate = useNavigate();

  if (isFetching) {
    return <UserCardFallback />;
  }

  if (isError) {
    return <ErrorFallback />;
  }

  return (
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
      user={data}
    />
  );
}
