import { CloseOutlined, DoneOutlined } from '@mui/icons-material';

export default function RequirementIcon({ isFulfilled }) {
  if (isFulfilled) return <DoneOutlined fontSize="small" />;

  return <CloseOutlined fontSize="small" />;
}
