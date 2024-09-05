import { Button } from '@mui/material';
import { Fragment } from 'react';

import { useSnackbarContext } from '../../hooks/useAlertSnackbar';

export function DismissButton() {
  const { key, onClose } = useSnackbarContext();

  return (
    <Button
      sx={{ '&:focus': { outline: 'none' } }}
      onClick={() => onClose(key)}
    >
      Dismiss
    </Button>
  );
}

export function UndoAndDismissButtons({ onUndo, onDismiss }) {
  const { key: snackbarKey, onClose: closeSnackbar } = useSnackbarContext();

  return (
    <Fragment>
      <Button
        sx={{ '&:focus': { outline: 'none' } }}
        onClick={() => {
          closeSnackbar(snackbarKey);
          onUndo?.();
        }}
      >
        Undo
      </Button>

      <Button
        sx={{ '&:focus': { outline: 'none' } }}
        onClick={() => {
          closeSnackbar(snackbarKey);
          onDismiss?.();
        }}
      >
        Dismiss
      </Button>
    </Fragment>
  );
}
