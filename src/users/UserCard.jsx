import {
  Card,
  CardHeader,
  Grid,
  Typography,
  Stack,
  Button,
  Container,
  CardContent,
  CardActions,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useGetUserById } from './api/useGetUserById';
import { ArrowBack } from '@mui/icons-material';

export default function UserCard() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);

  return (
    <Stack
      sx={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        margin: '0 auto',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ p: 1 }}>
        <CardHeader
          title={
            <Typography gutterBottom variant="h5">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          }
          subheader={
            <Typography variant="caption" display="block" gutterBottom>
              Created: {new Date(user.createdAt).toUTCString()}
            </Typography>
          }
        />
        <CardContent>
          <Stack alignItems="center" direction="row" gap={2}>
            <Email />
            <Typography>{user.email}</Typography>
          </Stack>
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
          <Button
            onClick={() => {
              navigate(`/users/edit/${user.id}`, {
                state: {
                  user,
                },
              });
            }}
            startIcon={<Edit />}
            variant="outlined"
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}
