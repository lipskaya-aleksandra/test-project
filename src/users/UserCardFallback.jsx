import { Card, CardHeader, Grid, Skeleton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserCardFallback() {
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
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />}
          subheader={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
        />

        <>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </>
      </Card>
    </Grid>
  );
}
