import { Button, CircularProgress } from '@mui/material';

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
      {children}
    </Button>
  );
}
