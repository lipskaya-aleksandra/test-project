import { Button } from '@mui/material';

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

export function UndoButton({ onUndo }) {
  const { key: snackbarKey, onClose: closeSnackbar } = useSnackbarContext();

  return (
    <Button
      sx={{ '&:focus': { outline: 'none' } }}
      onClick={() => {
        closeSnackbar(snackbarKey);
        onUndo?.();
      }}
    >
      Undo
    </Button>
  );
}
