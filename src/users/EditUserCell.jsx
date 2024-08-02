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
import { useSnackbar } from 'notistack';

export default function EditUserCell({ cell }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const id = cell.row.getValue('id');

  const onSuccess = () => {
    enqueueSnackbar(`User with id ${id} deleted succesfully.`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      content: (key, message) => (
        <Alert
          onClose={() => {
            closeSnackbar(key);
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ),
    });
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
    navigate(`/users/edit/${id}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <EditActions onDelete={onDeleteInitiated} onEdit={onEdit} />
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
