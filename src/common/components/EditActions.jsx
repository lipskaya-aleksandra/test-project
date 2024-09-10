import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, MenuItem, Tooltip } from '@mui/material';

export default function EditActions({ onDelete, onEdit }) {
  return (
    <Box sx={{ color: 'gray' }}>
      <Tooltip title="Edit" arrow>
        <MenuItem onClick={onEdit}>
          <EditIcon />
        </MenuItem>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <MenuItem onClick={onDelete}>
          <DeleteIcon />
        </MenuItem>
      </Tooltip>
    </Box>
  );
}
