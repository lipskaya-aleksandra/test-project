import { Delete, Close, MoreVert } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  IconButton,
  Menu,
} from '@mui/material';
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import DismissButton from '../../common/components/DismissButton';
import EditActions from '../../common/components/EditActions';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import useMenu from '../../common/hooks/useMenu';
import useOptimisticUpdate from '../../common/hooks/useOptimisticUpdate';
import { useDeleteUser } from '../api/useDeleteUser';
import useUsersTableQueryParams from '../hooks/useUsersTableQueryParams';

export default function EditUserCell({ cell }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { anchorEl, isOpen, onClick, onClose } = useMenu();

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
      <Tooltip title="Open edit menu" arrow>
        <IconButton
          onClick={onClick}
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          sx={{ '&:focus': { outline: 'none' } }}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={onClose}
        onClick={onClose}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <EditActions onDelete={onDeleteInitiated} onEdit={onEdit} />
      </Menu>

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
