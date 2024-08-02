import { useForm } from 'react-hook-form';
import TextInput from '../common/components/form/TextInput';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function UserForm({ onSubmit, user }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
    },
  });
  const navigate = useNavigate();
  return (
    <Container sx={{ padding: '0 auto', width: '100vw' }}>
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
    </Container>
  );
}
