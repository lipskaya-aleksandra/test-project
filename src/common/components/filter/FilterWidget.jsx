import { Container, Typography } from '@mui/material';

export default function FilterWidget({ children }) {
  return (
    <Container>
      <Typography fontSize={20} sx={{ mb: 1 }}>
        Filters
      </Typography>
      {children}
    </Container>
  );
}
