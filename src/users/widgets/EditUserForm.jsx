import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserById } from '../api/useGetUserById';
import { useEditUser } from '../api/useUpdateUser';

import UserForm from './UserForm';

export default function EditUserForm() {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);
  const navigate = useNavigate();

  const { mutate } = useEditUser(userId, {
    onSuccess: () => {
      navigate(`/users/${userId}`, { replace: true });
    },
  });

  const onSubmit = data => {
    mutate(data);
  };

  return <UserForm title="Edit user" user={user} onSubmit={onSubmit} />;
}
