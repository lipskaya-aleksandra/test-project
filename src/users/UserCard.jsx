import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  Typography,
  Link,
  Skeleton,
  Stack,
  Button,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function UserCard({ user, loading }) {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Card sx={{ minWidth: '400px' }}>
        {loading && (
          <CardHeader
            avatar={<Skeleton variant="circular" width={40} height={40} />}
            title={<Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />}
            subheader={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
          />
        )}
        {!loading && (
          <CardHeader
            //avatar={<Avatar src={user.profile_image} />}
            title={
              <Typography gutterBottom variant="h5" component="h2">
                {`${user.firstName} ${user.lastName}`}
              </Typography>
            }
            subheader={
              <Typography variant="caption" display="block" gutterBottom>
                Created: {new Date(user.createdAt).toUTCString()}
              </Typography>
            }
          />
        )}

        {loading && (
          <>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </>
        )}

        {/* {!loading && (
          <>
            <Stack alignItems="center" direction="row" gap={2}>
              <LocationOn sx={{ m: '4px' }} />
              <Typography>{user.location || '-'}</Typography>
            </Stack>
            <Stack alignItems="center" direction="row" gap={2}>
              {user.link ? (
                <>
                  <LinkIcon sx={{ m: '4px' }} />
                  <Link>{user.link}</Link>
                </>
              ) : (
                <Typography>-</Typography>
              )}
            </Stack>
            <Stack alignItems="center" direction="row" gap={2}>
              <Language sx={{ m: '4px' }} />
              <Typography>
                {user.website_url ? <Link>{user.website_url}</Link> : '-'}
              </Typography>
            </Stack>
          </>
        )} */}
        {!loading && (
          <Stack alignItems="center" direction="row" gap={2}>
            <Email sx={{ m: '4px' }} />
            <Typography>{user.email}</Typography>
          </Stack>
        )}
      </Card>
    </Grid>
  );
}
