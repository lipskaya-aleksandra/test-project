import { Delete, Close, MoreVert } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import DismissButton from '../../common/components/DismissButton';
import EditActions from '../../common/components/EditActions';
import BaseMenu from '../../common/components/menu/BaseMenu';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import useOptimisticUpdate from '../../common/hooks/useOptimisticUpdate';
import { useDeleteUser } from '../api/useDeleteUser';
import useUsersTableQueryParams from '../hooks/useUsersTableQueryParams';

export default function EditUserCell({ cell }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const params = useUsersTableQueryParams();

  const { startUpdate, cancelUpdate } = useOptimisticUpdate(['users', params]);

  const id = cell.row.getValue('id');

  const displaySnackbar = useAlertSnackbar();

  const deleteMutation = useDeleteUser();

  const onDeleteInitiated = () => {
    setDialogOpen(true);
  };

  const onDeleteConfirmed = () => {
    setDialogOpen(false);

    startUpdate({
      newData: oldData => ({
        count: oldData.count,
        rows: oldData.rows.filter(u => u.id !== id),
      }),
      delay: 5000,
      updateFn: () => {
        deleteMutation.mutateAsync(id);
      },
    });

    displaySnackbar({
      onCancel: cancelUpdate,
      message: `User with id ${id} deleted succesfully.`,
      Action: <DismissButton />,
    });
  };

  const onEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <BaseMenu
        tooltipTitle="Open edit menu"
        id="edit-menu"
        MenuIcon={<MoreVert />}
      >
        <EditActions onDelete={onDeleteInitiated} onEdit={onEdit} />
      </BaseMenu>

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
    </Fragment>
  );
}
