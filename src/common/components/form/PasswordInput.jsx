import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

export default function PasswordInput(inputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <TextField
      {...inputProps}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClick}
              edge="end"
              sx={{ '&:focus': { outline: 'none' } }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={showPassword ? 'text' : 'password'}
    />
  );
}
