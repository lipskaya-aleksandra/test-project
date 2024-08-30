import { Box, Typography } from '@mui/material';
import stc from 'string-to-color';

export default function UserInitialsLabel({ user }) {
  let userInitials;

  if (user.firstName && user.lastName) {
    userInitials = user.firstName[0] + user.lastName[0];
  } else {
    userInitials = user.email.slice(0, 2);
  }
  const userColor = stc(userInitials);

  return (
    <Box
      sx={{
        borderRadius: '50%',
        backgroundColor: userColor,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 2,
      }}
    >
      <Typography>{userInitials}</Typography>
    </Box>
  );
}
