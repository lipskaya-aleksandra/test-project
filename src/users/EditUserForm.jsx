import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEditUser } from './api/useUpdateUser';
import UserForm from './UserForm';
import { useGetUserById } from './api/useGetUserById';

export default function EditUserForm() {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);
  const navigate = useNavigate();

  const { mutate } = useEditUser(userId, {
    onSuccess: () => {
      navigate(`/users/${userId}`, { replace: true });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return <UserForm user={user} onSubmit={onSubmit} />;
}
