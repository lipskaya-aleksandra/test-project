import { Alert } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useContext, createContext } from 'react';

const SnackbarCtx = createContext({ onClose: () => {}, key: null });

export const useSnackbarContext = () => useContext(SnackbarCtx);

export default function useAlertSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const pushSnackbar = useCallback(
    ({ severity, message, Action }) =>
      enqueueSnackbar(message, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 5000,
        content: (key, msg) => (
          <Alert
            onClose={() => {
              closeSnackbar(key);
            }}
            severity={severity ?? 'success'}
            sx={{ width: '100%' }}
            action={
              <SnackbarCtx.Provider value={{ key, onClose: closeSnackbar }}>
                {Action}
              </SnackbarCtx.Provider>
            }
          >
            {msg}
          </Alert>
        ),
      }),
    [enqueueSnackbar, closeSnackbar],
  );

  return pushSnackbar;
}
