import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

export default function EditActions({ onDelete, onEdit }) {
  return (
    <Box>
      <Tooltip title="Edit" arrow>
        <MenuItem onClick={onEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
        </MenuItem>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
        </MenuItem>
      </Tooltip>
    </Box>
  );
}
