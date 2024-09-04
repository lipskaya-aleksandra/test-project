import { useNavigate, useParams } from 'react-router-dom';

import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useGetUserById } from '../api/useGetUserById';
import { useEditUser } from '../api/useUpdateUser';

import UserForm from './UserForm';

export default function EditUserForm() {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const { mutate } = useEditUser(userId, {
    onSuccess: () => {
      navigate(`/users/${userId}`, { replace: true });
    },
    onError: () => {
      displaySnackbar({
        severity: 'error',
        message: 'Something went wrong, please try again later.',
      });
    },
  });

  const onSubmit = data => {
    mutate(data);
  };

  return (
    <UserForm key="123" title="Edit user" user={user} onSubmit={onSubmit} />
  );
}
