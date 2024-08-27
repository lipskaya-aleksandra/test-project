import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useRequestPasswordReset } from '../api/useRequestPasswordReset';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

export default function RequestPasswordResetPage() {
  const requestPasswordReset = useRequestPasswordReset();
  const displaySnackbar = useAlertSnackbar();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async data => {
    displaySnackbar({
      message: 'Link for password reset was sent to the provided email',
    });
    try {
      const url = await requestPasswordReset(data);

      navigate(url);
    } catch (e) {
      if (e.response.status === 401) {
        // setError('email', { message: 'Incorrect email provided.' });
        navigate('/login');
      }
    }
  };

  return (
    <Stack
      sx={{
        width: 'fit-content',
        alignItems: 'center',
        margin: '0 auto',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Typography fontWeight={300} fontSize={24} textAlign="center">
            Request password reset
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({
              field: { ref, ...fieldProps },
              fieldState: { error },
            }) => (
              <TextField
                error={!!error}
                helperText={error?.message}
                label="Email"
                {...fieldProps}
                {...textInputProps}
                inputRef={ref}
              />
            )}
          />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              sx={{ '&:focus': { outline: 'none' } }}
              variant="outlined"
            >
              Cancel
            </Button>

            <Button
              sx={{ '&:focus': { outline: 'none' } }}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Submit
            </Button>
          </Stack>
        </Container>
      </form>
    </Stack>
  );
}
