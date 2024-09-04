import { useNavigate } from 'react-router-dom';

import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useCreateUser } from '../api/useCreateUser';
import UserForm from '../widgets/UserForm';

export default function CreateUserPage() {
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const createUser = useCreateUser({
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      displaySnackbar({
        severity: 'error',
        message: 'Something went wrong, please try again later.',
      });
    },
  });

  const onSubmit = data => {
    createUser.mutate(data);
  };

  return <UserForm title="Create user" onSubmit={onSubmit} />;
}
