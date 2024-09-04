import { useParams } from 'react-router-dom';

import QueryWrapper from '../../common/components/QueryWrapper';
import Error404Fallback from '../../common/components/fallbacks/Error404Fallback';
import UserCardFallback from '../components/UserCardFallback';
import UserDataWrapper from '../components/UserDataWrapper';

export default function UserDetailPage() {
  const { userId } = useParams();

  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={<Error404Fallback />}
    >
      <UserDataWrapper userId={userId} />
    </QueryWrapper>
  );
}
