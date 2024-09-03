import { Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

import QueryWrapper from '../../common/components/QueryWrapper';
import UserCard from '../components/UserCard';
import UserCardFallback from '../components/UserCardFallback';

export default function UserDetailPage() {
  const { userId } = useParams();

  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={
        <Alert severity="error">Could not load user details</Alert>
      }
    >
      <UserCard userId={userId} />
    </QueryWrapper>
  );
}
