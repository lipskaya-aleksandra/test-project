import { Container, Typography } from '@mui/material';

import sorryGif from '../../../assets/sorry-penguin.gif';

export default function ErrorFallback() {
  return (
    <Container sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <img
        style={{
          height: 300,
        }}
        src={sorryGif}
        alt="Sorry, some error occured."
      />
      <Typography variant="h4">
        Ooops, some error occured while loading data. Please, try again.
      </Typography>
    </Container>
  );
}
