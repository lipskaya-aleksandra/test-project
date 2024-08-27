import { Button } from '@mui/material';

export default function DismissButton({ onClose }) {
  return (
    <Button sx={{ '&:focus': { outline: 'none' } }} onClick={onClose}>
      Dismiss
    </Button>
  );
}
