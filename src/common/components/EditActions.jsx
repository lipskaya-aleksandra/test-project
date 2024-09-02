import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

export default function EditActions({ onDelete, onEdit }) {
  return (
    <Stack>
      <IconButton sx={{ ':focus': { outline: 'none' } }} onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton sx={{ ':focus': { outline: 'none' } }} onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
