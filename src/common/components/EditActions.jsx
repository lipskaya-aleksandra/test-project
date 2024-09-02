import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

export default function EditActions({ onDelete, onEdit }) {
  return (
    <Box>
      <Tooltip title="Edit" arrow>
        <IconButton sx={{ ':focus': { outline: 'none' } }} onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <IconButton sx={{ ':focus': { outline: 'none' } }} onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
