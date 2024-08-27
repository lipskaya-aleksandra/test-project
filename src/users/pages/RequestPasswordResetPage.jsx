import { useForm } from 'react-hook-form';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRequestPasswordReset } from '../api/useRequestPasswordReset';
import useAlertSnackbar from '../../common/hooks/useAlertSnackbar';

export default function RequestPasswordResetPage() {
  const requestPasswordReset = useRequestPasswordReset();
  const displaySnackbar = useAlertSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
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
          <Typography fontWeight={300} fontSize={24} textAlign={'center'}>
            Request password reset
          </Typography>
          {/* <TextInput
            error={!!errors.email}
            control={control}
            name={'email'}
            label={'Email'}
            helperText={errors.email?.message}
            rules={{ required: 'Email is required.' }}
            fullWidth
          /> */}
          <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              sx={{ '&:focus': { outline: 'none' } }}
              variant={'outlined'}
            >
              Cancel
            </Button>

            <Button
              sx={{ '&:focus': { outline: 'none' } }}
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
            >
              Submit
            </Button>
          </Stack>
        </Container>
      </form>
    </Stack>
  );
}
