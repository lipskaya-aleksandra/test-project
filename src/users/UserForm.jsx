import { Controller, useForm } from 'react-hook-form';
import TextInput from '../common/components/form/TextInput';
import {
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetJobs } from './api/useGetJobs';

export default function UserForm({ onSubmit, user }) {
  const { data } = useGetJobs();
  const noneJob = { name: 'none', id: 'null' };
  const jobs = [noneJob, ...data];

  const { control, handleSubmit } = useForm({
    values: {
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
      jobId: user ? user.job.id : noneJob.id,
    },
  });
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
        {user ? 'Edit user' : 'Create user'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <TextInput
            control={control}
            name={'firstName'}
            label={'First name'}
          />
          <TextInput control={control} name={'lastName'} label={'Last name'} />
          <TextInput control={control} name={'email'} label={'Email'} />
          <Controller
            render={({ field }) => (
              <Select fullWidth {...field} label={'Job'}>
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
              variant={'outlined'}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
              Submit
            </Button>
          </Stack>
        </Container>
      </form>
    </Stack>
  );
}
