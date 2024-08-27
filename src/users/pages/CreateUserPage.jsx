import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../api/useCreateUser';
import UserForm from '../UserForm';

export default function CreateUserPage() {
  const createUser = useCreateUser({
    onSuccess: () => {
      navigate(-1);
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser.mutate(data);
  };

  return <UserForm title={'Create user'} onSubmit={onSubmit} />;
}
