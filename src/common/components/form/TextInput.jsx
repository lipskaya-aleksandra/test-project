import { Controller } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export default function TextInput({
  name,
  control,
  type,
  rules,
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          InputProps={{
            endAdornment:
              type === 'password' ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClick}
                    edge="end"
                    sx={{ '&:focus': { outline: 'none' } }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
          type={showPassword ? 'text' : type}
          sx={{
            mt: 1,
            mb: 1,
          }}
          {...field}
          {...inputProps}
          size="small"
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
}
