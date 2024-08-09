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
} from '@mui/material';
import { useState } from 'react';
import EditActions from '../common/components/EditActions';
import { Delete } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import useAlertSnackbar from '../common/hooks/useAlertSnackbar.jsx';
import { Dropdown, IconButton, Menu, MenuButton } from '@mui/joy';
import { MoreVert } from '@mui/icons-material';
import useOptimisticUpdate from '../common/hooks/useOptimisticUpdate.js';
import useUsersTableQueryParams from './hooks/useUsersTableQueryParams.js';
import { useSnackbar } from 'notistack';

export default function EditUserCell({ cell }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const params = useUsersTableQueryParams();

  const { startUpdate, cancelUpdate } = useOptimisticUpdate(['users', params]);

  const id = cell.row.getValue('id');

  const displaySnackbar = useAlertSnackbar();
  const { closeSnackbar } = useSnackbar();

  const deleteMutation = useDeleteUser();

  const onDeleteInitiated = () => {
    setDialogOpen(true);
  };

  const onDeleteConfirmed = () => {
    setDialogOpen(false);

    startUpdate({
      newData: (oldData) => ({
        count: oldData.count,
        rows: oldData.rows.filter((u) => u.id != id),
      }),
      delay: 5000,
      updateFn: () => {
        deleteMutation.mutateAsync(id);
      },
    });

    displaySnackbar({
      onCancel: cancelUpdate,
      message: `User with id ${id} deleted succesfully.`,
      Action: ({ onClose }) => (
        <Button sx={{ '&:focus': { outline: 'none' } }} onClick={onClose}>
          Dismiss
        </Button>
      ),
    });
  };

  const onEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dropdown>
        <MenuButton
          sx={{ '&:focus': { outline: 'none' } }}
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
        >
          <MoreVert />
        </MenuButton>

        <Menu placement="right-start">
          <EditActions onDelete={onDeleteInitiated} onEdit={onEdit} />
        </Menu>
      </Dropdown>

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
