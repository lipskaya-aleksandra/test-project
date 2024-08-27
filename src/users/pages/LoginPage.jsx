import {
  Stack,
  Typography,
  Grid,
  Link,
  Button,
  Container,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from '../api/useLogin';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../common/components/form/PasswordInput';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 201) {
        navigate('/');
      }
    } catch (e) {
      if (e.request.status === 401) {
        setError('email', {
          type: '401',
          message: 'Incorrect email or password',
        });
        setError('password', {
          type: '401',
          message: 'Incorrect email or password',
        });
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
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <Controller
            name={'email'}
            control={control}
            rules={{ required: 'Email is required.' }}
            render={({ field: { ref, ...fieldProps } }) => (
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                {...fieldProps}
                {...textInputProps}
                inputRef={ref}
              />
            )}
          />
          <Controller
            name={'password'}
            control={control}
            rules={{ required: 'Password is required.' }}
            render={({ field: { ref, ...fieldProps } }) => (
              <PasswordInput
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                {...fieldProps}
                {...textInputProps}
                inputRef={ref}
              />
            )}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 1.5, mb: 1.5, '&:focus': { outline: 'none' } }}
          >
            Sign In
          </Button>

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
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Stack>
  );
}
