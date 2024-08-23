import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetJobs } from '../api/useGetJobs';
import TextInput from '../../common/components/form/TextInput';
import { useSignUp } from '../api/useSignUp';

export default function SignUpPage() {
  const { data } = useGetJobs();
  const noneJob = { name: 'none', id: 'null' };
  const jobs = [noneJob, ...data];

  const signUp = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmedPassword: '',
      jobId: noneJob.id,
    },
  });

  const onSubmit = async (data) => {
    try {
      await signUp(data);
    } catch (e) {
      if (e.response.status === 409) {
        setError('email', { type: '409', message: 'Email already in use.' });
      }
    }
  };

  const navigate = useNavigate();
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
      <Typography fontWeight={300} fontSize={24} textAlign={'center'}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <TextInput
            control={control}
            name={'firstName'}
            label={'First name'}
          />
          <TextInput control={control} name={'lastName'} label={'Last name'} />
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
            required={true}
            type={'password'}
            control={control}
            name={'password'}
            label={'Password'}
            helperText={errors.password?.message}
            rules={{
              required: 'Password is required.',
              validate: (value, formValues) => {
                if (value !== formValues.confirmedPassword) {
                  return 'Passwords must match.';
                }
              },
            }}
          />
          <TextInput
            error={!!errors.confirmedPassword}
            required={true}
            type={'password'}
            control={control}
            name={'confirmedPassword'}
            label={'Confirm password'}
            helperText={errors.confirmedPassword?.message}
            rules={{
              required: 'Password is required.',
              validate: (value, formValues) => {
                if (value !== formValues.password) {
                  return 'Passwords must match.';
                }
              },
            }}
          />
          <Controller
            render={({ field }) => (
              <Select
                sx={{ my: 1 }}
                size="small"
                fullWidth
                {...field}
                label={'Job'}
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id} name={job.name} value={job.id}>
                    {job.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            name={'jobId'}
            control={control}
            defaultValue={noneJob.id}
          />
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
