import { Alert, Box } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function useAlertSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return ({ severity, message, Action }) =>
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      content: (key, message) => (
        <Alert
          onClose={() => {
            closeSnackbar(key);
          }}
          severity={severity ? severity : 'success'}
          sx={{ width: '100%' }}
          action={Action && <Action snackbarKey={key} />}
        >
          {message}
        </Alert>
      ),
    });
}
