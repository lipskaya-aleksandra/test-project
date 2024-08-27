import { Alert } from '@mui/material';

import QueryWrapper from '../../common/components/QueryWrapper';
import UserCardFallback from '../components/UserCardFallback';
import EditUserForm from '../widgets/EditUserForm';

export default function EditUserPage() {
  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={
        <Alert severity="error">Couldn&apos;t load user data.</Alert>
      }
    >
      <EditUserForm />
    </QueryWrapper>
  );
}
