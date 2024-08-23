import {
  Stack,
  Typography,
  Grid,
  Link,
  Button,
  Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import TextInput from '../../common/components/form/TextInput';
import { useLogin } from '../api/useLogin';

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

  const onSubmit = async (data) => {
    try {
      const tokens = await login(data);
      console.log(tokens);
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
          <TextInput
            error={!!errors.email}
            control={control}
            name={'email'}
            label={'Email'}
            helperText={errors.email?.message}
            rules={{ required: 'Email is required.' }}
          />
          <TextInput
            error={!!errors.password}
            control={control}
            type={'password'}
            name={'password'}
            label={'Password'}
            helperText={errors.password?.message}
            rules={{ required: 'Password is required.' }}
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
              <Link href="#" variant="body2">
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
