import { useNavigate } from 'react-router-dom';
import { useDeleteUser } from './api/useDeleteUser';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import EditActions from '../common/components/EditActions';
import { Delete } from '@mui/icons-material';
import { Close } from '@mui/icons-material';

export default function EditUserCell({ cell }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const id = cell.row.getValue('id');
  const onSuccess = () => {
    setSnackbarOpen(true);
  };
  const deleteMutation = useDeleteUser({ onSuccess });
  const onDeleteInitiated = () => {
    setDialogOpen(true);
  };
  const onDeleteConfirmed = () => {
    setDialogOpen(false);
    deleteMutation.mutateAsync(id);
  };
  const onEdit = () => {
    navigate(`/users/${id}`);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <EditActions onDelete={onDeleteInitiated} onEdit={onEdit} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {`User with id ${id} deleted succesfully.`}
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          Are you sure you want to delete a user with id {id}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This action is irreversible.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={onDeleteConfirmed}
            startIcon={<Delete />}
          >
            Delete
          </Button>
          <Button onClick={handleDialogClose} startIcon={<Close />}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
