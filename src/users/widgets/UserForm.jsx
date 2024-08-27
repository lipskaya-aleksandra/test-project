import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  AT_LEAST_ONE_DIGIT,
  AT_LEAST_ONE_LOWERCASE_LETTER,
  AT_LEAST_ONE_SYMBOL,
  AT_LEAST_ONE_UPPERCASE_LETTER,
  MIN_LENGTH,
} from '../../auth/utils/validation/passwordValidation';
import PasswordValidationBox from '../../auth/widgets/PasswordValidationBox';
import QueryWrapper from '../../common/components/QueryWrapper';
import PasswordInput from '../../common/components/form/PasswordInput';
import { schema } from '../utils/userFormValidation';

import JobSelect, { noneJob } from './JobSelect';

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

  const onSubmitInterceptor = data => {
    onSubmit(
      { ...data, jobId: data.jobId === noneJob.id ? null : data.jobId },
      setError,
    );
  };

  const hasOneDigit = AT_LEAST_ONE_DIGIT.test(password);
  const hasOneLowercaseLetter = AT_LEAST_ONE_LOWERCASE_LETTER.test(password);
  const hasOneUppercaseLetter = AT_LEAST_ONE_UPPERCASE_LETTER.test(password);
  const hasOneSymbol = AT_LEAST_ONE_SYMBOL.test(password);
  const hasMinLength = password.length >= MIN_LENGTH;

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
      <Typography fontWeight={300} fontSize={24} textAlign="center">
        {title}
      </Typography>

      <form onSubmit={handleSubmit(onSubmitInterceptor)}>
        <Container maxWidth="xs">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField label="First name" {...field} {...textInputProps} />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField label="Last name" {...field} {...textInputProps} />
            )}
          />

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

          {withPassword && (
            <Fragment>
              <Controller
                name="password"
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
                hasMinLength={hasMinLength}
              />

              <Controller
                name="confirmedPassword"
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
            </Fragment>
          )}

          <QueryWrapper
            suspenseFallback={
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            }
            errorFallback={
              <Alert severity="error">Couldn&apos;t load jobs</Alert>
            }
          >
            <Controller
              render={({ field }) => <JobSelect {...field} />}
              name="jobId"
              control={control}
              defaultValue={noneJob.id}
            />
          </QueryWrapper>

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variant="outlined"
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit(onSubmit)} variant="contained">
              Submit
            </Button>
          </Stack>
        </Container>
      </form>
    </Stack>
  );
}
