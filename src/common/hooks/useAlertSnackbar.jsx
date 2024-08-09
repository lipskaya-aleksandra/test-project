import { Alert, Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

export default function useAlertSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return ({ severity, message, onCancel, Action }) =>
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
          severity={severity ?? 'success'}
          sx={{ width: '100%' }}
          action={<Action snackbarKey={key} />}
        >
          {message}
        </Alert>
      ),
    });
}
