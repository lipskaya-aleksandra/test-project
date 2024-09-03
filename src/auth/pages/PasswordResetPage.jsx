import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useResetPassword } from '../api/useResetPassword';
import PasswordResetForm from '../widgets/PasswordResetForm';

export default function PasswordResetPage() {
  const resetPassword = useResetPassword();
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const onSubmit = async data => {
    try {
      const response = await resetPassword(data);

      if (response.status === 201) {
        displaySnackbar({ message: 'Password reset successfully.' });
        navigate('/login');
      }
    } catch (e) {
      //
    }
  };

  return (
    <Stack
      sx={{
        width: 'fit-content',
        alignItems: 'center',
        margin: '0 auto',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <PasswordResetForm onSubmit={onSubmit} />
    </Stack>
  );
}
