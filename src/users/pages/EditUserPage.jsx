import QueryWrapper from '../../common/components/QueryWrapper';
import EditUserForm from '../EditUserForm';
import UserCardFallback from '../UserCardFallback';
import { Alert } from '@mui/material';

export default function EditUserPage() {
  return (
    <QueryWrapper
      suspenseFallback={<UserCardFallback />}
      errorFallback={<Alert severity="error">Couldn't load user data.</Alert>}
    >
      <EditUserForm />
    </QueryWrapper>
  );
}
