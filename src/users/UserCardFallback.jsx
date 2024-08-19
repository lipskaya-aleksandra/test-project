import { Edit } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Skeleton,
  Button,
  Container,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserCardFallback() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{ width: 'fit-content' }}
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ p: 1 }}>
        <CardHeader
          title={<Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />}
          subheader={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
        />
        <CardContent>
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
          <Button startIcon={<Edit />} variant="outlined" disabled={true}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
