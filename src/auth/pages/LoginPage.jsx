import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  Grid,
  Link,
  Container,
  TextField,
  Stack,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as z from 'zod';

import LoadingButton from '../../common/components/form/LoadingButton';
import PasswordInput from '../../common/components/form/PasswordInput';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';
import { useLogin } from '../api/useLogin';
import { emailValidationString } from '../utils/validation/emailValidation';
import { passwordValidationString } from '../utils/validation/passwordValidation';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

const loginFormSchema = z.object({
  email: emailValidationString,
  password: passwordValidationString,
});

export default function LoginPage() {
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const displaySnackbar = useAlertSnackbar();

  const login = useLogin();
  const navigate = useNavigate();

  const onUnauthorizedError = () => {
    setError('email', {
      message: 'Incorrect email or password',
    });
    setError('password', {
      message: 'Incorrect email or password',
    });
  };

  const onSubmit = async data => {
    try {
      const response = await login.mutateAsync(data);

      if (response.status === 201) {
        navigate('/');
      }
    } catch (e) {
      if (e.request.status === 401) {
        onUnauthorizedError();
      } else {
        displaySnackbar({
          severity: 'error',
          message: 'Something went wrong, please try again later.',
        });
      }
    }
  };

  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
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
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required.' }}
            render={({
              field: { ref, ...fieldProps },
              fieldState: { error },
            }) => (
              <PasswordInput
                error={!!error}
                helperText={error?.message}
                label="Password"
                {...fieldProps}
                {...textInputProps}
                inputRef={ref}
              />
            )}
          />

          <LoadingButton
            loading={login.isPending}
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 1.5, mb: 1.5, '&:focus': { outline: 'none' } }}
          >
            Sign In
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link
                component={RouterLink}
                to="/request-password-reset"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Stack>
  );
}
