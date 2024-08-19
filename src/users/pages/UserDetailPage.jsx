import { Alert } from '@mui/material';
import UserCard from '../UserCard';
import QueryWrapper from '../../common/components/QueryWrapper';
import UserCardFallback from '../UserCardFallback';

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
