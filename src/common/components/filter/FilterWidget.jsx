import { Container, Typography } from "@mui/material";

export default function FilterWidget({ children }) {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography>Filters</Typography>
      {children}
    </Container>
  );
}
