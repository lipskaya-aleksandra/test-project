import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuthedResetPassword } from '../../auth/api/useAuthedResetPassword';
import PasswordResetForm from '../../auth/widgets/PasswordResetForm';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';

export default function AuthedPasswordResetPage() {
  const resetPassword = useAuthedResetPassword();
  const navigate = useNavigate();
  const displaySnackbar = useAlertSnackbar();

  const onSubmit = async data => {
    try {
      const response = await resetPassword.mutateAsync(data);

      if (response.status === 201) {
        displaySnackbar({ message: 'Password reset successfully.' });
        navigate(-1);
      }
    } catch (e) {
      //
    }
  };

  return (
    <Stack
      sx={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <PasswordResetForm
        loading={resetPassword.isPending}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}
