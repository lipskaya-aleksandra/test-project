import { useNavigate } from 'react-router-dom';

import { useCreateUser } from '../api/useCreateUser';
import UserForm from '../widgets/UserForm';

export default function CreateUserPage() {
  const navigate = useNavigate();

  const createUser = useCreateUser({
    onSuccess: () => {
      navigate(-1);
    },
  });

  const onSubmit = data => {
    createUser.mutate(data);
  };

  return <UserForm title="Create user" onSubmit={onSubmit} />;
}
