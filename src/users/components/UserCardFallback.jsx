import { Edit, ArrowBack } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Skeleton,
  Button,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserCardFallback() {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader
        title={<Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />}
        subheader={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
      />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Button startIcon={<Edit />} variant="outlined" disabled>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
