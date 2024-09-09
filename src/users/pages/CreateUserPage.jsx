import { useNavigate } from 'react-router-dom';

import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useCreateUser } from '../api/useCreateUser';
import UserForm from '../widgets/UserForm';

export default function CreateUserPage() {
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const createUser = useCreateUser({
    onSuccess: ({ data }) => {
      navigate(`/users/${data.id}`);
    },
    onError: error => {
      displaySnackbar({
        severity: 'error',
        message:
          error.response.data?.message ??
          'Something went wrong, please try again later.',
      });
    },
  });

  const onSubmit = data => {
    createUser.mutate(data);
  };

  return (
    <UserForm
      loading={createUser.isPending}
      title="Create user"
      onSubmit={onSubmit}
    />
  );
}
