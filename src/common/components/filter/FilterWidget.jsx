import { Box, Container, Typography } from '@mui/material';

export default function FilterWidgetContainer({ children }) {
  return (
    <Box sx={{ width: { xs: '100%', sm: 'fit-content' } }}>
      <Typography fontSize={20} sx={{ mb: 1 }}>
        Filters
      </Typography>
      {children}
    </Box>
  );
}
