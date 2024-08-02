import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function TextInput({ name, control, label }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          sx={{
            mt: 1,
            mb: 1,
          }}
          {...field}
          size="small"
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
