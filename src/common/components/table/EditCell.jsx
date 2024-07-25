import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/material';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function EditCell({ onDelete, onEdit }) {
  return (
    <Box>
      <IconButton onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <Checkbox icon={icon} checkedIcon={checkedIcon} />
    </Box>
  );
}
