import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Alert,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JobSelect, { noneJob } from './JobSelect';
import QueryWrapper from '../common/components/QueryWrapper';
import PasswordInput from '../common/components/form/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AT_LEAST_ONE_DIGIT,
  AT_LEAST_ONE_LOWERCASE_LETTER,
  AT_LEAST_ONE_SYMBOL,
  AT_LEAST_ONE_UPPERCASE_LETTER,
  schema,
} from './userFormValidation';
import PasswordValidationBox from './PasswordValidationBox';

const textInputProps = {
  sx: {
    mt: 1,
    mb: 1,
  },
  size: 'small',
  fullWidth: true,
  variant: 'outlined',
};

export default function UserForm({ onSubmit, user, withPassword, title }) {
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
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      jobId: user?.job.id,
    },
    resolver: zodResolver(schema),
  });

  const password = useWatch({
    control,
    name: 'password',
  });

  const onSubmitInterceptor = (data) => {
    if (data.jobId === noneJob.id) {
      data.jobId = null;
    }
    onSubmit(data, setError);
  };

  const hasOneDigit = AT_LEAST_ONE_DIGIT.test(password);
  const hasOneLowercaseLetter = AT_LEAST_ONE_LOWERCASE_LETTER.test(password);
  const hasOneUppercaseLetter = AT_LEAST_ONE_UPPERCASE_LETTER.test(password);
  const hasOneSymbol = AT_LEAST_ONE_SYMBOL.test(password);
  const hasMinLength8 = password.length >= 8;

  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Typography fontWeight={300} fontSize={24} textAlign={'center'}>
        {title}
      </Typography>

      <form onSubmit={handleSubmit(onSubmitInterceptor)}>
        <Container maxWidth="xs">
          <Controller
            name={'firstName'}
            control={control}
            render={({ field }) => (
              <TextField label="First name" {...field} {...textInputProps} />
            )}
          />

          <Controller
            name={'lastName'}
            control={control}
            render={({ field }) => (
              <TextField label="Last name" {...field} {...textInputProps} />
            )}
          />

          <Controller
            name={'email'}
            control={control}
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

          {withPassword && (
            <>
              <Controller
                name={'password'}
                control={control}
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

              <PasswordValidationBox
                hasOneDigit={hasOneDigit}
                hasOneLowercaseLetter={hasOneLowercaseLetter}
                hasOneUppercaseLetter={hasOneUppercaseLetter}
                hasOneSymbol={hasOneSymbol}
                hasMinLength8={hasMinLength8}
              />

              <Controller
                name={'confirmedPassword'}
                control={control}
                render={({ field: { ref, ...fieldProps } }) => (
                  <PasswordInput
                    error={!!errors.confirmedPassword}
                    helperText={errors.confirmedPassword?.message}
                    label="Confirm password"
                    {...fieldProps}
                    {...textInputProps}
                    inputRef={ref}
                  />
                )}
              />
            </>
          )}

          <QueryWrapper
            suspenseFallback={
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            }
            errorFallback={<Alert severity="error">Couldn't load jobs</Alert>}
          >
            <Controller
              render={({ field }) => <JobSelect {...field} />}
              name={'jobId'}
              control={control}
              defaultValue={noneJob.id}
            />
          </QueryWrapper>

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
