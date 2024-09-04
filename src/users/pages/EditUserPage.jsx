import { Suspense } from 'react';

import UserCardFallback from '../components/UserCardFallback';
import EditUserForm from '../widgets/EditUserForm';

export default function EditUserPage() {
  return (
    <Suspense fallback={<UserCardFallback />}>
      <EditUserForm />
    </Suspense>
  );
}
