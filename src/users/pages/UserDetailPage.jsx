import { Alert } from '@mui/material';

import QueryWrapper from '../../common/components/QueryWrapper';
import UserCard from '../components/UserCard';
import UserCardFallback from '../components/UserCardFallback';

export default function UserDetailPage() {
  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={
        <Alert severity="error">Could not load user details</Alert>
      }
    >
      <UserCard />
    </QueryWrapper>
  );
}
